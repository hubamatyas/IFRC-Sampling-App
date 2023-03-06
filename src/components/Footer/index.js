import React from 'react';
import styles from './styles.module.scss';
import { _cs } from '@togglecorp/fujs';

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <div className={styles.footer} >
            <div className={styles.bar}>
                <div className={styles.column}>
                    <div className={_cs(
                        styles.row,
                        styles.title,
                    )}>
                        About GO
                    </div>
                    <div className={styles.row}>IFRC GO is a Red Cross Red Crescent platform to connect information on emergency needs with the right response.</div>
                    <div className={styles.row}>IFRC @{year}</div>
                </div>
                <div className={styles.column}>
                <div className={_cs(
                        styles.row,
                        styles.title,
                    )}>
                        Developers
                    </div>
                    <div className={styles.row}>
                        <ul>
                            <li><a href="">API Documentation</a></li>
                            <li><a href="">Terms of Use</a></li>
                            <li><a href="">Privacy Policy</a></li>
                        </ul>
                    </div>
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