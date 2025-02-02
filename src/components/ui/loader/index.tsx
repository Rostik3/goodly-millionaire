import { HTMLAttributes } from 'react';

import styles from './index.module.scss';

const Loader = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader} {...props} />
    </div>
  );
};

export default Loader;
