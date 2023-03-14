import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

import Button from "../../components/Button/index";

function Home(){
    const { t } = useTranslation();

    return (
        <div>
            <div className={styles.background}>
                <div className={styles.intro}>
                    <h1> {t('headerAppName')} </h1>
                    <p> {t('aboutGoal')} </p>
                    <p> {t('aboutRedCross')} </p>
                    <p> {t('aboutDetail')} </p>
                    <Button
                        text={t('buttonGetStarted')}
                        link="/sampling"
                        style="default"
                    />
                </div>
            </div>
            <div className={styles.features}>
                <h1> {t('headerFeatures')} </h1>
                <p> {t('aboutFeatures')} </p>
                <h2> {t('aboutFeaturesSubheader')} </h2>
                <ul>
                    <li> {t('aboutFeature1')} </li>
                    <li> {t('aboutFeature2')} </li>
                    <li> {t('aboutFeature3')} </li>
                </ul>
            </div>
            <div className={styles.howto}>
                <h1> {t('headerHowTo')} </h1>
                <Button
                        text={t('buttonGetStarted')}
                        link="/sampling"
                        style="inverse"
                />
            </div>
        </div>
    );
}

export default Home;