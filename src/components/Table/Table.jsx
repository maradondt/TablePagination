import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cn from 'classnames';
import styles from './Table.module.less';

const Table = (props) => {
  const {
    data,
    requestSort,
    sortConfig: {
      key,
      direction,
    },
  } = props;

  const handleSort = (field) => () => {
    requestSort(field);
  };

  const renderThead = () => {
    const headers = data.reduce(
      (acc, item) => [...new Set([...acc, ...Object.keys(item)])],
      [],
    );

    const getSortedClasses = (name) => cn({
      [styles.sorted]: name === key,
      [styles[direction]]: name === key,
    });

    return (
      <thead className={styles['table-header']}>
        <tr>
          {headers.map((name) => (
            <th
              className={getSortedClasses(name)}
              onClick={handleSort(name)}
              key={_.uniqueId()}
            >
              {name}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderCells = (row) => Object.entries(row)
    .map(([, cell]) => <td className={styles.cell} key={_.uniqueId()}>{cell}</td>);

  const renderRows = () => data
    .map((row) => <tr className={styles.row} key={_.uniqueId()}>{renderCells(row)}</tr>);

  const renderTbody = () => (
    <tbody>
      {renderRows(data)}
    </tbody>
  );

  if (data.length === 0) {
    return (
      <table className={`${styles.table} ${styles['table-empty']}`}>
        <thead className={styles['table-header']}>
          <tr>
            <th>No find Data</th>
          </tr>
        </thead>
        <tr className={styles.row} key={_.uniqueId()}>
          <td className={styles.cell}>Please change you query</td>
        </tr>
      </table>
    );
  }

  return (
    <table className={styles.table}>
      {renderThead(data)}
      {renderTbody(data)}
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  requestSort: PropTypes.func.isRequired,
  sortConfig: PropTypes.objectOf(PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.string,
  })).isRequired,
};

export default Table;
