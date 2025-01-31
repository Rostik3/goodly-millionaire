import { HTMLAttributes, ReactNode } from 'react';

import styles from './index.module.scss';

interface HeadlineProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

const Headline = ({ children, ...props }: HeadlineProps) => {
  return (
    <h1 className={styles.headline} {...props}>
      {children}
    </h1>
  );
};

export default Headline;
