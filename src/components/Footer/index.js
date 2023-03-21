import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { useTranslation } from "react-i18next";

import styles from './styles.module.scss';

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    const { t } = useTranslation();

    return (
        <div className={styles.footer} >
            <div className={styles.bar}>
                <div className={styles.column}>
                    <div className={_cs(
                        styles.row,
                        styles.title,
                    )}>
                        {t('aboutGo')}
                    </div>
                    <div className={styles.row}>{t('aboutGoText')}</div>
                    <div className={styles.row}>@{year}</div>
                </div>
                <div className={styles.column}>
                <div className={_cs(
                        styles.row,
                        styles.title,
                    )}>
                        {t('developers')}
                    </div>
                    <div className={styles.row}>
                        <ul className={styles.list}>
                            <li><a href="" className={styles.link}>{t('apiDocs')}</a></li>
                            <li><a href="" className={styles.link}>{t('terms')}</a></li>
                            <li><a href="" className={styles.link}>{t('privacy')}</a></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={_cs(
                        styles.row,
                        styles.title,
                    )}>
                        {t('inx')}
                    </div>
                    <div className={styles.row}>{t('inxText')}</div>
                </div>
            </div>
        </div>
    );
}
export default Footer;