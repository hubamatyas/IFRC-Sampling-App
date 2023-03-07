import React, { useState, useEffect } from 'react';
import Card from '../Card';
import styles from './styles.module.scss';
import { _cs } from '@togglecorp/fujs';
import Terminology from '../Terminology';
import Loader from '../Loader';

interface Option {
    child_state: number;
    name: string;
    id: number;
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
            try {
                const response = await fetch(`https://ifrc-sampling.azurewebsites.net/api/decision-tree/${id}/`);
                const data = await response.json();
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

    const handleOptionClick = (term: string | null, option: Option) => {
        setAnswerKey(option.child_state + option.name);
        setAnswer(option.child_state);
        onSelectOption({
            id: id,
            answer: option.child_state,
            isHouseholds: option.name === 'Households' ? true : false,
            isSubgroup: term === 'sub-population groups' && option.name === 'Yes' ? true : false,
        });
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <Card hasPulse={id === 1? true : false}>
                    <h2 data-cy="question-name">
                        <Terminology term={term} text={question} />
                    </h2>
                    <div className={styles.answers}>
                        {options.map((option) => (
                            <button
                                key={option.id}
                                className={_cs(styles.optionBtn, option.child_state + option.name === answerKey && styles.isActive)}
                                onClick={() => handleOptionClick(term, option)}
                                data-cy="option-btn"
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
