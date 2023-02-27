import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { WithTranslation, withTranslation } from "react-i18next";
import Card from "../../components/Card";
import ExportButton from "../../components/ExportButton";
import Terminology from "../../components/Terminology";
import SubgroupInput from "../../components/SubgroupInput";

interface SimpleRandomProps extends WithTranslation {
    subgroups?: any[] | null;
    hasSubgroups: boolean;
    hasHouseholds: boolean;
    hasIndividuals: boolean;
    // add onSubmit prop which should be a function or null, and should be optional
    onSubmitSimpleRandom: (simpleRandomResponse: SimpleRandomResponse) => void;
}

interface SimpleRandomResponse {
    sampleSize: number | null;
    marginOfError: number | null;
    confidenceLevel: number | null;
    nonResponseRate: number | null;
    households: number | null;
    individuals: number | null;
    // subgroups: any[] | null;
}

const SimpleRandom: React.FC<SimpleRandomProps> = ({
    subgroups,
    hasSubgroups,
    hasHouseholds,
    hasIndividuals,
    t,
    onSubmitSimpleRandom,
}) => {
    const [marginOfError, setMarginOfError] = useState<number | null>(null);
    const [confidenceLevel, setConfidenceLevel] = useState<number | null>(null);
    const [nonResponseRate, setNonResponseRate] = useState<number | null>(null);
    const [households, setHouseholds] = useState<number | null>(null);
    const [individuals, setIndividuals] = useState<number | null>(null);
    const [sampleSize, setSampleSize] = useState<number | null>(null);

    useEffect(() => {
        // return sample size to parent component
        onSubmitSimpleRandom({
            sampleSize: sampleSize,
            marginOfError: marginOfError,
            confidenceLevel: confidenceLevel,
            nonResponseRate: nonResponseRate,
            households: households,
            individuals: individuals,
            // subgroups: subgroups,
        });
    }, [sampleSize]);

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

    const calculateSampleSize = async () => {
        const data = {
            margin_of_error: marginOfError,
            confidence_level: confidenceLevel,
            non_response_rate: nonResponseRate,
            subgroups: subgroups,
            households: households,
            individuals: individuals,
        };
        const url = `http://127.0.0.1:8000/api/simple-random/`;

        try {
            const response = await fetch(url, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            setSampleSize(responseData['sample_size']);
        } catch (error) {
            window.alert('Error: ' + 'Calculation failed');
            console.error('Error:', error);
        }
    };

    return (
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
                {hasHouseholds && (
                    <div className={styles.field}>
                        <label htmlFor="households"> Number of households </label>
                        <input type="number" id="households" name="households" placeholder="" />
                    </div>
                )}
                {hasIndividuals && !hasSubgroups && (
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
    )
}

export default withTranslation()(SimpleRandom);