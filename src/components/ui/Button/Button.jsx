import React from 'react';
import styles from './Button.module.less';
import cn from 'classnames';

const Button = (props) => {
  const {
    children,
    onClick,
    ariaLabel,
    active = false,
    disabled = false,
  } = props;

  const classes = cn(styles.button, {
    active: active,
    disabled: disabled,
  });

  return (
    <button
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