import React from "react";
import { _cs } from "@togglecorp/fujs";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

import Button from "../../components/Button/index";
import DecisionTree from "src/components/DecisionTree";

function Sampling(){
    const { t } = useTranslation();
    return (
        <>
            <div className={styles.titleSegment}>
                <div className={styles.intro}>
                    <h1>{t('samplingTitle')}</h1>
                    <p>{t('samplingText')}</p>
                </div>
            </div>
            <div className={styles.tool}>
                <DecisionTree />
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
            </div>
        </>
    );
}

export default Sampling;