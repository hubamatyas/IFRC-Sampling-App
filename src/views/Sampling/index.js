import React from "react";
import styles from "./styles.module.scss";
import Button from "../../components/Button/index";
import lang from "../../lang.js"
import { useTranslation } from "react-i18next";
import QuestionCard from "../../components/QuestionCard/index";
import DecisionTree from "src/components/DecisionTree";


function Sampling(){
    const { t } = useTranslation();
    return (
        <>
            <div className={styles.intro}>
                <h1> {t('headerAppName')} </h1>
                <p> {lang.aboutGoal} </p>
                <p> {lang.aboutRedCross} </p>
                <p> {lang.aboutDetail} </p>
            </div>
            <div className={styles.features}>
                <DecisionTree />
            </div>
            <div className={styles.howto}>
                <h1> {lang.headerHowTo} </h1>
            </div>
        </>
    );
}

export default Sampling;