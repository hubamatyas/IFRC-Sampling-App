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
import Alert from "../../components/Alert";

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

const TimeLocationCalculator: React.FC<TimeLocationProps> = ({t,questionCards}) => {
    const [days, setDays] = useState<number | null>(null);
    const [locations, setLocations] = useState<number | null>(null);
    const [interviews, setInterviews] = useState<number | null>(null);
    const [calculatorInputs, setCalculatorInputs] = useState<calculatorInputs>(null);
    const [calculatorOutputs, setCalculatorOutputs] = useState<calculatorOutputs>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");

    const [simpleRandomSampleSize, setSimpleRandomSampleSize] = useState<number | null>(null);
    const [timeLocationResponse, setTimeLocationResponse] = useState<[TimeLocationResponse] | null>(null);
    const minInterviews = 10;
    const minDays = 3;
    const minLocations = 2;
    const maxLocations = 15;
    const maxDays = 20;

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
            confidence_level: calculatorInputs ? calculatorInputs['Confidence level(%)'] : null,
            non_response_rate: calculatorInputs ? calculatorInputs['Non-response rate(%)'] : null,
        }

        const url = `${config.api}/time-location/`;

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
            setCalculatorOutputs({timeLocationResponse:response.data.units, aboutGoal:t('aboutGoal')});
        } catch (error) {
            console.log(error);
            window.alert(error);
        }
    }

    const alertIfNotValid = () => {
        const locationsElement = (document.getElementById("locations") as HTMLInputElement)
        const daysElement = (document.getElementById("days") as HTMLInputElement)
        const interviewsElement = (document.getElementById("interviews") as HTMLInputElement)

        if(locationsElement.value && Number(locationsElement.value) < minLocations){
            setAlertMessage("Number of locations should be at least 2.")
        }else if (locationsElement.value && Number(locationsElement.value) > maxLocations){
            setAlertMessage("Number of working days should be at most "+ maxLocations +".")
        }else if (daysElement.value && Number(daysElement.value) < minDays){
            setAlertMessage("Number of working days should be at least "+ minDays +".")
        }else if (daysElement.value && Number(daysElement.value) > maxDays){
            setAlertMessage("Number of working days should be at most "+ maxDays +".")
        }else if (interviewsElement.value && Number(interviewsElement.value) < minInterviews){
            setAlertMessage("Number of interviews should be at least "+ minInterviews +".")
        }else{
            setShowAlert(false);
            return;
        }
        setShowAlert(true);
    }

    return (
        <>
            <SimpleRandom
                subgroups={null}
                hasSubgroups={false}
                hasHouseholds={false}
                hasIndividuals={true}
                isForTimeLocation={true}
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
                                min={minLocations+''}
                                max={maxLocations+''}
                                step="1"
                                required
                                type="number"
                                id="locations"
                                name="locations"
                                onWheel={event => event.currentTarget.blur()}
                                className={styles.textInput}
                                onBlur={alertIfNotValid}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="days">Working days</label>
                            <input
                                min={minDays+''}
                                max={maxDays+''}
                                step="1"
                                id="days"
                                required
                                name="days"
                                type="number"
                                className={styles.textInput}
                                onWheel={event => event.currentTarget.blur()}
                                onBlur={alertIfNotValid}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="interviews">Interviews in one session</label>
                            <input
                                min={minInterviews+''}
                                step="1"
                                required
                                type="number"
                                id="interviews"
                                name="interviews"
                                onWheel={event => event.currentTarget.blur()}
                                className={styles.textInput}
                                max={simpleRandomSampleSize}
                                onBlur={alertIfNotValid}
                            />
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
                                data-cy='submitTimeLocation-btn'
                            />
                        </div>
                    </form>
                </Card>
            )}
            {timeLocationResponse && (
                <div className={styles.result}>
                    <Card hasArrow={false}>
                        <h2>Time Location Calculator</h2>
                        <div data-cy={"sampleSize"}>
                            <table>

                            {timeLocationResponse!.sort(
                                (a, b)=>( 
                                Number(Object.keys(a)[0].slice(8)) - Number(Object.keys(b)[0].slice(8))
                                )
                            ).map((locations,index) => (
                                <tr className={styles.unit}> 
                                    <th className={styles.locationUnit}> 
                                        {Object.keys(locations)[0]}
                                    </th>

                                    <th className={styles.timeUnit}> 
                                        {Object.values(locations)[0].sort(
                                            // @ts-ignore
                                            (a, b)=>( 
                                            Number(Object.keys(a)[0].slice(3)) - Number(Object.keys(b)[0].slice(3))
                                            )
                                            // @ts-ignore
                                            ).map((days,index) => (
                                            <div>
                                                {Object.keys(days)[0].slice(0,3)}
                                                <b className={styles.redFigure}>
                                                    {Object.keys(days)[0].slice(3)}
                                                </b>
                                                { ": " +
                                                // @ts-ignore
                                                Object.values(days)[0].join()}
                                                <br>
                                                </br>
                                            </div>
                                            ))
                                        }
                                    </th> 
                                </tr> 
                                ))}
                                

                            </table>
                        </div>
                        <p className={styles.description}>
                            {t('aboutGoal')}
                            {t('aboutGoal')}
                            {t('aboutGoal')}
                            {t('aboutGoal')}
                            {t('aboutGoal')}
                        </p>
                    </Card>
                    <ExportButton
                        
                        questionCards={questionCards}
                        calculatorOutputs={calculatorOutputs}
                        calculatorInputs={Object.assign({}, calculatorInputs, 
                            {
                                "Number of locations": locations,
                                "Number of working days": days,
                                "Number of interviews in one session": interviews
                            }
                        )}
                        subgroupSizes={null}
                    />
                </div>
            )}
        </>
    )
}

export default withTranslation()(TimeLocationCalculator);