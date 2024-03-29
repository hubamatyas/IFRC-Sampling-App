import React, { useCallback, useEffect, useState } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
//import Alert from "react-bootstrap/Alert";
import { _cs } from "@togglecorp/fujs";
import Alert from "../../components/Alert";
import axios from "axios";

import styles from "./styles.module.scss";

import config from "../../util/config";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Terminology from "../../components/Terminology";
import ExportButton from "../../components/ExportButton";
import SimpleRandom from "../../components/SimpleRandom";
import {ClusterResponse} from "../../types/calculatorResponse";

/**
@fileoverview This module provides a Cluster Sampling Calculator that calculates
the clusters for each geographical unit with a given margin of error and confidence
level. It exports a React functional component that renders a form with input fields
for the user to enter the required parameters. Upon submission, it uses the axios 
library to make a POST request to an API to calculate the clusters.
@module ClusterRandomCalculator
*/

interface Community {
    name: string;
    size: number;
}

interface ClusterProps extends WithTranslation {
    questionCards: number[];
}

// interface ClusterResponse {
//     [key: string]: number[];
// }

const TimeLocationCalculator: React.FC<ClusterProps> = ({
    t,
    questionCards,
}) => {
    const [marginOfError, setMarginOfError] = useState<number>(0);
    const [communities, setCommunities] = useState<Community[]>([]);
    const [confidenceLevel, setConfidenceLevel] = useState<number>(0);
    const [inputFields, setInputFields] = useState<any[] | null>(null);
    const [numOfcommunities, setNumOfCommunities] = useState<number>(0);
    const [clusterResponse, setClusterResponse] = useState<ClusterResponse | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const minimumComunitySize = 1000;
    const maximumComunitiesNum = 20;
    const maximumMarginOfError = 20;

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
        if (communities && marginOfError && confidenceLevel) {
            calculateCluster();
            console.log(communities, marginOfError, confidenceLevel)
        }
    }, [communities, marginOfError, confidenceLevel]);

    const createInputField = (i: number): React.ReactNode => {
        i++;
        return (
            <div className={styles.field}>
                <label htmlFor="name"></label>
                <input
                    required
                    id={"name"+`${i}`}
                    name="name"
                    type="text"
                    className={styles.textInput}
                    placeholder={`Community name...`}
                    onWheel={event => event.currentTarget.blur()}
                />
                <label htmlFor={"size" + i}></label>
                <input
                    min={minimumComunitySize.toString()}
                    step="1"
                    required
                    id={`${i}`}
                    name="size"
                    type="number"
                    placeholder="0"
                    onWheel={event => event.currentTarget.blur()}   
                    onBlur={alertIfCommunityInvalid}                 
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

    const calculateCluster = async () => {
        console.log(marginOfError, confidenceLevel, communities)
        const data = {
            communities: communities,
            margin_of_error: marginOfError,
            confidence_level: confidenceLevel
        }

        const url = `${config.api}/cluster-random/`;

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

            const clusterResponse = await response.data.clusters;
            setClusterResponse(clusterResponse);
        } catch (error) {
            console.log(error);
            window.alert(error);
        }
    }

    const alertIfCommunityInvalid = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        console.log(id, value)
        if (value && Number(value) < minimumComunitySize){
            const nameElement = document.getElementById("name"+`${id}`) as HTMLInputElement
            setAlertMessage("Size of community '"
                            + (nameElement?.value || "unnamed")
                            + "' must be at least "
                            + minimumComunitySize 
                            +"."
                            )
            setShowAlert(true);
            return;
        }
        setShowAlert(false);   
        alertIfParametersInvalid();
    }

    const alertIfParametersInvalid = () => {
        const communitiesElement = (document.getElementById("communities") as HTMLInputElement)
        const marginElement = (document.getElementById("margin") as HTMLInputElement)
        
        if(communitiesElement?.value && Number(communitiesElement?.value) < 1){
            setAlertMessage("Number of communities should be at least 1.")
        }else if(communitiesElement?.value && Number(communitiesElement?.value) > maximumComunitiesNum){
            setAlertMessage("Number of communities should be at most "+ maximumComunitiesNum +".")
        }else if (marginElement?.value && Number(marginElement?.value) < 1){
            setAlertMessage("Margin of error should be at least 1.")
        }else if (marginElement?.value && Number(marginElement?.value)>maximumMarginOfError){
            setAlertMessage("Margin of error should be at most 20.")
        }else{
            setShowAlert(false);
            return;
        }
        setShowAlert(true);
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
                                max={maximumComunitiesNum.toString()}
                                step="1"
                                required
                                type="number"
                                id="communities"
                                name="communities"
                                onWheel={event => event.currentTarget.blur()}
                                onChange={(e) => setNumOfCommunities(Math.min(parseInt(e.target.value),20))}
                                onBlur={alertIfParametersInvalid}
                            />
                        </div>
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
                                onBlur={alertIfParametersInvalid}
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
                            data-cy="submitCalculator-btn"
                        />
                    </div>
                </form>
            </Card>
            {clusterResponse && (
                <div className={styles.result} >
                    <Card hasArrow={false}>
                        <h2> Cluster Sampling Result </h2>
                        <div data-cy={"sampleSize"}>
                            {
                                Object.keys(clusterResponse).map((key) => {
                                    return (
                                        <div key={key} className={styles.unit}>
                                            <h3 className={styles.name}> {key} </h3>
                                            <h3 className={styles.clusters}> {clusterResponse[key].join(", ")} </h3>
                                        </div>
                                    )
                                })
                            }
                            <p className={styles.description}>{t('definitionsClusterResult1')}</p>
                            <p className={_cs(styles.description, styles.info)}>
                            <span>{t('result1')}</span>
                            <span><a href="/Resources" target="_blank" >{t('result2')}</a></span>
                            <span>{t('result3')}</span>
                        </p>
                        </div>
                    </Card>
                    <div className={styles.exportBtn}>
                        <ExportButton 
                            questionCards={questionCards} 
                            calculatorInputs={{"Number of communities":numOfcommunities, 
                                                "Margin of error(%)":marginOfError, 
                                                "Confidence level(%)":confidenceLevel, 
                                            }}
                            calculatorOutputs={{
                                clusterResponse:clusterResponse, 
                                aboutGoal:t('definitionsClusterResult1'),
                            }}
                            communityInfo={communities}
                            //communitiesSizes={null}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default withTranslation()(TimeLocationCalculator);