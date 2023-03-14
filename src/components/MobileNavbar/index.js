import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { _cs } from "@togglecorp/fujs";

import styles from "./styles.module.scss";

import LanguageDropdown from "../LanguageDropdown";

function MobileNavbar() {
    const { t } = useTranslation();
    const location = useLocation();

    return (
        <div className={styles.menu}>
            <Link to="/">
                <li className={_cs(
                        styles.link,
                        location.pathname === '/' && styles.active
                )}>
                    {t('menuHome')}
                </li>
            </Link>
            <Link to="/sampling">
                <li className={_cs(
                        styles.link,
                        location.pathname === '/sampling' && styles.active
                )}>
                    {t('menuSampling')}
                </li>
            </Link>
            <Link to="/resources">
                <li className={_cs(
                        styles.link,
                        location.pathname === '/resources' && styles.active
                )}>
                    {t('menuResources')}
                </li>
            </Link>
            <Link to="/about">
                <li className={
                    _cs(
                        styles.link,
                        location.pathname === '/about' && styles.active
                )}>
                    {t('menuAbout')}
                </li>
            </Link>
            <div className={styles.lang}>
                <LanguageDropdown />
            </div>
        </div>
    )
};

export default MobileNavbar;