import React, { useState } from "react";
import styles from "./styles.module.scss";
import logo from "../../assets/logo.svg";
import globe from "../../assets/globe.svg";
import { useTranslation } from "react-i18next";
import MobileNavbar from "../MobileNavbar";
import LanguageDropdown from "../LanguageDropdown";
import lang from "../../lang.js";
import { Link, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

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
                                <img src={logo} alt={lang.altLogo} />
                            </li>
                        </Link>
                    </div>
                    <div className={styles.navlinks}>
                        <Link to="/" className={location.pathname === '/' ? styles.active : ''}>
                            <li className={styles.link}>{t('menuHome')}</li>
                        </Link>
                        <Link to="/sampling" className={location.pathname === '/sampling' ? styles.active : ''}>
                            <li className={styles.link}>{lang.menuSampling}</li>
                        </Link>
                        <Link to="/resources" className={location.pathname === '/resources' ? styles.active : ''}>
                            <li className={styles.link}>{lang.menuResources}</li>
                        </Link>
                        <Link to="/about" className={location.pathname === '/about' ? styles.active : ''}>
                            <li className={styles.link}>{lang.menuAbout}</li>
                        </Link>
                        <li className={styles.link} onMouseOver={() => setIsLangOpen(true)}>
                            <img src={globe} alt={lang.altGlobe} onMouseOut={() => setIsLangOpen(false)} />
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