import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

import logo from "../../assets/logo.svg";
import globe from "../../assets/globe.svg";
import MobileNavbar from "../MobileNavbar";
import LanguageDropdown from "../LanguageDropdown";

function Navbar() {
    const { t } = useTranslation();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const location = useLocation();

    return (
        <>
            <header className={styles.header}>
                <div className={styles.bar}>
                    <div>
                        <Link to="/">
                            <li className={styles.logo}>
                                <img src={logo} alt={t('altLogo')} />
                            </li>
                        </Link>
                    </div>
                    <div className={styles.navlinks}>
                        <Link to="/" className={location.pathname === '/' ? styles.active : ''}>
                            <li className={styles.link} data-cy="homeLink">{t('menuHome')}</li>
                        </Link>
                        <Link to="/sampling" className={location.pathname === '/sampling' ? styles.active : ''}>
                            <li className={styles.link} data-cy="samplingLink">{t('menuSampling')}</li>
                        </Link>
                        <Link to="/resources" className={location.pathname === '/resources' ? styles.active : ''}>
                            <li className={styles.link} data-cy="resourcesLink">{t('menuResources')}</li>
                        </Link>
                        <Link to="/about" className={location.pathname === '/about' ? styles.active : ''}>
                            <li className={styles.link} data-cy="aboutLink">{t('menuAbout')}</li>
                        </Link>
                        <li className={styles.link} onMouseOver={() => setIsLangOpen(true)} data-cy="langList">
                            <img src={globe} alt={t('altGlobe')} onMouseOut={() => setIsLangOpen(false)} />
                            <div onClick={() => setIsLangOpen(false)} onMouseLeave={() => setIsLangOpen(false)}>
                                {isLangOpen && <LanguageDropdown />}
                            </div>
                        </li>
                    </div>
                    <button className={styles.navBtn} onClick={() => setIsNavOpen(!isNavOpen)}>
                        <FiMenu size={40} className={styles.burger} />
                    </button>
                </div>
            </header>
            <div onClick={() => setIsNavOpen(false)}>
                {isNavOpen && <MobileNavbar />}
            </div>
        </>
    )
}

export default Navbar;