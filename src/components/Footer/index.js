import React from 'react';
import styles from './styles.module.scss';

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <div className={styles.footer} >
            <div className={styles.bar}>
                <div className={styles.column}>
                    <div className={styles.row}>Sampling Tool</div>
                    <div className={styles.row}> <a href="https://www.ifrc.org/en/" target="_blank" rel="noopener noreferrer">IFRC</a> </div>
                    <div className={styles.row}>@{year}</div>
                </div>
                <div className={styles.column}>
                    <div className={styles.row}>IFRC Community</div>
                    <div className={styles.row}> <a href="https://www.ifrc.org/en/" target="_blank" rel="noopener noreferrer">IFRC</a> </div>
                    <div className={styles.row}>@{year}</div>
                </div>
                <div className={styles.column}>
                    <div className={styles.row}>IFRC</div>
                    <div className={styles.row}> <a href="https://www.ifrc.org/en/" target="_blank" rel="noopener noreferrer">IFRC</a> </div>
                    <div className={styles.row}>@{year}</div>
                </div>
            </div>
        </div>
    );
}
export default Footer;