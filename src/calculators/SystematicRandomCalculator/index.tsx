import React, { useState } from "react";
import styles from "./styles.module.scss";
import { WithTranslation, withTranslation } from "react-i18next";
import Card from "../../components/Card";
import ExportButton from "../../components/ExportButton";
import Terminology from "../../components/Terminology";
import SubgroupInput from "../../components/SubgroupInput";

interface SystematicRandomProps extends WithTranslation {
    hasSubgroups: boolean;
    questionCards: number[];
}

const SystematicRandomCalculator: React.FC<SystematicRandomProps> = ({
    hasSubgroups,
    t,
    questionCards,
}) => {
    const [marginOfError, setMarginOfError] = useState<number | null>(null);
    const [confidenceLevel, setConfidenceLevel] = useState<number | null>(null);
    const [nonResponseRate, setNonResponseRate] = useState<number | null>(null);
    const [households, setHouseholds] = useState<number | null>(null);
    const [individuals, setIndividuals] = useState<number | null>(null);
    const [sampleSize, setSampleSize] = useState<number | null>(null);
    const [subgroups, setSubgroups] = useState<any[] | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMarginOfError(Number(event.currentTarget.margin.value));
        setConfidenceLevel(Number(event.currentTarget.confidence.value));
        setNonResponseRate(Number(event.currentTarget.response.value));
        setHouseholds(
            event.currentTarget.households
                ? Number(event.currentTarget.households.value)
                : null
        );
        setIndividuals(
            event.currentTarget.individuals
                ? Number(event.currentTarget.individuals.value)
                : null
        );
        calculateSampleSize();
    };

    const calculateSampleSize = () => {
        // call API to calculate sample size
        setSampleSize(50);
    };

    return (
        <>
            {hasSubgroups && (
                <Card>
                    <h2>
                        <Terminology term="sub-population groups" text="Identify sub-population groups" />
                    </h2>
                    <SubgroupInput onSubmitSubgroups={(subgroups) => setSubgroups(subgroups)} />
                </Card>
            )}
            {( subgroups || !hasSubgroups) && (
                <Card>
                    <h2>
                        <Terminology term="simple random" text="Simple Random Calculator" />
                    </h2>
                    <form className={styles.inputFields} onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <label htmlFor="margin"> Margin of error (%)</label>
                            <input type="number" id="margin" name="margin" placeholder="5" />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="confidence"> Confidence level (%)</label>
                            <select id="confidence" name="confidence">
                                <option value="95">95</option>
                                <option value="99">99</option>
                                <option value="90">90</option>
                                <option value="85">85</option>
                                <option value="80">80</option>
                            </select>
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="response"> Non-response rate (%)</label>
                            <input type="number" id="response" name="response" placeholder="0" />
                        </div>
                        {(
                            <div className={styles.field}>
                                <label htmlFor="households"> Number of households </label>
                                <input type="number" id="households" name="households" placeholder="" />
                            </div>
                        )}
                        {(
                            <div className={styles.field}>
                                <label htmlFor="individuals"> Number of individuals </label>
                                <input type="number" id="individuals" name="individuals" placeholder="" />
                            </div>
                        )}
                        <div className={styles.calculate}>
                            <input type="submit" className={styles.btn} />
                        </div>
                    </form>
                </Card>
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
                        {
                            marginOfError,
                            confidenceLevel,
                            nonResponseRate,
                            households,
                            individuals,
                            sampleSize,
                            // also pass subgroups
                        }
                    } />
                </div>
            )}
        </>
    )
}

export default withTranslation()(SystematicRandomCalculator);