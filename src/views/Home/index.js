import React from "react";
import styles from "./styles.module.scss";
import Button from "../../components/ButtonLikeLink/index";
import lang from "../../lang.js"
import { useTranslation } from "react-i18next";


function Home(){
    const { t } = useTranslation();

    return (
        <>
            <div className={styles.intro}>
                <h1> {t('headerAppName')} </h1>
                <p> {lang.aboutGoal} </p>
                <p> {lang.aboutRedCross} </p>
                <p> {lang.aboutDetail} </p>
                <Button
                    text={lang.buttonGetStarted}
                    link="/sampling"
                    style="default"
                />
            </div>
            <div className={styles.features}>
                <h1> {lang.headerFeatures} </h1>
                <p> {lang.aboutFeatures} </p>
                <h2> {lang.aboutFeaturesSubheader} </h2>
                <ul>
                    <li> {lang.aboutFeature1} </li>
                    <li> {lang.aboutFeature2} </li>
                    <li> {lang.aboutFeature3} </li>
                </ul>
            </div>
            <div className={styles.howto}>
                <h1> {lang.headerHowTo} </h1>
                <Button
                        text={lang.buttonGetStarted}
                        link="/sampling"
                        style="inverse"
                />
            </div>
        </>
    );
}

export default Home;