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
                    <div className={styles.row}>@{year}</div>
                </div>
                <div className={styles.column}>
                <div className={_cs(
                        styles.row,
                        styles.title,
                    )}>
                        Developers
                    </div>
                    <div className={styles.row}>
                        <ul className={styles.list}>
                            <li><a href="" className={styles.link}>API Documentation</a></li>
                            <li><a href="" className={styles.link}>Terms of Use</a></li>
                            <li><a href="" className={styles.link}>Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={_cs(
                        styles.row,
                        styles.title,
                    )}>UCL INX</div>
                    <div className={styles.row}>UCL Computer Science. Project developed as part of the Systems Engineering module.</div>
                </div>
            </div>
        </div>
    );
}
export default Footer;