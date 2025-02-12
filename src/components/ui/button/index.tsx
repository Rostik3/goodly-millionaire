import { ReactNode } from 'react';

import styles from './index.module.scss';

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
