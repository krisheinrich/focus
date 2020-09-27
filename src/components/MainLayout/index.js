import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import styles from './MainLayout.module.css';
import cx from 'classnames';

import * as ROUTES from '../../constants/routes';

const SIDEBAR_ITEMS = [
  { name: 'Focus', route: ROUTES.HOME },
  { name: 'Targets', route: ROUTES.LANDING },
];

const MainLayout = ({ children }) => (
  <div className={styles.mainLayout}>
    <Sidebar />
    <main className={styles.main}>
      { children }
    </main>
  </div>
);

const _Sidebar = ({ location }) => (
  <ul className={styles.sidebar}>
    { SIDEBAR_ITEMS.map(({ name, route }) => {
      return (
        <li key={name} className={cx(styles.li, { [styles.active]: location.pathname === route })}>
          <Link to={route} className={styles.a}>{ name }</Link>
        </li>
      );
    }) }
  </ul>
);

const Sidebar = withRouter(_Sidebar);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(MainLayout);
