import React,{useEffect} from "react";
import styles from "./styles.module.scss";
import QuestionCard from "../QuestionCard";
import SimpleRandom from "../SimpleRandom";
import cloneDeep from 'lodash/cloneDeep';

class DecisionTree extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            // initial state is [1] so API call is made to get first question card
            // refactor to store entire question card in state instead of just id
            questionCards: [1],
            hasSubroups: false,
            hasHouseholds: false,
            hasIndividuals: true,
        };
        this.handleOption = this.handleOption.bind(this);
        this.backwardsStateUpdate = this.backwardsStateUpdate.bind(this);
        this.forwardsStateUpdate = this.forwardsStateUpdate.bind(this);
    }

    componentDidMount() {
        this.loadQuestionCards();
    }

    loadQuestionCards(questionCard) {
        // add questionCard to questionCards in state
        //this.setState({questionCards: [...this.state.questionCards, questionCard]});
    }

    // arguments are passed from QuestionCard
    handleOption = ({answer, id, isHouseholds, isSubgroup}) => {
        var questionCards = this.state.questionCards;
        var originalLength = questionCards.length;
        
        // test whether id appears twice in questionCards by checking id's index
        // if it's not the last element in the array, remove all elements after it
        var index = questionCards.indexOf(id);
        questionCards.splice(index + 1, questionCards.length - index);
        
        // reset state when user goes back to previous question card
        var splicedLength = questionCards.length;
        if (originalLength !== splicedLength) {
            this.backwardsStateUpdate(isHouseholds, isSubgroup);
        } else {
            this.forwardsStateUpdate(isHouseholds, isSubgroup);
        }
        this.setState({
            questionCards: [...questionCards, answer],
        });
    }

    backwardsStateUpdate = (isHouseholds, isSubgroup) => {
        this.setState({
            hasHouseholds: isHouseholds,
            hasIndividuals: !isHouseholds,
            hasSubroups: isSubgroup,
        })
    }

    forwardsStateUpdate = (isHouseholds, isSubgroup) => {
        this.setState({
            hasSubroups: isSubgroup ? true : this.state.hasSubroups,
            hasHouseholds: isHouseholds ? true : this.state.hasHouseholds,
            hasIndividuals: isHouseholds ? false : this.state.hasIndividuals,
        });
    }

    renderElement = (questionCard) => {
        // refactor this to use a switch statement and name of the
        // calculators as the case, not the id. default of switch
        // should be QuestionCard
        if (questionCard !== 5) {
            return (
                <QuestionCard
                    key={questionCard}
                    id={questionCard}
                    onSelectOption={this.handleOption}
                />
            );
        } else {
            return (
                <SimpleRandom
                    // re-render SimpleRandom whenever hasSubroups or hasHouseholds changes
                    key={this.state.hasSubroups || this.state.hasHouseholds }
                    hasSubroups={this.state.hasSubroups}
                    questionCards={this.state.questionCards}
                    hasHouseholds={this.state.hasHouseholds}
                    hasIndividuals={this.state.hasIndividuals}
                />
            );
        }
    }

    render() {
        return (
            <div>
                {this.state.questionCards.map((questionCard) => (
                    this.renderElement(questionCard)
                ))}
            </div>
        );
    }
}

export default DecisionTree;