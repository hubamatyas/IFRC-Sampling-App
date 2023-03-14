import React, { useState, useEffect } from 'react';
import { _cs } from '@togglecorp/fujs';
import axios from 'axios';

import styles from './styles.module.scss';

import config from 'src/util/config';
import Card from '../Card';
import Loader from '../Loader';
import Terminology from '../Terminology';

/**
 * A component that renders a question card with options for user selection
 * @component
 * @param {Object} props - Props object
 * @param {number} props.id - The ID of the current question card
 * @param {Function} props.onSelectOption - A function to be called when an option is selected
 * @param {number} props.onSelectOption.answer - The ID of the selected option
 * @param {number} props.onSelectOption.id - The ID of the current question card
 * @param {boolean} props.onSelectOption.isHouseholds - A boolean value indicating whether the selected option represents a household
 * @param {boolean} props.onSelectOption.isSubgroup - A boolean value indicating whether the selected option represents a subgroup
 * @return {JSX.Element} - The QuestionCard component
*/

interface Option {
    id: number;
    name: string;
    child_state: number;
}

interface QuestionCardProps {
    id: number;
    onSelectOption: (option: {
        isHouseholds: boolean;
        isSubgroup: boolean
        answer: number;
        id: number;
    }) => void;
}

function QuestionCard({ id, onSelectOption }: QuestionCardProps): JSX.Element {
    const [answerKey, setAnswerKey] = useState<string | null>(null);
    const [parent_id, setParentId] = useState<number | null>(null);
    const [question, setQuestion] = useState<string | null>(null);
    const [answer, setAnswer] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [term, setTerm] = useState<string | null>(null);
    const [options, setOptions] = useState<Option[]>([]);

    useEffect(() => {
        const fetchState = async () => {
            const url = `${config.api}/decision-tree/${id}/`;
            try {
                const response = await axios.get(url);

                if (response.status !== 200) {
                    const errorMessage = await response.data;
                    throw new Error(errorMessage);
                }

                const data = response.data;
                setParentId(data.state.parent_state);
                setQuestion(data.state.name);
                setOptions(data.options);
                setTerm(data.state.term);
            } catch (error) {
                window.alert('An error occurred while fetching data.');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchState();
    }, []);

    /**
     * Updates the answer state variable and calls the onSelectOption function when an option is clicked to update parent component.
     * @param {string | null} term - The term associated with the current question.
     * @param {Option} option - The selected option.
    */
    const handleOptionClick = (term: string | null, option: Option) => {
        setAnswerKey(option.child_state + option.name);
        setAnswer(option.child_state);
        onSelectOption({
            id: id,
            answer: option.child_state,
            isHouseholds: option.name === config.household ? true : false,
            isSubgroup: term === config.subgroup && option.name === config.isSubgroup ? true : false,
        });
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <Card hasPulse={id === 1? true : false}>
                    <h2>
                        <Terminology term={term} text={question} />
                    </h2>
                    <div className={styles.answers}>
                        {options.map((option) => (
                            <button
                                key={option.id}
                                className={_cs(styles.optionBtn, option.child_state + option.name === answerKey && styles.isActive)}
                                onClick={() => handleOptionClick(term, option)}
                            >
                                {option.name}
                            </button>
                        ))}
                    </div>
                </Card>
            )}
        </>
    );
}

export default QuestionCard;
