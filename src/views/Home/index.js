import React from "react";
import { _cs } from "@togglecorp/fujs";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";
import document from "../../assets/document.svg"
import plan from "../../assets/plan.svg"
import brain from "../../assets/brain.svg"
import book from "../../assets/book.svg"

import Button from "../../components/Button/index";

function Home(){
    const { t } = useTranslation();

    return (
        <div>
            <div className={styles.background}>
                <div className={styles.intro}>
                    <h1> {t('headerAppName')} </h1>
                    <p> {t('aboutTool')} </p>
                    <p> {t('aboutDetail')} </p>
                    <p> {t('aboutGoal')} </p>
                    <br/>
                    <Button
                        text={t('buttonGetStarted')}
                        link="/sampling"
                        style="inverse"
                    />
                </div>
            </div>
            <div className={styles.features}>
                <h1> {t('headerFeatures')} </h1>
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <div className={styles.header}>
                            <img className={styles.icon} src={brain} width="50px"/>
                            <h1 className={styles.title}>{t('featureApi')}</h1>
                        </div>
                        <div className={styles.content}>
                            <p> {t('featureApiText')} </p>
                            <p className={styles.link}><a
                                href="https://ifrc-sampling.azurewebsites.net/api/"
                            >{t('featureApiTest')}</a></p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.header}>
                            <img className={styles.icon} src={plan} width="50px"/>
                            <h1 className={styles.title}>{t('featureSampling')}</h1>
                        </div>
                        <div className={styles.content}>
                            <p> {t('featureSamplingText')} </p>
                            <p className={styles.link}><a
                                href="/sampling"
                            >{t('featureSamplingTest')}</a></p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.header}>
                            <img className={styles.icon} src={document} width="50px"/>
                            <h1 className={styles.title}>{t('featureExport')}</h1>
                        </div>
                        <div className={styles.content}>
                            <p> {t('featureExportText')} </p>
                            <p className={styles.link}><a
                                href="logo.svg"
                                download
                            >{t('featureExportTest')}</a></p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.header}>
                            <img className={styles.icon} src={book} width="50px"/>
                            <h1 className={styles.title}>{t('featureResources')}</h1>
                        </div>
                        <div className={styles.content}>
                            <p> {t('featureResourcesText')} </p>
                            <p className={styles.link}><a
                                href="/resources"
                            >{t('featureResourcesTest')}</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.abstract}>
                <div className={styles.segment}>
                    <h1 className={styles.segmentTitle}> {t('why')} </h1>
                    <p className={styles.segmentText}> {t('whyText')} </p>
                </div>
                <div className={styles.segment}>
                    <h1 className={styles.segmentTitle}> {t('how')} </h1>
                    <p className={styles.segmentText}> {t('howText')} </p>
                </div>
                <div className={styles.segment}>
                    <h1 className={styles.segmentTitle}> {t('who')} </h1>
                    <p className={styles.segmentText}> {t('whoText')} </p>
                </div>
            </div>
            <div className={styles.howto}>
                <h1> {t('headerHowTo')} </h1>
                <div className={styles.segment}>
                    <h1 className={_cs(
                        styles.segmentTitle,
                        styles.segmentNumber)
                    }>1.</h1>
                    <p className={_cs(
                        styles.segmentText,
                        styles.segmentKey)
                    }> {t('howTo1')} </p>
                </div>
                <div className={styles.segment}>
                    <h1 className={_cs(
                        styles.segmentTitle,
                        styles.segmentNumber)
                    }>2.</h1>
                    <p className={_cs(
                        styles.segmentText,
                        styles.segmentKey)
                    }> {t('howTo2')} </p>
                </div>
                <div className={styles.segment}>
                    <h1 className={_cs(
                        styles.segmentTitle,
                        styles.segmentNumber)
                    }>3.</h1>
                    <p className={_cs(
                        styles.segmentText,
                        styles.segmentKey)
                    }> {t('howTo3')} </p>
                </div>
                <div className={styles.segmentButton}>
                    <Button
                            text={t('buttonGetStarted')}
                            link="/sampling"
                            style="inverse"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;