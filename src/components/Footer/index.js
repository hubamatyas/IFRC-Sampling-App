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
                            <li>
                                <a
                                className={styles.link}
                                href="https://github.com/hubamatyas/ifrc-sampling"
                                >{t('github')}</a>
                            </li>
                            <li>
                                <a
                                className={styles.link}
                                href="terms.pdf"
                                download
                                >{t('terms')}</a>
                            </li>
                            <li>
                                <a
                                className={styles.link}
                                href="https://github.com/hubamatyas/ifrc-api/blob/main/sampling/README.md"
                                >{t('apiDocs')}</a>
                            </li>
                            <li>
                                <a
                                className={styles.link}
                                href="eula.pdf"
                                download
                                >{t('eula')}</a>
                            </li>
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
                    <a
                        className={_cs(
                            styles.row,
                            styles.link,
                        )}
                        href="https://students.cs.ucl.ac.uk/2022/group7/"
                        >{t('project')}</a>
                </div>
            </div>
        </div>
    );
}
export default Footer;