import React, { useState, useEffect, FormEvent } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Alert from "../Alert";
import styles from "./styles.module.scss";

import Terminology from "../Terminology";

/**
* A component that renders a form for inputting subgroups and their sizes, and allows the user to add or remove subgroups.
* @component
* @typedef {Object} Subgroup
* @property {string} name - The name of the subgroup.
* @property {number} size - The size of the subgroup.
* @typedef {Object} InputField
* @property {number} id - The id of the input field.
* @property {React.ReactNode} input - The input field component.
* @typedef {Object} Props
* @property {function} onSubmitSubgroups - A function that takes an array of Subgroup objects and a boolean value indicating whether the subgroups are ready to be submitted.
* @param {Props} props - The component props.
* @returns {JSX.Element} - The component UI.
*/

interface Subgroup {
    name: string;
    size: number;
}

interface InputField {
    id: number;
    input: React.ReactNode;
}

interface Props {
    onSubmitSubgroups: (subgroups: Subgroup[] | null, isReady: boolean) => void;
}

const SubgroupInput: React.FC<Props> = ({onSubmitSubgroups }: Props) => {
    const [currentId, setCurrentId] = useState<number>(0);
    const [sum, setSum] = useState<number>(0);
    const [isSumValid, setIsSumValid] = useState<boolean>(false);
    const [populationSize, setPopulationSize] = useState<number>(0);
    const [inputFields, setInputFields] = useState<InputField[]>([]);
    const [inputs, setInputs] = useState<{ [key: string]: number }>({});
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");

    // Add the first input field on mount
    useEffect(() => {
        setInputFields([
            ...inputFields,
            { id: currentId, input: createInputField(0) },
        ]);
    }, []);

    useEffect(() => {
        let sum = 0;
        for (const key in inputs) {
            sum += inputs[key];
        }
        setSum(sum);
        if (sum === populationSize && sum > 0 && populationSize > 0) {
            setIsSumValid(true);
        } else {
            setIsSumValid(false);
        }
    }, [inputs, populationSize]);

    useEffect(() => {
        onSubmitSubgroups(null, false);
    }, [inputFields, inputs, sum, isSumValid, populationSize]);

    const handleSubgroupSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const subgroups = [];
        for (let i = 0; i < e.currentTarget.length; i++) {
            const element = e.currentTarget[i] as HTMLInputElement;
            if (element.name === "name") {
                const community = {
                    name: element.value,
                    size: parseInt((e.currentTarget[++i] as HTMLInputElement).value)
                }
                subgroups.push(community);
            }
        }
        onSubmitSubgroups(subgroups, true);
      };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setInputs((inputs) => {
            return { ...inputs, [id]: parseInt(value) };
        });
    };

    const alertIfNotPositive = (e:React.ChangeEvent<HTMLInputElement>) => {
        const populationElement = (document.getElementById("population") as HTMLInputElement)
        if(populationElement.value && Number(populationElement.value)<=0){
            setAlertMessage("Target population must be larger than zero.")
            setShowAlert(true);
            return;
        }else{
            const { id, value } = e.target;
            if (value && Number(value)<=0){
                const nameElement = document.getElementById("name"+`${id}`) as HTMLInputElement
                setAlertMessage("Size of subgroup '"+ nameElement.value +"' must be larger than zero.")
                setShowAlert(true);
                return;
            }
        }
        setShowAlert(false);
    }


        
    const createInputField = (newId:number): React.ReactNode => {
        return (
            <div className={styles.field}>
                <label htmlFor="name"></label>
                <input
                    required
                    id={"name"+`${newId}`}
                    name="name"
                    type="text"
                    className={styles.textInput}
                    placeholder="Subgroup name..."
                />
                <label htmlFor={"size" + newId}></label>
                <input
                    required
                    min="1"
                    type="number"
                    placeholder="0"
                    id={`${newId}`}
                    name={"size" + newId}
                    onChange={handleInputChange}
                    onWheel={event => event.currentTarget.blur()}
                    onBlur={alertIfNotPositive}
                />
            </div>
        );
    };

    const handleAddSubroup = () => {
        const newId = currentId + 1;
        if (inputFields.length < 10) {
            setCurrentId(newId);
            setInputFields([
                ...inputFields,
                { id: newId, input: createInputField(newId) },
            ]);
            
        }
    };

    const handleRemoveSubgroup = (id: number) => {
        setInputs((inputs) => {
            const { [id]: _, ...rest } = inputs;
            return rest;
        });
        setInputFields(inputFields.filter((field) => field.id !== id));
    };

    return (
        <form onSubmit={handleSubgroupSubmit}>
            <div className={styles.population}>
                <label htmlFor="population">
                    <h3 className={styles.subtitle}>
                        <Terminology term="population" text="Target population" />
                    </h3>
                </label>
                <input
                    min="1"
                    step="1"
                    required
                    type="number"
                    id="population"
                    name="population"
                    onWheel={event => event.currentTarget.blur()}
                    onChange={(event) =>
                        setPopulationSize(parseInt(event.target.value))
                    }
                    onBlur={alertIfNotPositive}
                />
            </div>
            {inputFields.map((field) => (
                <div key={field.id} className={styles.subgroup}>
                    {field.input}
                    <button className={styles.newRow} onClick={handleAddSubroup}>
                        <AiOutlinePlus />
                    </button>
                    {field.id !== 0 && (
                        <button
                            className={styles.newRow}
                            onClick={() => handleRemoveSubgroup(field.id)}
                        >
                            <AiOutlineMinus />
                        </button>
                    )}
                </div>
            ))}

            {showAlert && (
                <Alert
                    onClose={() => setShowAlert(false)}
                    text={alertMessage}
                    type="warning"
                />
                )
            }

            <div className={styles.calculate}>
                <input
                    type="submit"
                    value="Submit"
                    className={styles.btn}
                    disabled={!isSumValid}
                />
            </div>
            {!isSumValid && (
                <div className={styles.alert}>
                    <p className={styles.alertText}>Sum of subgroups must equal to total population.</p>
                </div>
            )}
        </form>
    );
};

export default SubgroupInput;