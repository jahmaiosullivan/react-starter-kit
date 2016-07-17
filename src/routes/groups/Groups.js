import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Groups.scss';
import classNames from 'classnames/bind';
import FontAwesome from 'react-fontawesome';
import cover1 from './images/cover1.jpg';
import cover2 from './images/cover2.jpg';
import cover3 from './images/cover3.jpg';
import cover4 from './images/cover4.jpg';
import cover5 from './images/cover5.jpg';
import cover6 from './images/cover6.jpg';
import cover7 from './images/cover7.jpg';
import cover8 from './images/cover8.jpg';
import cover9 from './images/cover9.jpg';
var cx = classNames.bind(styles);
import {Grid, Row, Col, ButtonToolbar, Button, Clearfix} from 'react-bootstrap';


const title = 'Groups';

function Group({img, name}) {
  return (
    <Col xs={12} sm={12} md={6}>
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

class Groups extends Component {

  render()
  {
    var groupNodes = this.props.groups.map(function(group) {
      return (
        <Group img={`/assets/routes/groups/images/${group.coverImage}`} name={group.name} key={group.id} />
      );
    });

    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <h1>{title} <Button bsStyle="primary">Start group</Button></h1>
          <Grid fluid={true}>
            <Row className={styles.noGutter}>
              {groupNodes}
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(Groups);
