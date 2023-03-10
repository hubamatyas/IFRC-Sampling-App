import React from "react";
import styles from "./styles.module.scss";
import Button from "../../components/Button/index";
import lang from "../../lang.js"
import { useTranslation } from "react-i18next";
import QuestionCard from "../../components/QuestionCard/index";
import DecisionTree from "../../components/DecisionTree";


function Sampling(){
    const { t } = useTranslation();
    return (
        <>
            <div className={styles.tool}>
                <DecisionTree />
            </div>
            <div className={styles.howto}>
                <h1> {lang.headerHowTo} </h1>
            </div>
        </>
    );
}

export default Sampling;
