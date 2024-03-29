import React, { useCallback, useEffect, useState } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { _cs } from "@togglecorp/fujs";

import styles from "./styles.module.scss";

import Card from "../../components/Card";
import Terminology from "../../components/Terminology";
import SimpleRandom from "../../components/SimpleRandom";
import ExportButton from "../../components/ExportButton";
import SubgroupInput from "../../components/SubgroupInput";
import {calculatorInputs, calculatorOutputs, subgroupsType, sampleSizeType} from "../../types/calculatorResponse";

/**
@fileoverview This module provides a Simple Random Calculator that calculates
the required sample size to estimate population parameters with a given margin of 
error, confidence level, and non-response rate. It exports a React functional 
component that renders a form with input fields for the user to enter the required 
parameters. Upon submission, it uses the axios library to make a POST request to an
API to calculate the sample size.
@module SimpleRandomCalculator
*/

interface SimpleRandomCalculatorProps extends WithTranslation {
    hasSubgroups: boolean;
    hasHouseholds: boolean;
    hasIndividuals: boolean;
    questionCards: number[];
}

const SimpleRandomCalculator: React.FC<SimpleRandomCalculatorProps> = ({
    t,
    hasSubgroups,
    hasHouseholds,
    questionCards,
    hasIndividuals,
}) => {
    const [subgroups, setSubgroups] = useState<subgroupsType>(null);
    const [sampleSize, setSampleSize] = useState<sampleSizeType>(null);
    const [isSubgroupsReady, setIsSubgroupsReady] = useState<boolean>(false);
    const [calculatorInputs, setCalculatorInputs] = useState<calculatorInputs>(null);
    const [calculatorOutputs, setCalculatorOutputs] = useState<calculatorOutputs>(null);

    useEffect(() => {
        if (!isSubgroupsReady) {
            setSampleSize(null);
        }
    }, [isSubgroupsReady]);

    const onSimpleRandomCalculation = useCallback((
        calculatorInputs: calculatorInputs, 
        sampleSize: Record<string, number> | null
    ) => {
        setSampleSize(sampleSize);
        setCalculatorInputs(calculatorInputs);
        setCalculatorOutputs({
            sampleSize:sampleSize, 
            aboutGoal:t('definitionsSimpleResult1')+"\n\n"+t('definitionsSimpleResult2')
        });
    }, []);

    return (
        <>
            {hasSubgroups && !hasHouseholds && (
                <Card>
                    <h2>
                        <Terminology 
                            term="sub-population groups" 
                            text="Identify sub-population groups" 
                        />
                    </h2>
                    <SubgroupInput
                        onSubmitSubgroups={(subgroups, isReady) => {
                                setSubgroups(subgroups);
                                setIsSubgroupsReady(isReady);
                            }
                        }
                    />
                </Card>
            )}
            {(hasHouseholds || isSubgroupsReady && (hasIndividuals && subgroups) || (hasIndividuals && !hasSubgroups)) && (
                <SimpleRandom
                    subgroups={subgroups}
                    hasSubgroups={hasSubgroups}
                    hasHouseholds={hasHouseholds}
                    hasIndividuals={hasIndividuals}
                    onSubmitSimpleRandom={onSimpleRandomCalculation}
                />
            )}
            {sampleSize && (
                <div className={styles.result}>
                    <Card hasArrow={false}>
                        {subgroups ? (
                            <>
                                <div className={styles.content} data-cy={"sampleSize"}>
                                    {Object.keys(sampleSize).map((key: string) => (
                                        <div key={key}>
                                            <h2 className={styles.title}>Sample size for <b>{key}</b> is:</h2>
                                            <h3 className={styles.number}>{sampleSize[key]}</h3>
                                        </div>
                                    ))}
                                </div>
                                <p className={styles.description}>{t('definitionsSimpleResult1')}</p>
                                <p className={styles.description}>{t('definitionsSimpleResult2')}</p>
                            </>
                        ) : (
                            <div data-cy={"sampleSize"}>
                                <h1 className={styles.title}>Sample size:</h1>
                                <h2 className={styles.number}>{Object.values(sampleSize)[0]}</h2>
                                <p className={styles.description}>{t('definitionsSimpleResult1')}</p>
                                <p className={styles.description}>{t('definitionsSimpleResult2')}</p>                                
                            </div>
                        )}
                        <p className={_cs(styles.description, styles.info)}>
                            <span>{t('result1')}</span>
                            <span><a href="/Resources" target="_blank">{t('result2')}</a></span>
                            <span>{t('result3')}</span>
                        </p>
                    </Card>
                    <div className={styles.exportBtn}>
                        <ExportButton 
                            subgroupSizes={subgroups}
                            questionCards={questionCards} 
                            calculatorInputs={calculatorInputs}
                            calculatorOutputs={calculatorOutputs}
                            
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default withTranslation()(SimpleRandomCalculator);