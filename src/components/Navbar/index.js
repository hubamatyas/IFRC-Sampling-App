import React, { useState } from "react";
import styles from "./styles.module.scss";
import logo from "../../assets/logo.svg";
import globe from "../../assets/globe.svg";
import { useTranslation } from "react-i18next";
import MobileNavbar from "../MobileNavbar";
import LanguageDropdown from "../LanguageDropdown";
import lang from "../../lang.js";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";


function Navbar(){
    const { t } = useTranslation();

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    let mobileNav
    let langDropdown

    if (isNavOpen) {
        mobileNav = ( <MobileNavbar/> )
    }

    if (isLangOpen) {
        langDropdown = ( <LanguageDropdown/> )
    }

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
                        <Link to="/">
                            <li className={styles.link}>{t('menuHome')}</li>
                        </Link>
                        <Link to="/sampling">
                            <li className={styles.link}>{lang.menuSampling}</li>
                        </Link>
                        <Link to="/resources">
                            <li className={styles.link}>{lang.menuResources}</li>
                        </Link>
                        <Link to="/about">
                            <li className={styles.link}>{lang.menuAbout}</li>
                        </Link>
                        <li className={styles.link} onMouseOver={() => setIsLangOpen(true)}>
                            <img src={globe} alt={lang.altGlobe} />
                            <div onClick={() => setIsLangOpen(false)} onMouseLeave={() => setIsLangOpen(false)}>
                                { langDropdown }
                            </div>
                        </li>
                    </div>
                    <button className={styles.navBtn} onClick={() => setIsNavOpen(!isNavOpen)}>
                        <FiMenu size={40} className={styles.burger}/>
                    </button>
                </div>
            </header>
            <div onClick={() => setIsNavOpen(false)}>
                { mobileNav }
            </div>
        </>
    )
}

export default Navbar;