import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

import LanguageDropdown from "../LanguageDropdown";

function MobileNavbar() {
    const { t } = useTranslation();

    return (
        <div className={styles.menu}>
            <Link to="/">
                <li className={styles.link}>{t('menuHome')}</li>
            </Link>
            <Link to="/sampling">
                <li className={styles.link}>{t('menuSampling')}</li>
            </Link>
            <Link to="/resources">
                <li className={styles.link}>{t('menuResources')}</li>
            </Link>
            <Link to="/about">
                <li className={styles.link}>{t('menuAbout')}</li>
            </Link>
            <div className={styles.lang}>
                <LanguageDropdown />
            </div>
        </div>
    )
};

export default MobileNavbar;