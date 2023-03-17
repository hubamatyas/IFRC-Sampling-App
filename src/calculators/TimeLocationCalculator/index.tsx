import React, { useCallback, useEffect, useState } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import axios from "axios";

import styles from "./styles.module.scss";

import config from "../../util/config";
import Card from "../../components/Card";
import Terminology from "../../components/Terminology";
import ExportButton from "../../components/ExportButton";
import SimpleRandom from "../../components/SimpleRandom";
import {calculatorInputs, calculatorOutputs, subgroupsType, sampleSizeType} from "../../types/calculatorResponse";

/**
@fileoverview The module exports a React component that provides a time-location calculator. 
It allows users to specify parameters for the number of locations, working days, and 
interviews per session. The component also incorporates a simple random sample size calculator, 
which calculates the necessary sample size given parameters for individuals, margin of error, 
confidence level, and non-response rate. Upon submission, it uses the axios library to make a
POST request to an API to calculate the time-location units.
@module TimeLocationCalculator
*/

interface TimeLocationProps extends WithTranslation {
    questionCards: number[];
}

interface TimeLocationResponse {
    locations: { [key: string]: {
        days: { [key: string]: [string]} };
    } };

const TimeLocationCalculator: React.FC<TimeLocationProps> = ({t}) => {
    const [days, setDays] = useState<number | null>(null);
    const [locations, setLocations] = useState<number | null>(null);
    const [interviews, setInterviews] = useState<number | null>(null);
    const [calculatorInputs, setCalculatorInputs] = useState<calculatorInputs>(null);
    const [calculatorOutputs, setCalculatorOutputs] = useState<calculatorOutputs>(null);
    const [simpleRandomSampleSize, setSimpleRandomSampleSize] = useState<number | null>(null);
    const [timeLocationResponse, setTimeLocationResponse] = useState<[TimeLocationResponse] | null>(null);

    useEffect(() => {
        if (calculatorInputs && simpleRandomSampleSize && locations && days && interviews) {
            calculateTimeLocation();
        }
    }, [calculatorInputs, simpleRandomSampleSize, locations, days, interviews]);

    const onSimpleRandomCalculation = useCallback((
        calculatorInputs: calculatorInputs, 
        sampleSize: Record<string, number> | null
    ) => {
        setCalculatorInputs(calculatorInputs);
        setSimpleRandomSampleSize(sampleSize ? sampleSize['total'] : null);
        setCalculatorOutputs({sampleSize:sampleSize, aboutGoal:t('aboutGoal')});
    }, []);

    const handleParameterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDays(parseInt((e.target as HTMLFormElement).days.value));
        setLocations(parseInt((e.target as HTMLFormElement).locations.value));
        setInterviews(parseInt((e.target as HTMLFormElement).interviews.value));
    }

    const calculateTimeLocation = async () => {
        const data = {
            days: days,
            locations: locations,
            interviews_per_session: interviews,
            households: calculatorInputs ? calculatorInputs['Households'] : null,
            individuals: calculatorInputs ? calculatorInputs['Individuals'] : null,
            margin_of_error: calculatorInputs ? calculatorInputs['Margin of error'] : null,
            confidence_level: calculatorInputs ? calculatorInputs['Confidence level'] : null,
            non_response_rate: calculatorInputs ? calculatorInputs['Non-response rate'] : null,
        }

        // const url = `${config.api}/time-location/`;
        const url = `http://127.0.0.1:8000/api/time-location/`;

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
            setTimeLocationResponse(response.data.units);
        } catch (error) {
            console.log(error);
            window.alert(error);
        }
    }

    return (
        <>
            <SimpleRandom
                subgroups={null}
                hasSubgroups={false}
                hasHouseholds={false}
                hasIndividuals={true}
                onSubmitSimpleRandom={onSimpleRandomCalculation}
            />
            { simpleRandomSampleSize && (
                <Card>
                    <h2>
                        <Terminology term="time-location" text="Time-Location Parameters" />
                    </h2>
                    <form onSubmit={handleParameterSubmit}>
                        <div className={styles.field}>
                            <label htmlFor="locations">Locations</label>        
                            <input
                                min="2"
                                max="15"
                                step="1"
                                required
                                type="number"
                                id="locations"
                                name="locations"
                                className={styles.textInput}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="days">Working days</label>
                            <input
                                min="3"
                                max="20"
                                step="1"
                                id="days"
                                required
                                name="days"
                                type="number"
                                className={styles.textInput}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="interviews">Interviews in one session</label>
                            <input
                                min="10"
                                step="1"
                                required
                                type="number"
                                id="interviews"
                                name="interviews"
                                className={styles.textInput}
                                max={simpleRandomSampleSize}
                            />
                        </div>
                        <div className={styles.calculate}>
                            <input type="submit" className={styles.btn} value="Submit"/>
                        </div>
                    </form>
                </Card>
            )}
            {timeLocationResponse && (
                <div className={styles.result}>
                    <Card hasArrow={false}>
                        <h2>Time Location Calculator</h2>
                        <p className={styles.description}>
                            {t('aboutGoal')}
                            {t('aboutGoal')}
                            {t('aboutGoal')}
                            {t('aboutGoal')}
                            {t('aboutGoal')}
                        </p>
                    </Card>
                    {/* <ExportButton questionCards={questionCards} calculatorState={
                        simpleRandomResponse
                        // pass state of time location calculator
                    } /> */}
                </div>
            )}
        </>
    )
}

export default withTranslation()(TimeLocationCalculator);