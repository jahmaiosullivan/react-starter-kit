import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Places.css';

const title = 'My places';

function Places(props, context) {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>...</p>
      </div>
    </div>
  );
}
export default withStyles(s)(Places);
