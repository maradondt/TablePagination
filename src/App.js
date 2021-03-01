import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as routes from './routes';
import './App.less';
import Pagination from './components/Pagination/Pagination';

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
    <div className="App">
      <header className="App-header">
        Pagination
      </header>
      <main>
        <Pagination
          data={data}
          pageLimit={10}
        />
      </main>
    </div>
  );
}

export default React.memo(App);
