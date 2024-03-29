import React, { useState, useEffect } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { _cs } from "@togglecorp/fujs";
import axios from "axios";

import styles from "./styles.module.scss";

import config from "../../util/config";
import Card from "../../components/Card";
import Terminology from "../../components/Terminology";
import ExportButton from "../../components/ExportButton";
import SubgroupInput from "../../components/SubgroupInput";
import Alert from "../../components/Alert";
import { intervalsType } from "../../types/calculatorResponse";

/**
@fileoverview This module provides a Systematic Random Calculator 
that calculates the required sample size to estimate population 
parameters with a given margin of error, confidence level, and 
non-response rate. It exports a React functional component that 
renders a form with input fields for the user to enter the required 
parameters. Upon submission, it uses the axios library to make a 
POST request to an API to calculate the sample size.
@module SystematicRandomCalculator
*/

interface SystematicRandomProps extends WithTranslation {
    hasSubgroups: boolean;
    questionCards: number[];
}

const SystematicRandomCalculator: React.FC<SystematicRandomProps> = ({
    t,
    hasSubgroups,
    questionCards,
}) => {
    const [subgroups, setSubgroups] = useState<any[] | null>(null);
    const [intervals, setIntervals] = useState<intervalsType>(null);
    const [households, setHouseholds] = useState<number | null>(null);
    const [individuals, setIndividuals] = useState<number | null>(null);
    const [marginOfError, setMarginOfError] = useState<number | null>(null);
    const [confidenceLevel, setConfidenceLevel] = useState<number | null>(null);
    const [nonResponseRate, setNonResponseRate] = useState<number | null>(null);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const maximumMarginOfError = 20;
    const maxNonResponseRate = 80;

    useEffect(() => {
        if (marginOfError && confidenceLevel && (households || individuals || subgroups)) {
            calculateSampleSize();
        }
    }, [marginOfError, confidenceLevel, nonResponseRate, households, individuals]);
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMarginOfError(Number(event.currentTarget.margin.value));
        setNonResponseRate(Number(event.currentTarget.response.value));
        setConfidenceLevel(Number(event.currentTarget.confidence.value));
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

        const url = `${config.api}/systematic-random/`;

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


    const alertIfInvalid=()=>{
        const marginElement = (document.getElementById("margin") as HTMLInputElement)
        const responseElement = (document.getElementById("response") as HTMLInputElement)
        const householdsElement = (document.getElementById("households") as HTMLInputElement)
        const individualsElement = (document.getElementById("individuals") as HTMLInputElement)

        if(marginElement?.value && Number(marginElement?.value)<1){
            setAlertMessage("Margin of error should be at least 1.")
        }else if (marginElement?.value && Number(marginElement?.value)>maximumMarginOfError){
            setAlertMessage("Margin of error should be at most 20.")

        }else if (responseElement?.value && Number(responseElement?.value)<0){
            setAlertMessage("Non-response rate should be at least 0.")
        }else if (responseElement?.value && Number(responseElement?.value) > maxNonResponseRate){
            setAlertMessage("Non-response rate should be at most "+ maxNonResponseRate +".")
            
        }else if (householdsElement?.value && Number(householdsElement?.value)<=0){
            setAlertMessage("Number of households should be at least 1.")
        }else if (individualsElement?.value && Number(individualsElement?.value)<=0){
            setAlertMessage("Number of individuals should be at least 1.")
        }else{
            setShowAlert(false);
            return;
        }
        setShowAlert(true);
    }

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
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputFields}>
                            <div className={styles.field}>
                                <label htmlFor="margin">
                                    <Terminology term="margin of error" text="Margin of error (%)" />
                                </label>
                                <input
                                    min="1"
                                    max={maximumMarginOfError.toString()}
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
                                    max={maxNonResponseRate.toString()}
                                    step="1"
                                    type="number"
                                    id="response"
                                    name="response"
                                    onWheel={event => event.currentTarget.blur()}
                                    onBlur={alertIfInvalid}
                                />
                            </div>
                            {!subgroups && (
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

                            <input 
                                type="submit" 
                                className={styles.btn} 
                                value="Submit" 
                                data-cy='submitCalculator-btn'/>
                        </div>
                    </form>
                </Card>
            )}
            {intervals && (
                <div className={styles.result}>
                    <Card hasArrow={false}>
                    {subgroups ? (
                            <div className={styles.content}>
                                {Object.keys(intervals).map((key: string) => (
                                    <div key={key} data-cy={"sampleSize"}>
                                        <h2 className={styles.title}>Sampling interval for <b>{key}</b> is</h2>
                                        <h3 className={styles.number}>{intervals[key]}</h3>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div data-cy={"sampleSize"}>
                                <h1 className={styles.title}>Sampling Interval</h1>
                                <h2 className={styles.number}>{Object.values(intervals)[0]}</h2>
                            </div>
                        )}
                        <p className={styles.description}>{t('definitionsSystematicResult1')}</p>
                        <p className={styles.description}>{t('definitionsSystematicResult2')}</p>
                        <p className={_cs(styles.description, styles.info)}>
                            <span>{t('result1')}</span>
                            <span><a href="/Resources" target="_blank">{t('result2')}</a></span>
                            <span>{t('result3')}</span>
                        </p>
                    </Card>
                    <div className={styles.exportBtn}>
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
                                aboutGoal : t('definitionsSystematicResult1')+"\n\n"
                                            + t('definitionsSystematicResult2'),
                            }}
                            subgroupSizes={subgroups}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default withTranslation()(SystematicRandomCalculator);