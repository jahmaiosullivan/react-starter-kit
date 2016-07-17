import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Groups.scss';
import classNames from 'classnames/bind';
import FontAwesome from 'react-fontawesome';
import cover1 from './cover1.jpg';
import cover2 from './cover2.jpg';
import cover3 from './cover3.jpg';
import cover4 from './cover4.jpg';
import cover5 from './cover5.jpg';
import cover6 from './cover6.jpg';
import cover7 from './cover7.jpg';
import cover8 from './cover8.jpg';
import cover9 from './cover9.jpg';
var cx = classNames.bind(styles);
import {Grid, Row, Col, ButtonToolbar, Button, Clearfix} from 'react-bootstrap';


const title = 'Groups';

function Group({img, name}) {
  return (
    <Col xs={12} sm={6} md={4}>
      <div className={styles.group}>
        <div className={styles.imgContainer}>
          <a href="#groupclick">
            <img className={styles.mainImage} src={ img } alt="place image"/>
          </a>
          <a href="#preview" className={styles.preview}>
            Preview <FontAwesome name='eye'/>
          </a>
        </div>
        <div className={styles.details}>
          <h3 className={styles.name}>
            <a title={name}
               href="http://videotube.marstheme.com/decorative-pumpkins-which-one/">{name}</a>
          </h3>
          <span className={styles.date}>
            <FontAwesome name='clock-o'/> February 12 ,2015
          </span>
          <span className={styles.members}>
            <FontAwesome name='user'/>150
          </span>
        </div>
      </div>
    </Col>
  );
}

function Groups(props, context) {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1>{title} <Button bsStyle="primary">Start group</Button></h1>
        <Grid fluid={true}>
          <Row className={styles.noGutter}>
            <Group img={cover1} name="Group 1"/>
            <Group img={cover2} name="Group 2"/>
            <Group img={cover3} name="Group 3"/>
            <Group img={cover4} name="Group 4"/>
            <Group img={cover5} name="Group 5"/>
            <Group img={cover6} name="Group 6"/>
            <Group img={cover7} name="Group 7"/>
            <Group img={cover8} name="Group 8"/>
            <Group img={cover9} name="Group 9"/>
          </Row>
        </Grid>
      </div>
    </div>
  );
}


export default withStyles(styles)(Groups);
