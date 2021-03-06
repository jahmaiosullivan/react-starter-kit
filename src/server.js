import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './components/Html';
import { ErrorPage } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import { resolve } from 'universal-router';
import PrettyError from 'pretty-error';
import passport from './core/passport';
import models from './data/models';
import schema from './data/schema';
import routes from './routes';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import { port, auth } from './config';

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(expressJwt({
  secret: auth.jwt.secret,
  credentialsRequired: false,
  getToken: req => req.cookies.id_token
}));
app.use(passport.initialize());

app.get('/login/facebook',
  passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false })
);
app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  }
);

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/graphql', expressGraphQL(req => ({
  schema: schema,
  graphiql: true,
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
  ...(process.env.NODE_ENV !== 'production' ? {} : {formatError: error => ({
                                                        message: error.message,
                                                        locations: error.locations,
                                                        stack: error.stack
                                                      })
                                                   })
})));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
                  try
                  {
                    let css = [];
                    let statusCode = 200;
                    const data = { title: '', description: '', style: '', script: assets.main.js, children: '' };

                    await resolve(routes, {   path: req.path,
                                              query: req.query,
                                              context: {
                                                insertCss: (styles) => css.push(styles._getCss()),
                                                setTitle: value => (data.title = value),
                                                setMeta: (key, value) => (data[key] = value)
                                              },
                                              render: (component, status = 200) => {
                                                css = [];
                                                statusCode = status;
                                                data.children = ReactDOM.renderToString(component);
                                                data.style = css.join('');
                                                return true;
                                              }
                                           }
                                  );

                    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);

                    res.status(statusCode);
                    res.send(`<!doctype html>${html}`);
                  }
                  catch (err)
                  {
                    next(err);
                  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) =>
{
  console.log(pe.render(err));

  const statusCode = err.status || 500;

  if (err.status == 500)
  {
    err.content = 'Sorry, a critical error occurred on this page.';
  }

  const data = {
    title: 'Internal Server Error',
    description: err.message,
    style: errorPageStyle._getCss(),
    children: ReactDOM.renderToString(<ErrorPage error={err} />)
  };

  const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);

  res.status(statusCode);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
models.sync().catch(err => console.error(err.stack)).then(() =>
{
  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
  });

});
/* eslint-enable no-console */
