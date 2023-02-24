import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import i18nex from "i18next";
import { _cs } from "@togglecorp/fujs";

function LanguageDropdown() {
    const languages = [
        { name: "English", code: "en" },
        { name: "French", code: "fr" },
        { name: "Spanish", code: "es" },
        { name: "Arabic", code: "ar" }
    ];

    return (
        <div className={styles.selection}>
            <ul>
                {languages.map((language, index) => (
                    <Link to="/" key={index}>
                        <li
                            className={_cs(
                                styles.lang,
                                i18nex.language === language.code && styles.active
                            )}
                            onClick={() => i18nex.changeLanguage(language.code)}>
                            {language.name}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default LanguageDropdown;