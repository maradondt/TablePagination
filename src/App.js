import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as routes from './routes';
import './App.less';
import Table from './components/Pagination/Pagination';

function App() {
  const [data, setData] = useState([]);
  const [loadingProcessState, setLoadingProcessState] = useState('loading');

  useEffect(() => {
    axios.get(routes.postsPath())
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
        <Table
          data={data}
          loadingProcessState={loadingProcessState}
        />
      </main>
    </div>
  );
}

export default App;
