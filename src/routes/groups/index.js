import React from 'react';
import Groups from './Groups';
import fetch from '../../core/fetch';

export default {

  path: '/',

  async action({ path }) { // eslint-disable-line react/prop-types
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `{groups{id,name,coverImage,created}}`
      }),
      credentials: 'include'
    });
    if (resp.status !== 200)
      throw new Error(resp.statusText);

    const { data } = await resp.json();

    return <Groups {...data} />;
  }
};
