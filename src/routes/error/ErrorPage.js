/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ErrorPage.css';

export function ErrorPage({ error }, context) {
  let formattedMessage = '';

  if (context.setTitle) {
    context.setTitle(error.title);
  }

  if (process.env.NODE_ENV !== 'production')
  {
    formattedMessage = <pre>{error.stack}</pre>;
  }

  return (
    <div>
      <h1>{error.title}</h1>
      <p>{error.content}</p>
      {formattedMessage}
    </div>
  );
}

ErrorPage.propTypes = { error: PropTypes.object.isRequired };
ErrorPage.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(ErrorPage);
