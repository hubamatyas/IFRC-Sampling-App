import React, { useCallback, useState } from "react";
import styles from "./styles.module.scss";
import { WithTranslation, withTranslation } from "react-i18next";
import Card from "../../components/Card";
import ExportButton from "../../components/ExportButton";
import Terminology from "../../components/Terminology";
import SimpleRandom from "../../components/SimpleRandom";
import SubgroupInput from "../../components/SubgroupInput";

interface TimeLocationProps extends WithTranslation {
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

const TimeLocationCalculator: React.FC<TimeLocationProps> = ({
    t,
    questionCards,
}) => {
    const [simpleRandomResponse, setSimpleRandomResponse] = useState<SimpleRandomResponse | null>(null);
    const [simpleRandomSampleSize, setSimpleRandomSampleSize] = useState<number | null>(null);

    const onSimpleRandomCalculation = useCallback((simpleRandomResponse: SimpleRandomResponse) => {
        setSimpleRandomResponse(simpleRandomResponse);
        console.log(simpleRandomResponse)
        setSimpleRandomSampleSize(simpleRandomResponse.sampleSize);
    }, []);

    return (
        <>
            <SimpleRandom
                hasSubgroups={false}
                hasHouseholds={false}
                hasIndividuals={true}
                onSubmitSimpleRandom={onSimpleRandomCalculation}
            />
            { simpleRandomSampleSize && (
                <Card>
                    <h2>
                        <Terminology term={null} text="Next step" />
                    </h2>
                    
                </Card>
            )}
            {simpleRandomSampleSize && (
                <div className={styles.result}>
                    <Card hasArrow={false}>
                        <h2> Sample Size: {simpleRandomSampleSize} </h2>
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
                        // also pass subgroups
                    } />
                </div>
            )}
        </>
    )
}

export default withTranslation()(TimeLocationCalculator);