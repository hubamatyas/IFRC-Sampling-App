import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { WithTranslation, withTranslation } from "react-i18next";
import Card from "../../components/Card";
import ExportButton from "../../components/ExportButton";
import Terminology from "../../components/Terminology";
import SimpleRandom from "../../components/SimpleRandom";
import SubgroupInput from "../../components/SubgroupInput";
import Input from "../../components/Input";

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
    
    // use useEffect to render communities when numOfCommunities changes
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

    const createInputField = (i: number): React.ReactNode => {
        return (
            <div className={styles.field}>
                <label htmlFor="name"></label>
                <input
                    required
                    type="text"
                    className={styles.textInput}
                    placeholder="Community name..."
                    id={`${i}`}
                    name="name"
                />
                <label htmlFor={"size" + i}></label>
                <input
                    type="number"
                    id={`${i}`}
                    name="size"
                    required
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
                                required
                                type="number"
                                id="communities"
                                name="communities"
                                min={1}
                                max={20}
                                step={1}
                                onChange={(e) => setNumOfCommunities(parseInt(e.target.value))}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="margin">Margin or error (%)</label>
                            <input
                                required
                                type="number"
                                id="margin"
                                name="margin"
                                min={0}
                                max={100}
                                step={1}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="confidence"> Confidence level (%)</label>
                            <select
                                id="confidence"
                                name="confidence"
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
                        <input type="submit" className={styles.btn}/>
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