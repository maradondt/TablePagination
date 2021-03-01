/* eslint-disable react/prop-types */
import React from 'react';
import styles from './Input.module.less';

const Input = (props) => {
  const {
    type = 'text',
    name,
    id,
    value,
    onChange,
    placeholder,
  } = props;

  return (
    <input
      type={type}
      name={name}
      id={id}
      className={styles.input}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
