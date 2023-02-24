import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.scss';
import QuestionCard from '../QuestionCard';
import SimpleRandom from '../SimpleRandom';

interface OptionProps {
    answer: number;
    id: number;
    isHouseholds: boolean;
    isSubgroup: boolean;
}

const DecisionTree = (): JSX.Element => {
    const [questionCards, setQuestionCards] = useState<number[]>([]);
    const [hasSubgroups, setHasSubgroups] = useState<boolean>(false);
    const [hasHouseholds, setHasHouseholds] = useState<boolean>(false);
    const [hasIndividuals, setHasIndividuals] = useState<boolean>(true);

    const backwardsStateUpdate = useCallback((isHouseholds: boolean, isSubgroup: boolean): void => {
        setHasHouseholds(isHouseholds);
        setHasIndividuals(!isHouseholds);
        setHasSubgroups(isSubgroup);
    }, []);

    const forwardsStateUpdate = useCallback((isHouseholds: boolean, isSubgroup: boolean): void => {
        setHasSubgroups(isSubgroup ? true : hasSubgroups);
        setHasHouseholds(isHouseholds ? true : hasHouseholds);
        setHasIndividuals(isHouseholds ? false : hasIndividuals);
    }, [hasSubgroups, hasHouseholds, hasIndividuals]);

    const handleOption = useCallback(({ answer, id, isHouseholds, isSubgroup }: OptionProps): void => {
        const originalLength: number = questionCards.length;

        // test whether id appears twice in questionCards by checking id's index
        // if it's not the last element in the array, remove all elements after it
        const index: number = questionCards.indexOf(id);
        const slicedLength: number = index === -1 ? questionCards.length : index + 1;
        const newQuestionCards: number[] = [...questionCards.slice(0, slicedLength), answer];
        setQuestionCards(newQuestionCards);

        // reset state when user goes back to previous question card
        if (originalLength !== slicedLength) {
            backwardsStateUpdate(isHouseholds, isSubgroup);
        } else {
            forwardsStateUpdate(isHouseholds, isSubgroup);
        }
    }, [questionCards, backwardsStateUpdate, forwardsStateUpdate]);

    const renderElement = useCallback((questionCard: number): JSX.Element => {
        // refactor this to use a switch statement and name of the
        // calculators as the case, not the id. default of switch
        // should be QuestionCard
        switch (questionCard) {
            case 5:
                return (
                    <SimpleRandom
                        // re-render SimpleRandom whenever hasSubroups or hasHouseholds changes
                        key={`${hasSubgroups}${hasHouseholds}`}
                        hasSubgroups={hasSubgroups}
                        questionCards={questionCards}
                        hasHouseholds={hasHouseholds}
                        hasIndividuals={hasIndividuals}
                    />
                );
            default:
                return (
                    <QuestionCard
                        key={questionCard}
                        id={questionCard}
                        onSelectOption={handleOption}
                    />
                );
        }
    }, [questionCards, hasSubgroups, hasHouseholds, hasIndividuals, handleOption]);

    useEffect(() => {
        // initial state is [1] so API call is made to get first question card
        setQuestionCards([1]);
    }, []);

    return (
        <div>
            {questionCards.map((questionCard) => renderElement(questionCard))}
        </div>
    );
};

export default DecisionTree;
