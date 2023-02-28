import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { WithTranslation, withTranslation } from "react-i18next";
import Card from "../../components/Card";
import ExportButton from "../../components/ExportButton";
import Terminology from "../../components/Terminology";
import SubgroupInput from "../../components/SubgroupInput";
import SimpleRandom from "src/components/SimpleRandom";

interface SimpleRandomCalculatorProps extends WithTranslation {
    hasSubgroups: boolean;
    hasHouseholds: boolean;
    hasIndividuals: boolean;
    questionCards: number[];
}

interface SimpleRandomResponse {
    sampleSize: number | null;
    marginOfError: number | null;
    confidenceLevel: number | null;
    nonResponseRate: number | null;
    households: number | null;
    individuals: number | null;
    //subgroups: any[] | null;
}

const SimpleRandomCalculator: React.FC<SimpleRandomCalculatorProps> = ({
    hasSubgroups,
    hasHouseholds,
    hasIndividuals,
    t,
    questionCards,
}) => {
    const [sampleSize, setSampleSize] = useState<number | null>(null);
    const [isSubgroupsReady, setIsSubgroupsReady] = useState<boolean>(false);
    const [isSimpleRandomReady, setIsSimpleRandomReady] = useState<boolean>(false);
    const [subgroups, setSubgroups] = useState<any[] | null>(null);
    const [simpleRandomResponse, setSimpleRandomResponse] = useState<SimpleRandomResponse | null>(null);

    useEffect(() => {
        if (!isSubgroupsReady) {
            setSampleSize(null);
        }
    }, [isSubgroupsReady]);

    const onSimpleRandomCalculation = useCallback((simpleRandomResponse: SimpleRandomResponse) => {
        setSimpleRandomResponse(simpleRandomResponse);
        console.log(simpleRandomResponse)
        setSampleSize(simpleRandomResponse.sampleSize);
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
                    // onSubmitSimpleRandom={(simpleRandomResponse) => setSampleSize(simpleRandomResponse.sampleSize)}
                />
            )}
            {sampleSize && (
                <div className={styles.result}>
                    <Card hasArrow={false}>
                        <h2> Sample Size: {sampleSize} </h2>
                        <p>
                            {t('aboutGoal')}
                            {t('aboutGoal')}
                            {t('aboutGoal')}
                            {t('aboutGoal')}
                            {t('aboutGoal')}
                        </p>
                    </Card>
                    <ExportButton questionCards={questionCards} calculatorState={
                        simpleRandomResponse
                        // add subgroups
                    } />
                </div>
            )}
        </>
    )
}

export default withTranslation()(SimpleRandomCalculator);