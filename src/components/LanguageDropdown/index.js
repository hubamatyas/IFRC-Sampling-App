import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import i18nex from "i18next";

function LanguageDropdown() {
    const languages = [
        { name: "English", code: "en" },
        { name: "French", code: "fr" },
        { name: "Spanish", code: "es" },
        { name: "Arabic", code: "ar" }
    ];

    console.log(i18nex.language);

    return (
        <div className={styles.selection}>
            {languages.map((language, index) => (
                <Link to="/" key={index}>
                    <li
                        className={[styles.lang, i18nex.language === language.code ? styles.active : ""].join(" ")}
                        onClick={() => i18nex.changeLanguage(language.code)}>
                        {language.name}
                    </li>
                </Link>
            ))}
        </div>
    )
}

export default LanguageDropdown;