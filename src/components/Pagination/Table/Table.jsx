import React from 'react';
import _ from 'lodash';
import styles from './Table.module.less';

const Table = (props) => {
  const {
    data,
    requestSort,
  } = props;

  const handleSort = (field) => () => {
    requestSort(field);
  }

  const renderThead = (data) => {
    const headers = data.reduce(
      (acc, item) => [...new Set([...acc, ...Object.keys(item)])],
      []);

    return (
      <thead>
        <tr>
          {headers.map((name) => <th
            onClick={handleSort(name)}
            key={_.uniqueId()}
          >
            {name}
          </th>)}
        </tr>
      </thead>
    );
  };

  const renderCells = (row) => Object.entries(row)
    .map(([, cell]) => <td className={styles.cell} key={_.uniqueId()}>{cell}</td>);

  const renderRows = (data) => data
      .map((row) => <tr className={styles.row} key={_.uniqueId()}>{renderCells(row)}</tr>);

  const renderTbody = (data) => (
    <tbody>
    {renderRows(data)}
    </tbody>
  );

  return (
    <table className={styles.table}>
      {renderThead(data)}
      {renderTbody(data)}
    </table>
  );
};

export default Table;
