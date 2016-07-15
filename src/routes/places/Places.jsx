import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Places.css';
import {Grid, Row, Col, Clearfix} from 'react-bootstrap';
const title = 'My places';


function Places(props, context) {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1>{title}</h1>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={8}>Left Side</Col>
            <Col xs={6} md={4}>Right side</Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={8}><code>&lt;{'Col xs={12} md={8}'} /&gt;</code></Col>
            <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
}


export default withStyles(styles)(Places);
