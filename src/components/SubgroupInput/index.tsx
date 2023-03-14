import React, { useState, useEffect, FormEvent } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

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

let currentId = 0;

const SubgroupInput: React.FC<Props> = ({onSubmitSubgroups }: Props) => {
    const [sum, setSum] = useState<number>(0);
    const [isSumValid, setIsSumValid] = useState<boolean>(false);
    const [populationSize, setPopulationSize] = useState<number>(0);
    const [inputFields, setInputFields] = useState<InputField[]>([]);
    const [inputs, setInputs] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        setInputFields([
            ...inputFields,
            { id: currentId, input: createInputField() },
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

    const createInputField = (): React.ReactNode => {
        return (
            <div className={styles.field}>
                <label htmlFor="name"></label>
                <input
                    required
                    id="name"
                    name="name"
                    type="text"
                    className={styles.textInput}
                    placeholder="Subgroup name..."
                />
                <label htmlFor={"size" + currentId}></label>
                <input
                    required
                    type="number"
                    placeholder="0"
                    id={`${currentId}`}
                    name={"size" + currentId}
                    onChange={handleInputChange}
                    onWheel={event => event.currentTarget.blur()}
                />
            </div>
        );
    };

    const handleAddSubroup = () => {
        if (inputFields.length < 10) {
            setInputFields([
                ...inputFields,
                { id: ++currentId, input: createInputField() },
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
                    required
                    type="number"
                    id="population"
                    name="population"
                    onWheel={event => event.currentTarget.blur()}
                    onChange={(event) =>
                        setPopulationSize(parseInt(event.target.value))
                    }
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