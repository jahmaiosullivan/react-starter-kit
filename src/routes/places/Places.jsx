import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Places.css';

const title = 'My places';


function Places(props, context) {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1>{title}</h1>

      </div>
    </div>
  );
}


export default withStyles(styles)(Places);
