import { WithTranslation, withTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.scss";
import config from 'src/util/config';
import Card from "../../components/Card";
import Terminology from "../../components/Terminology";
import {calculatorInputs, sampleSizeType} from "../../types/calculatorResponse";
import Alert from"../../components/Alert";

/**
 * Describes the expected shape of the props object received by SimpleRandom.
 * @component
 * @typedef {Object} SimpleRandomProps
 * @property {boolean} hasSubgroups - A flag indicating if subgroups are included in the survey.
 * @property {boolean} hasHouseholds - A flag indicating if households are included in the survey.
 * @property {boolean} hasIndividuals - A flag indicating if individuals are included in the survey.
 * @property {Array} [subgroups=null] - An optional array of subgroups to include in the survey.
 * @property {function} onSubmitSimpleRandom - A function that receives the calculated sample size.
 * @property {Object} onSubmitSimpleRandom.simpleRandomResponse - An object containing the calculated sample size.
 * @property {number} onSubmitSimpleRandom.simpleRandomResponse.sampleSize - The estimated sample size.
 * @property {number} onSubmitSimpleRandom.simpleRandomResponse.households - The number of households to include in the survey.
 * @property {number} onSubmitSimpleRandom.simpleRandomResponse.individuals - The number of individuals to include in the survey.
 * @property {number} onSubmitSimpleRandom.simpleRandomResponse.marginOfError - The desired margin of error.
 * @property {number} onSubmitSimpleRandom.simpleRandomResponse.confidenceLevel - The desired confidence level.
 * @property {number} onSubmitSimpleRandom.simpleRandomResponse.nonResponseRate - The non-response rate.
 */

 interface SimpleRandomProps extends WithTranslation {
    subgroups?: any[] | null;
    hasSubgroups: boolean;
    hasHouseholds: boolean;
    hasIndividuals: boolean;
    // add onSubmit prop which should be a function or null, and should be optional
    onSubmitSimpleRandom: (
        calculatorInputs: calculatorInputs,
        sampleSize: sampleSizeType,
        isSimpleRandomReady: boolean) => void;
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
    const [sampleSize, setSampleSize] = useState<sampleSizeType>(null);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [showAlert, setShowAlert] = useState<boolean>(false);

    useEffect(() => {
        // return sample size to parent component
        onSubmitSimpleRandom(
        {
            "Margin of error": marginOfError,
            "Confidence level(%)": confidenceLevel,
            "Non-response rate(%)": nonResponseRate,
            "Households": households,
            "Individuals": individuals,
        },
        sampleSize,
        true);
    }, [sampleSize]);

    useEffect(() => {
        if (marginOfError && confidenceLevel && (households || individuals || subgroups)) {
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
            subgroups: subgroups,
            households: households,
            individuals: individuals,
            margin_of_error: marginOfError,
            confidence_level: confidenceLevel,
            non_response_rate: nonResponseRate,
        };

        const url = `${config.api}/simple-random/`;
        try {
            const response = await axios.post(url, data, { 
                headers: {
                    "Content-Type": "application/json",
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

    const alertIfInvalid=()=>{
        const marginElement = (document.getElementById("margin") as HTMLInputElement)
        const responseElement = (document.getElementById("response") as HTMLInputElement)
        const householdsElement = (document.getElementById("households") as HTMLInputElement)
        const individualsElement = (document.getElementById("individuals") as HTMLInputElement)

        if(marginElement?.value && Number(marginElement?.value)<=0){
            setAlertMessage("Margin of error must be larger than zero.")
        }else if (responseElement?.value && Number(responseElement?.value)<0){
            setAlertMessage("Non-response rate must be larger or equal to zero.")
        }else if (householdsElement?.value && Number(householdsElement?.value)<=0){
            setAlertMessage("Number of households must be larger than zero.")
        }else if (individualsElement?.value && Number(individualsElement?.value)<=0){
            setAlertMessage("Number of individuals must be larger than zero.")
        }else{
            setShowAlert(false);
            return;
        }
        setShowAlert(true);
    }

    return (
        <Card>
            <h2>
                <Terminology term="simple random" text="Simple Random Calculator" />
            </h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputFields}>
                    <div className={styles.field}>
                        <label htmlFor="margin">
                            <Terminology term="margin of error" text="Margin of error (%)" />
                        </label>
                        <input
                            min="1"
                            max="20"
                            step="1"
                            required
                            id="margin"
                            type="number"
                            name="margin"
                            placeholder="5"
                            onWheel={event => event.currentTarget.blur()}
                            onBlur={alertIfInvalid}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="confidence">
                            <Terminology term="confidence level" text="Confidence level (%)" />
                        </label>
                        <select
                            required
                            id="confidence"
                            name="confidence"
                            onWheel={event => event.currentTarget.blur()}
                        >
                            <option value="95">95</option>
                            <option value="99">99</option>
                            <option value="90">90</option>
                            <option value="85">85</option>
                            <option value="80">80</option>
                        </select>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="response">
                            <Terminology term="non-response rate" text="Non-response rate (%)" />
                        </label>
                        <input
                            min="0"
                            max="80"
                            step="1"
                            type="number"
                            id="response"
                            name="response"
                            onWheel={event => event.currentTarget.blur()}
                            onBlur={alertIfInvalid}
                        />
                    </div>
                    {hasHouseholds && (
                        <div className={styles.field}>
                            <label htmlFor="households">
                                <Terminology term="households" text="Number of households" />
                            </label>
                            <input
                                min="1"
                                step="1"
                                required
                                type="number"
                                id="households"
                                name="households"
                                onWheel={event => event.currentTarget.blur()}
                                onBlur={alertIfInvalid}
                            />
                        </div>
                    )}
                    {hasIndividuals && !hasSubgroups && (
                        <div className={styles.field}>
                            <label htmlFor="individuals">
                                <Terminology term="individuals" text="Number of individuals" />
                            </label>
                            <input
                                min="1"
                                step="1"
                                required
                                type="number"
                                id="individuals"
                                name="individuals"
                                onWheel={event => event.currentTarget.blur()}
                                onBlur={alertIfInvalid}
                            />
                        </div>
                    )}
                </div>

                {showAlert && 
                    <Alert
                        onClose={() => setShowAlert(false)}
                        text={alertMessage}
                        type="warning"
                    />
                }
                <div className={styles.calculate}>
                    <input type="submit" className={styles.btn} value="Submit"/>
                </div>
            </form>
        </Card>
    )
}

export default withTranslation()(SimpleRandom);