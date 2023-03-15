import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { WithTranslation, withTranslation } from "react-i18next";
import Card from "../../components/Card";
import ExportButton from "../../components/ExportButton";
import Terminology from "../../components/Terminology";
import SimpleRandom from "../../components/SimpleRandom";
import SubgroupInput from "../../components/SubgroupInput";
import {calculatorInputs, calculatorOutputs, subgroupsType, sampleSizeType} from "../../types/calculatorResponse";
import config from "../../util/config";
import axios from "axios";

interface TimeLocationProps extends WithTranslation {
    questionCards: number[];
}

interface SimpleRandomResponse {
    sampleSize: {} | null;
    marginOfError: number | null;
    confidenceLevel: number | null;
    nonResponseRate: number | null;
    households: number | null;
    individuals: number | null;
    //subgroups: any[] | null;
}

interface TimeLocationResponse {
    locations: { [key: string]: {
        days: { [key: string]: [string]} };
    } };

const TimeLocationCalculator: React.FC<TimeLocationProps> = ({
    t,
    questionCards,
}) => {
    const [simpleRandomResponse, setSimpleRandomResponse] = useState<SimpleRandomResponse | null>(null);
    const [simpleRandomSampleSize, setSimpleRandomSampleSize] = useState<{} | null>(null);
    const [locations, setLocations] = useState<number | null>(null);
    const [days, setDays] = useState<number | null>(null);
    const [interviews, setInterviews] = useState<number | null>(null);
    const [timeLocationResponse, setTimeLocationResponse] = useState<[TimeLocationResponse] | null>(null);

    const [calculatorInputs, setCalculatorInputs] = useState<calculatorInputs>(null);
    const [calculatorOutputs, setCalculatorOutputs] = useState<calculatorOutputs>(null);

    // const onSimpleRandomCalculation = useCallback((simpleRandomResponse: SimpleRandomResponse) => {
    //     setSimpleRandomResponse(simpleRandomResponse);
    //     console.log(simpleRandomResponse)
    //     setSimpleRandomSampleSize(simpleRandomResponse.sampleSize);
    // }, []);

    useEffect(() => {
        if (timeLocationResponse) {
            console.log('asdfasdfasdfasdf')
            for (let i = 0; i < timeLocationResponse.length; i++) {
                console.log(timeLocationResponse[i]); // dict for a location
                const locations = timeLocationResponse[i];
                const locationKey = Object.keys(locations)[0]; // name of a location
                console.log(locationKey)
                const locationValue = Object.values(locations)[0];
                for (let j = 0; j < locationValue.length; j++) {
                    const dayKey = Object.keys(locationValue[j])[0];
                    console.log(dayKey)
                    const dayValue = Object.values(locationValue[j])[0] as [string];
                    for (let k = 0; k < dayValue.length; k++) {
                        console.log(dayValue[k])
                    }
                }
            }
        }
    }, [timeLocationResponse]);

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
        // setCalculatorOutputs({timeLocationResponse:timeLocationResponse, aboutGoal:t('aboutGoal')});
        setSimpleRandomSampleSize(sampleSize);
    }, []);

    const handleParameterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(parseInt((e.target as HTMLFormElement).locations.value))
        setLocations(parseInt((e.target as HTMLFormElement).locations.value));
        setDays(parseInt((e.target as HTMLFormElement).days.value));
        setInterviews(parseInt((e.target as HTMLFormElement).interviews.value));
    }

    const calculateTimeLocation = async () => {
        // call API
        const data = {
            margin_of_error: calculatorInputs ? calculatorInputs['Margin of error'] : null,
            confidence_level: calculatorInputs ? calculatorInputs['Confidence level(%)'] : null,
            non_response_rate: calculatorInputs ? calculatorInputs['Non-response rate(%)'] : null,
            households: calculatorInputs ? calculatorInputs['Households'] : null,
            individuals: calculatorInputs ? calculatorInputs['Individuals'] : null,
            locations: locations,
            days: days,
            interviews_per_session: interviews,
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
            setCalculatorOutputs({timeLocationResponse:response.data.units, aboutGoal:t('aboutGoal')});
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
                                required
                                type="number"
                                className={styles.textInput}
                                placeholder="Number of locations you will be visting"
                                id="locations"
                                name="locations"
                                onWheel={event => event.currentTarget.blur()}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="days">Working days</label>
                            <input
                                required
                                type="number"
                                className={styles.textInput}
                                placeholder="Number of working days you will be interviewing"
                                id="days"
                                name="days"
                                onWheel={event => event.currentTarget.blur()}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="interviews">Interviews in one session</label>
                            <input
                                required
                                type="number"
                                className={styles.textInput}
                                placeholder="Number of interviews in one session"
                                id="interviews"
                                name="interviews"
                                onWheel={event => event.currentTarget.blur()}
                            />
                        </div>
                        <div className={styles.calculate}>
                            <input type="submit" className={styles.btn}/>
                        </div>
                    </form>
                </Card>
            )}
            {timeLocationResponse && (
                <div className={styles.result}>
                    <Card hasArrow={false}>
                        <h2> Sample Size: </h2>
                        <div>
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
                        calculatorInputs={calculatorInputs}
                        subgroupSizes={null}
                    />
                </div>
            )}
        </>
    )
}

export default withTranslation()(TimeLocationCalculator);