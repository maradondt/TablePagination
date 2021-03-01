/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as routes from './routes';
import styles from './App.module.less';
import TablePagination from './components/TablePagination/TablePagination';

function App() {
  const [data, setData] = useState([]);
  const [loadingProcessState, setLoadingProcessState] = useState('loading');

  useEffect(() => {
    axios.get(routes.commmentsPath())
      .then((response) => {
        setData(response.data);
        setLoadingProcessState('idle');
      })
      .catch((err) => {
        setLoadingProcessState(err);
      });
  }, [loadingProcessState]);

  return (
    <div className={styles.App}>
      <header className={styles['App-header']}>Table Pagination</header>
      <main className={styles['App-main']}>
        <TablePagination data={data} />
      </main>
      <footer className={styles['App-footer']}>
        <span>© Vladimir Zhigalev</span>
        <a href="https://github.com/maradondt" className={styles.link}>
          github.com/maradondt
        </a>
      </footer>
    </div>
  );
}

export default React.memo(App);
