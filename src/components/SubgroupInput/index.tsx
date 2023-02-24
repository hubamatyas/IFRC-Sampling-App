import React, { useState, useEffect, FormEvent } from "react";
import styles from "./styles.module.scss";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface Subgroup {
    name: string;
    size: number;
}

interface InputField {
    id: number;
    input: React.ReactNode;
}

interface Props {
    onSubmitSubgroups: (subgroups: Subgroup[]) => void;
}

let nextId = 0;

const SubgroupInput: React.FC<Props> = ({ onSubmitSubgroups }: Props) => {
    const [inputFields, setInputFields] = useState<InputField[]>([]);

    useEffect(() => {
        setInputFields([
            ...inputFields,
            { id: nextId++, input: createInputField() },
        ]);
    }, []);

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
        onSubmitSubgroups(subgroups);
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
                <label htmlFor="size"></label>
                <input type="number" required id="size" name="size" />
            </div>
        );
    };

    const handleAddSubroup = () => {
        if (inputFields.length < 10) {
            setInputFields([
                ...inputFields,
                { id: nextId++, input: createInputField() },
            ]);
        }
    };

    const handleRemoveSubgroup = (id: number) => {
        setInputFields(inputFields.filter((field) => field.id !== id));
    };

    return (
        <form onSubmit={handleSubgroupSubmit}>
            {inputFields.map((field) => (
                <div key={field.id} className={styles.subgroup}>
                    {field.input}
                    <button className={styles.newRow} onClick={handleAddSubroup}>
                        <AiOutlinePlus />
                    </button>
                    {field.id !== 1 && (
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
                <input type="submit" className={styles.btn} />
            </div>
        </form>
    );
};

export default SubgroupInput;