import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

let nextId = 0;

const SubgroupInput = ({ onSubmitSubgroups }) => {
    const [inputFields, setInputFields] = useState([]);

    useEffect(() => {
        setInputFields([...inputFields, { id: nextId++, input: createInputField() }])
    }, []);

    const handleSubgroupSubmit = (event) => {
        event.preventDefault();
        const subgroups = [];
        for (let i = 0; i < event.target.length; i++) {
            if (event.target[i].id) {
                const subgroup = {
                    name: event.target[i].value,
                    size: event.target[++i].value
                };
                subgroups.push(subgroup);
            }
        }
        onSubmitSubgroups(subgroups);
    };

    const createInputField = () => {
        return (
            <div className={styles.field}>
                <label htmlFor="name"></label>
                <input
                    required
                    type="text"
                    className={styles.textInput}
                    placeholder={"Group " + (nextId-1)}
                    id="name"
                    name="name"
                />
                <label htmlFor="size"></label>
                <input
                    type="number"
                    required
                    id="size"
                    name="size"
                />
            </div>
        );
    };
    
    const handleAddSubroup = () => {
        if (inputFields.length < 10) {
            setInputFields([
                ...inputFields,
                { id: nextId++, input: createInputField() }
            ]);
        }
    };

    const handleRemoveSubgroup = (id) => {
        setInputFields(
            inputFields.filter((inputFields) => inputFields.id !== id)
        );
    };

    return (
        <form onSubmit={handleSubgroupSubmit}>
            {inputFields.map(field => (
                <div key={field.id} className={styles.subgroup}>
                    {field.input}
                    <button
                        className={styles.newRow}
                        onClick={handleAddSubroup}
                    >
                        <AiOutlinePlus />
                    </button>
                    {field.id != 1 &&
                    <button
                        className={styles.newRow}
                        onClick={() => handleRemoveSubgroup(field.id)}
                    >
                        <AiOutlineMinus />
                    </button>                                
                    }
                </div>
            ))}
            <div className={styles.calculate}>
                <input type="submit" className={styles.btn} />
            </div>
        </form>
    );
};

export default SubgroupInput;