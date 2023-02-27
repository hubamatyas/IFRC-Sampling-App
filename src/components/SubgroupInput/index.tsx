import React, { useState, useEffect, FormEvent } from "react";
import styles from "./styles.module.scss";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Terminology from "../Terminology";

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
    //isSubgroupsReady: (isReady: boolean) => void;
}

let currentId = 0;

const SubgroupInput: React.FC<Props> = ({onSubmitSubgroups }: Props) => {
    const [inputFields, setInputFields] = useState<InputField[]>([]);
    const [inputs, setInputs] = useState<{ [key: string]: number }>({});
    const [sum, setSum] = useState<number>(0);
    const [isSumValid, setIsSumValid] = useState<boolean>(false);
    const [populationSize, setPopulationSize] = useState<number>(0);

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

    // create useEffect hook to detect any changes to the component's state
    useEffect(() => {
        onSubmitSubgroups(null, false);
    }, [inputFields, inputs, sum, isSumValid, populationSize]);

    const handleSubgroupSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const subgroups = [];
        for (let i = 0; i < event.currentTarget.length; i++) {
          if (event.currentTarget[i].id) {
            const subgroup = {
              name: (event.currentTarget[i] as HTMLInputElement).value,
              size: parseInt(
                (event.currentTarget[++i] as HTMLInputElement).value
              )
            };
            subgroups.push(subgroup);
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
                    type="text"
                    className={styles.textInput}
                    placeholder="Subgroup name..."
                    id="name"
                    name="name"
                />
                <label htmlFor={"size" + currentId}></label>
                <input
                    type="number"
                    id={`${currentId}`}
                    name={"size" + currentId}
                    onChange={handleInputChange}
                    required
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
                        <Terminology term="population" text="Total population" />
                    </h3>
                </label>
                <input
                    type="number"
                    required
                    id="population"
                    name="population"
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
                    {/* Prevent first input box from being removed */}
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
                <input type="submit" className={styles.btn} disabled={!isSumValid}/>
            </div>
        </form>
    );
};

export default SubgroupInput;