import React from 'react';
import styles from './Loader.css';

function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
          cargando...
      </div>
    </div>
  );
}

export default Loader;
