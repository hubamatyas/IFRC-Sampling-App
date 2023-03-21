import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

import ShowMore from "../../components/ShowMore";
import Definitions from "../../components/Definitions/index";

function Resources(){
    const { t } = useTranslation();
    const definitions = Definitions();
    return (
        <>
            <div className={styles.intro}>
                <h1 className={styles.title}>{t('resourcesTitle')}</h1>
                <p className={styles.introText}>{t('resourcesText')}</p>
            </div>
            <div className={styles.resources}>
                {
                    Object.entries(definitions).map((key) => (
                        <ShowMore
                            title={key[0].charAt(0).toUpperCase() + key[0].slice(1)}
                            content={key[1]}
                        />
                    ))
                }
            </div>
        </>
    );
}

export default Resources;