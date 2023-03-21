import React, { useState, useEffect, useCallback } from 'react';

import config from 'src/util/config';
import QuestionCard from '../QuestionCard';
import ClusterCalculator from '../../calculators/ClusterCalculator';
import SimpleRandomCalculator from '../../calculators/SimpleRandomCalculator';
import TimeLocationCalculator from '../../calculators/TimeLocationCalculator';
import SystematicRandomCalculator from '../../calculators/SystematicRandomCalculator';

/**
 * DecisionTree is a React component that renders a decision tree for a survey. It takes no props.
 * @component
 * @returns {JSX.Element} - Returns a JSX element that contains the question cards and calculators for the survey.
 * @example
 * <DecisionTree />
*/

interface OptionProps {
    id: number;
    answer: number;
    isSubgroup: boolean;
    isHouseholds: boolean;
}

const DecisionTree = (): JSX.Element => {
    const [questionCards, setQuestionCards] = useState<number[]>([]);
    const [hasSubgroups, setHasSubgroups] = useState<boolean>(false);
    const [hasHouseholds, setHasHouseholds] = useState<boolean>(false);
    const [hasIndividuals, setHasIndividuals] = useState<boolean>(true);

    /**
     * backwardsStateUpdate is a function that updates the state when the user goes back to the previous question card.
     * @function
     * @param {boolean} isHouseholds - Whether the selected option is a household.
     * @param {boolean} isSubgroup - Whether the selected option is a subgroup.
     */
    const backwardsStateUpdate = useCallback((isHouseholds: boolean, isSubgroup: boolean): void => {
        setHasSubgroups(isSubgroup);
        setHasHouseholds(isHouseholds);
        setHasIndividuals(!isHouseholds);
    }, []);

    /**
     * forwardsStateUpdate is a function that updates the state when the user goes to the next question card.
     * @function
     * @param {boolean} isHouseholds - Whether the selected option is a household.
     * @param {boolean} isSubgroup - Whether the selected option is a subgroup.
     */
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
        switch (questionCard) {
            case config.cluster:
                return (
                    <ClusterCalculator
                        questionCards={questionCards}
                    />
                );
            case config.timeLocation:
                return (
                    <TimeLocationCalculator
                        key={`${hasSubgroups}${hasHouseholds}`}
                        questionCards={questionCards}
                    />
                );
            case config.systematicRandom:
                return (
                    <SystematicRandomCalculator
                        key={`${hasSubgroups}`}
                        hasSubgroups={hasSubgroups}
                        questionCards={questionCards}
                    />
                );
            case config.simpleRandom:
                return (
                    <SimpleRandomCalculator
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
        setQuestionCards([config.startId]);
    }, []);

    return (
        <div>
            {questionCards.map((questionCard) => renderElement(questionCard))}
        </div>
    );
};

export default DecisionTree;
