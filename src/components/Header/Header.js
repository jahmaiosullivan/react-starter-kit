import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './logo-small.png';

const appName = 'HobbyClue';
const subText = 'Rabble rabble rabble';
const city = "Boston, MA";

function Header() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Navigation className={s.nav} />
        <Link className={s.brand} to="/">
          <img src={logoUrl} width="38" height="38" alt={appName} />
          <span className={s.brandTxt}>{appName}</span>
        </Link>
        <div className={s.banner}>
          <h1 className={s.bannerTitle}>{city}</h1>
          <p className={s.bannerDesc}>{subText}</p>
        </div>
      </div>
    </div>
  );
}

export default withStyles(s)(Header);
