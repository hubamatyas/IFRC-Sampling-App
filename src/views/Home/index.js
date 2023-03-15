import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";
import document from "../../assets/document.svg"

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
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <div className={styles.header}>
                            <img className={styles.icon} src={document} width="50px"/>
                            <h1 className={styles.title}>Feature One</h1>
                        </div>
                        <div className={styles.content}>
                            <p> {t('aboutFeatures')} </p>
                            <p className={styles.link}><a>Download a sample report</a></p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.header}>
                            <img className={styles.icon} src={document} width="50px"/>
                            <h1 className={styles.title}>Feature One</h1>
                        </div>
                        <div className={styles.content}>
                            <p> {t('aboutFeatures')}{t('aboutFeatures')} </p>
                            <p className={styles.link}><a>Download a sample report</a></p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.header}>
                            <img className={styles.icon} src={document} width="50px"/>
                            <h1 className={styles.title}>Feature One</h1>
                        </div>
                        <div className={styles.content}>
                            <p> {t('aboutFeatures')} </p>
                            <p className={styles.link}><a>Download a sample report</a></p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.header}>
                            <img className={styles.icon} src={document} width="50px"/>
                            <h1 className={styles.title}>Feature One</h1>
                        </div>
                        <div className={styles.content}>
                            <p> {t('aboutFeatures')}{t('aboutFeatures')} </p>
                            <p className={styles.link}><a>Download a sample report</a></p>
                        </div>
                    </div>
                </div>
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