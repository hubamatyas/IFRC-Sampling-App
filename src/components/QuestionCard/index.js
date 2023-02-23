import React, { useState, useEffect } from 'react';
import Card from '../Card';
import styles from './styles.module.scss';
import { _cs } from '@togglecorp/fujs';
import Terminology from '../Terminology';
import Loader from '../Loader';

function QuestionCard({ id, onSelectOption }) {
    const [question, setQuestion] = useState(null);
    const [term, setTerm] = useState(null);
    const [parent_id, setParentId] = useState(null);
    const [options, setOptions] = useState([]);
    const [answer, setAnswer] = useState(null);
    const [answerKey, setAnswerKey] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchState = async () => {
            try {
                const response = await fetch(`https://ifrc-sampling.azurewebsites.net/api/decision-tree/${id}/`);
                const data = await response.json();
                setQuestion(data.state.name);
                setParentId(data.state.parent_state);
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

    const handleOptionClick = (term, option) => {
        setAnswer(option.child_state);
        setAnswerKey(option.child_state + option.name);

        onSelectOption({
            answer: option.child_state,
            id: id,
            isHouseholds: option.name === 'Households' ? true : false,
            isSubgroup: term === 'sub-population groups' && option.name === 'Yes' ? true : false,
        });
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : 
            (
                <Card>
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
