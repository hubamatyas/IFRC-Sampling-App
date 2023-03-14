import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { WithTranslation, withTranslation } from "react-i18next";
import Card from "../../components/Card";
import ExportButton from "../../components/ExportButton";
import Terminology from "../../components/Terminology";
import SubgroupInput from "../../components/SubgroupInput";
import axios from "axios";
import { intervalsType } from "../../types/calculatorResponse";

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
    const [intervals, setIntervals] = useState<intervalsType>(null);
    const [subgroups, setSubgroups] = useState<any[] | null>(null);

    useEffect(() => {
        if (marginOfError && confidenceLevel && nonResponseRate && (households || individuals || subgroups)) {
            calculateSampleSize();
        }
    }, [marginOfError, confidenceLevel, nonResponseRate, households, individuals]);
    

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
    };

    const calculateSampleSize = async () => {
        const data = {
            margin_of_error: marginOfError,
            confidence_level: confidenceLevel,
            non_response_rate: nonResponseRate,
            subgroups: subgroups,
            households: households,
            individuals: individuals,
        };

        const url = `https://ifrc-sampling.azurewebsites.net/api/systematic-random/`;

        try {
            const response = await axios.post(url, data, { 
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.status !== 200) {
                const errorMessage = await response.data;
                throw new Error(errorMessage);
            }
            console.log(response.data["intervals"])
            setIntervals(response.data["intervals"]);
        } catch (error) {
            console.log(error);
            window.alert(error);
        }
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
                        <Terminology term="systematic random" text="Systematic Random Calculator" />
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
                        {!subgroups && (
                            <div className={styles.field}>
                                <label htmlFor="households"> Number of households </label>
                                <input type="number" id="households" name="households" placeholder="" />
                            </div>
                        )}
                        {!subgroups && (
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
            {intervals && (
                <div className={styles.result}>
                    <Card hasArrow={false}>
                    {subgroups ? (
                            <>
                                {Object.keys(intervals).map((key: string) => (
                                    <div key={key}>
                                        <h3>Interval for <u>{key}</u> is <u>{intervals[key]}</u></h3>
                                    </div>
                                ))}
                                <p className={styles.description}>
                                    {t('aboutGoal')}
                                </p>
                            </>
                        ) : (
                            <>
                                <h3>Interval: {Object.values(intervals)[0]}</h3>
                                <p className={styles.description}>
                                    {t('aboutGoal')}
                                </p>
                            </>
                        )}
                    </Card>
                    <ExportButton 
                        questionCards={questionCards}
                        calculatorInputs={{
                            "Margin of error": marginOfError,
                            "Confidence level": confidenceLevel,
                            "Non-response rate": nonResponseRate,
                            "Households": households,
                            "Individuals": individuals,
                        }}
                        calculatorOutputs={{
                            intervals : intervals,
                            aboutGoal : t('aboutGoal')
                        }}
                        subgroupSizes={subgroups}
                    />
                </div>
            )}
        </>
    )
}

export default withTranslation()(SystematicRandomCalculator);