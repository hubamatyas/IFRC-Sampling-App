import React from "react";
import styles from "./styles.module.scss";
import lang from "../../lang.js";
import { Link } from "react-router-dom";
import LanguageDropdown from "../LanguageDropdown";

const MobileNavbar = () => (
    <div className={styles.menu}>
        <Link to="/">
            <li className={styles.link}>{lang.menuHome}</li>
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
        <li className={styles.link}>
            <LanguageDropdown />
        </li>
    </div>
);

export default MobileNavbar;