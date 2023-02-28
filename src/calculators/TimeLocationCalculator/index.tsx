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

interface TimeLocationResponse {
    sampleSize: number | null;
}

const TimeLocationCalculator: React.FC<TimeLocationProps> = ({
    t,
    questionCards,
}) => {
    const [simpleRandomResponse, setSimpleRandomResponse] = useState<SimpleRandomResponse | null>(null);
    const [simpleRandomSampleSize, setSimpleRandomSampleSize] = useState<number | null>(null);
    const [locations, setLocations] = useState<number | null>(null);
    const [days, setDays] = useState<number | null>(null);
    const [interviews, setInterviews] = useState<number | null>(null);
    const [timeLocationResponse, setTimeLocationResponse] = useState<TimeLocationResponse | null>(null);

    const onSimpleRandomCalculation = useCallback((simpleRandomResponse: SimpleRandomResponse) => {
        setSimpleRandomResponse(simpleRandomResponse);
        console.log(simpleRandomResponse)
        setSimpleRandomSampleSize(simpleRandomResponse.sampleSize);
    }, []);

    const handleParameterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLocations(parseInt((e.target as HTMLFormElement).locations.value));
        setDays(parseInt((e.target as HTMLFormElement).days.value));
        setInterviews(parseInt((e.target as HTMLFormElement).interviews.value));
        calculateTimeLocation();
    }

    const calculateTimeLocation = () => {
        // call API
        const data = {
            sample_size: simpleRandomSampleSize,
            locations: locations,
            days: days,
            interviews_per_session: interviews,
        }

        setTimeLocationResponse({
            sampleSize: 200,
        });
    }

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
                        <h2> Sample Size: {timeLocationResponse.sampleSize} </h2>
                        <p>
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