import React from 'react';
import styles from './styles.module.scss';

class Footer extends React.PureComponent {
  render () {
    const date = new Date();
    const year = date.getFullYear();
    return (
      <div className={styles.footer}> @{year}</div>
    );
  }
}
export default Footer;