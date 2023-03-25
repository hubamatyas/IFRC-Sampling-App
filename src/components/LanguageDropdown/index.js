import React from "react";
import i18nex from "i18next";
import { _cs } from "@togglecorp/fujs";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";
function LanguageDropdown() {
    const { t } = useTranslation();
    const languages = [
        { name: t("english"), code: "en" },
        { name: t("french"), code: "fr" },
        { name: t("spanish"), code: "es" },
        { name: t("arabic"), code: "ar" }
    ];

    return (
        <div className={styles.selection}>
            <ul className={styles.langList} data-cy="langDropdown">
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