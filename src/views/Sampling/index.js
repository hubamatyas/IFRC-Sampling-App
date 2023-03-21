import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

import DecisionTree from "src/components/DecisionTree";

function Sampling(){
    const { t } = useTranslation();
    return (
        <>
            <div className={styles.segment}>
                <div className={styles.intro}>
                    <h1>{t('samplingTitle')}</h1>
                    <p>{t('samplingText')}</p>
                </div>
            </div>
            <div className={styles.tool}>
                <DecisionTree />
            </div>
            <div className={styles.howto}>
                <h1>{t('headerHowTo')}</h1>
            </div>
        </>
    );
}

export default Sampling;