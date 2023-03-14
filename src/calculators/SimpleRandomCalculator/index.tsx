import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { WithTranslation, withTranslation } from "react-i18next";
import Card from "../../components/Card";
import ExportButton from "../../components/ExportButton";
import Terminology from "../../components/Terminology";
import SubgroupInput from "../../components/SubgroupInput";
import SimpleRandom from "../../components/SimpleRandom";
import {calculatorInputs, calculatorOutputs, subgroupsType, sampleSizeType} from "../../types/calculatorResponse";

interface SimpleRandomCalculatorProps extends WithTranslation {
    hasSubgroups: boolean;
    hasHouseholds: boolean;
    hasIndividuals: boolean;
    questionCards: number[];
}


const SimpleRandomCalculator: React.FC<SimpleRandomCalculatorProps> = ({
    hasSubgroups,
    hasHouseholds,
    hasIndividuals,
    t,
    questionCards,
}) => {
    const [sampleSize, setSampleSize] = useState<sampleSizeType>(null);
    const [isSubgroupsReady, setIsSubgroupsReady] = useState<boolean>(false);
    const [isSimpleRandomReady, setIsSimpleRandomReady] = useState<boolean>(false);
    const [subgroups, setSubgroups] = useState<subgroupsType>(null);
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
        setCalculatorInputs(calculatorInputs);
        setCalculatorOutputs({sampleSize:sampleSize, aboutGoal:t('aboutGoal')});
        setSampleSize(sampleSize);
    }, []);

    return (
        <>
            {hasSubgroups && !hasHouseholds && (
                <Card>
                    <h2>
                        <Terminology term="sub-population groups" text="Identify sub-population groups" />
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
                    // onSubmitSimpleRandom={(calculatorInputs) => setSampleSize(calculatorInputs.sampleSize)}
                />
            )}
            {sampleSize && (
                <div className={styles.result}>
                    <Card hasArrow={false}>
                        {subgroups ? (
                            <>
                                {Object.keys(sampleSize).map((key: string) => (
                                    <div key={key}>
                                        <h3>Sample size for <u>{key}</u> is <u>{sampleSize[key]}</u></h3>
                                    </div>
                                ))}
                                <p className={styles.description}>
                                    {t('aboutGoal')}
                                </p>
                            </>
                        ) : (
                            <>
                                <h3>Sample size: {Object.values(sampleSize)[0]}</h3>
                                <p className={styles.description}>
                                    {t('aboutGoal')}
                                </p>
                            </>
                        )}
                    </Card>
                    <ExportButton 
                        questionCards={questionCards} 
                        calculatorInputs={calculatorInputs}
                        calculatorOutputs={calculatorOutputs}
                        subgroupSizes={subgroups}
                    />
                </div>
            )}
        </>
    )
}

export default withTranslation()(SimpleRandomCalculator);