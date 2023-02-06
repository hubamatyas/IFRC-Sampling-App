import React from "react";
import styles from "./styles.module.scss";
import logo from "../../assets/logo.svg";
import lang from "../../lang.js";
import { Link } from "react-router-dom";

const LanguageDropdown = () => (
    <div className={styles.selection}>
        <li className={styles.lang}>English</li>
        <li className={styles.lang}>French</li>
        <li className={styles.lang}>Spanish</li>
        <li className={styles.lang}>Arabic</li>
    </div>
);

export default LanguageDropdown;