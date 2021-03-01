/* eslint-disable react/prop-types */
import React from 'react';
import cn from 'classnames';
import styles from './Button.module.less';

const Button = (props) => {
  const {
    children,
    onClick,
    ariaLabel,
    active = false,
    disabled = false,
  } = props;

  const classes = cn(styles.button, {
    active,
    disabled,
  });

  return (
    <button
      type="button"
      className={classes}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
