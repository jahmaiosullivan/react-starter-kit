import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Places.css';
import classNames from 'classnames/bind';
var cx = classNames.bind(styles);
import mountains from './mountains.jpg';
import {Grid, Row, Col, Clearfix} from 'react-bootstrap';

const title = 'My places';

function Place() {
  return (
      <Row className={cx([styles.placeRow, styles.noGutter])}>
        <Col xs={6} md={3}>
          <img src={ mountains } alt="place image" style={{width: 240}}/>
        </Col>
        <Col xs={12} md={9}>
          <div className={styles.details}>
            <h2>Not Your Average Ghost Template</h2>
            <div class="author">
              <img class="read-more-post" data-href="/author/jamie-brown/"
                   src="/content/images/2014/Sep/author2.jpg" alt="Jamie Brown"/> by
              <span class="read-more-post" data-href="/author/jamie-brown/">Jamie Brown</span>
            </div>
            <p class="excerpt">Readable is not you're average theme with endless amount of js codes, plugins and CSS
              files or clumsy frameworks. It only carries a tiny code, so your load times will be a lot shorter.
              And now some ...</p>
          </div>
        </Col>
      </Row>
  );
}

function Places(props, context) {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1>{title}</h1>
        <Grid fluid={true}>
          <Place />
          <Clearfix />
          <Place />
          <Clearfix />
          <Place />
          <Clearfix />
          <Place />
        </Grid>
      </div>
    </div>
  );
}


export default withStyles(styles)(Places);
