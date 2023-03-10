import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { WithTranslation, withTranslation } from "react-i18next";
import Card from "../../components/Card";
import ExportButton from "../../components/ExportButton";
import Terminology from "../../components/Terminology";
import SubgroupInput from "../../components/SubgroupInput";
import axios from "axios";

interface SimpleRandomProps extends WithTranslation {
    subgroups?: any[] | null;
    hasSubgroups: boolean;
    hasHouseholds: boolean;
    hasIndividuals: boolean;
    // add onSubmit prop which should be a function or null, and should be optional
    onSubmitSimpleRandom: (simpleRandomResponse: SimpleRandomResponse, isSimpleRandomReady: boolean) => void;
}

interface SimpleRandomResponse {
    sampleSize: {} | null;
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
    const [sampleSize, setSampleSize] = useState<{} | null>(null);

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
        }, true);
    }, [sampleSize]);

    useEffect(() => {
        if (marginOfError && confidenceLevel && nonResponseRate && (households || individuals || subgroups)) {
            calculateSampleSize();
        }
    }, [marginOfError, confidenceLevel, nonResponseRate, households, individuals]);
    
    // useEffect(() => {
    //     onSubmitSimpleRandom({
    //         sampleSize: null,
    //         marginOfError: null,
    //         confidenceLevel: null,
    //         nonResponseRate: null,
    //         households: null,
    //         individuals: null,
    //     }, false);
    // }, [marginOfError, confidenceLevel, nonResponseRate, households, individuals]);

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
        const url = `https://ifrc-sampling.azurewebsites.net/api/simple-random/`;

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
            setSampleSize(response.data["sample_size"]);
        } catch (error) {
            console.log(error);
            window.alert(error);
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
                    <input
                        type="number"
                        id="margin"
                        name="margin"
                        placeholder="5"
                        onWheel={ event => event.currentTarget.blur()}
                        // onChange={(e) => {
                        //     setMarginOfError(Number(e.target.value));
                        // }}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="confidence"> Confidence level (%)</label>
                    <select
                        id="confidence"
                        name="confidence"
                        // onChange={(e) => {
                        //     setConfidenceLevel(Number(e.target.value));
                        // }}
                    >
                        <option value="95">95</option>
                        <option value="99">99</option>
                        <option value="90">90</option>
                        <option value="85">85</option>
                        <option value="80">80</option>
                    </select>
                </div>
                <div className={styles.field}>
                    <label htmlFor="response"> Non-response rate (%)</label>
                    <input type="number"
                        id="response"
                        name="response"
                        placeholder="0"
                        onWheel={ event => event.currentTarget.blur()}
                        // onChange={(e) => {
                        //     setNonResponseRate(Number(e.target.value));
                        // }}
                    />
                </div>
                {hasHouseholds && (
                    <div className={styles.field}>
                        <label htmlFor="households"> Number of households </label>
                        <input
                            type="number"
                            id="households"
                            name="households"
                            placeholder=""
                            onWheel={ event => event.currentTarget.blur()}
                            // onChange={(e) => {
                            //     setHouseholds(parseInt(e.target.value));
                            // }}
                        />
                    </div>
                )}
                {hasIndividuals && !hasSubgroups && (
                    <div className={styles.field}>
                        <label htmlFor="individuals"> Number of individuals </label>
                        <input
                            type="number"
                            id="individuals"
                            name="individuals"
                            placeholder=""
                            onWheel={ event => event.currentTarget.blur()}
                            // onChange={(e) => {
                            //     setIndividuals(parseInt(e.target.value));
                            // }}
                        />
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