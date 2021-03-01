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
        console.log(err);
        setLoadingProcessState('error')
      });
  }, [loadingProcessState]);

  return (
    <div className={styles.App}>
      <header className={styles['App-header']}>
        Table Pagination
      </header>
      <main>
        <TablePagination
          data={data}
          pageLimit={10}
        />
      </main>
    </div>
  );
}

export default React.memo(App);
