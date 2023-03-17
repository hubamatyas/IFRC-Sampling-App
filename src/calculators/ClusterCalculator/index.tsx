import React, { useCallback, useEffect, useState } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import Alert from "react-bootstrap/Alert";

import styles from "./styles.module.scss";

import Card from "../../components/Card";
import Input from "../../components/Input";
import Terminology from "../../components/Terminology";
import ExportButton from "../../components/ExportButton";
import SimpleRandom from "../../components/SimpleRandom";

interface Community {
    name: string;
    size: number;
}

interface ClusterProps extends WithTranslation {
    questionCards: number[];
}

interface ClusterResponse {
    sampleSize: number | null;
}

const TimeLocationCalculator: React.FC<ClusterProps> = ({
    t,
    questionCards,
}) => {
    const [clusterResponse, setClusterResponse] = useState<ClusterResponse | null>(null);
    const [inputFields, setInputFields] = useState<any[] | null>(null);
    const [numOfcommunities, setNumOfCommunities] = useState<number>(0);
    const [marginOfError, setMarginOfError] = useState<number>(0);
    const [confidenceLevel, setConfidenceLevel] = useState<number>(0);
    const [communities, setCommunities] = useState<Community[]>([]);
    
    useEffect(() => {
        if (numOfcommunities > 0) {
            const inputs = [];
            for (let i = 0; i < numOfcommunities; i++) {
                inputs.push(createInputField(i));
            }
            setInputFields(inputs);
        }
    }, [numOfcommunities]);

    useEffect(() => {
        if (communities.length > 0) {
            calculateCluster();
            console.log(communities, marginOfError, confidenceLevel)

        }
    }, [communities, marginOfError, confidenceLevel]);

    const showAlert = (message: string) => {
        return (
            <Alert key='danger' variant='danger'>
                {message}
            </Alert>
        );
    };

    const createInputField = (i: number): React.ReactNode => {
        i++;
        return (
            <div className={styles.field}>
                <label htmlFor="name"></label>
                <input
                    required
                    id={`${i}`}
                    name="name"
                    type="text"
                    className={styles.textInput}
                    value={`Community ${i}`}
                    onWheel={event => event.currentTarget.blur()}
                />
                <label htmlFor={"size" + i}></label>
                <input
                    min="1000"
                    step="1"
                    required
                    id={`${i}`}
                    name="size"
                    type="number"
                    placeholder="0"
                    onWheel={event => event.currentTarget.blur()}                    
                />
            </div>
        );
    };

    const handleClusterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMarginOfError(e.currentTarget.margin.value);
        setConfidenceLevel(e.currentTarget.confidence.value);
        getCommunities(e);
    }

    const getCommunities = (e: React.FormEvent<HTMLFormElement>) => {
        const communities = [];
        for (let i = 0; i < e.currentTarget.length; i++) {
            const element = e.currentTarget[i] as HTMLInputElement;
            if (element.name === "name") {
                const community = {
                    name: element.value,
                    size: parseInt((e.currentTarget[++i] as HTMLInputElement).value)
                }
                communities.push(community);
            }
        }
        setCommunities(communities);
    }

    const calculateCluster = () => {
        // call API
        const data = {
            communities: communities,
            margin_of_error: marginOfError,
            confidence_level: confidenceLevel
        }

        setClusterResponse({
            sampleSize: 300,
        });
    }

    return (
        <>
            <Card>
                <h2>
                    <Terminology term="cluster" text="Cluster Sampling" />
                </h2>
                <form onSubmit={handleClusterSubmit}>
                    <div className={styles.parameters}>
                        <div className={styles.field}>
                            <label htmlFor="communities">Number of communities</label>        
                            <input
                                min="1"
                                max="20"
                                step="1"
                                required
                                type="number"
                                id="communities"
                                name="communities"
                                onWheel={event => event.currentTarget.blur()}
                                onChange={(e) => setNumOfCommunities(parseInt(e.target.value))}
                            />
                        </div>
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
                    </div>
                    {inputFields && 
                        <div className={styles.inputFields}>
                            {inputFields.map((field) => field)}
                        </div>
                    }
                    <div className={styles.calculate}>
                        <input type="submit" className={styles.btn} value="Submit"/>
                    </div>
                </form>
            </Card>
            {clusterResponse && (
                <div className={styles.result}>
                    <Card hasArrow={false}>
                        <h2> Sample Size: {clusterResponse.sampleSize} </h2>
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