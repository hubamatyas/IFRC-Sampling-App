import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.scss';
import QuestionCard from '../QuestionCard';
import SimpleRandomCalculator from '../../calculators/SimpleRandomCalculator';
import SystematicRandomCalculator from '../../calculators/SystematicRandomCalculator';
import TimeLocationCalculator from '../../calculators/TimeLocationCalculator';
import config from 'src/util/config';

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
            case config.timeLocation:
                return (
                    <TimeLocationCalculator
                        // re-render TimeLocation whenever hasSubroups or hasHouseholds changes
                        key={`${hasSubgroups}${hasHouseholds}`}
                        questionCards={questionCards}
                    />
                );
            case config.systematicRandom:
                return (
                    <SystematicRandomCalculator
                        // re-render SystematicRandom whenever hasSubroups or hasHouseholds changes
                        key={`${hasSubgroups}`}
                        hasSubgroups={hasSubgroups}
                        questionCards={questionCards}
                    />
                );
            case config.simpleRandom:
                return (
                    <SimpleRandomCalculator
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
        setQuestionCards([config.startId]);
    }, []);

    return (
        <div>
            {questionCards.map((questionCard) => renderElement(questionCard))}
        </div>
    );
};

export default DecisionTree;
