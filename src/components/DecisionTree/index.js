import React,{useEffect} from "react";
import styles from "./styles.module.scss";
import QuestionCard from "../QuestionCard";
import ExportButton from "../ExportButton";
import SimpleRandom from "../SimpleRandom";

class DecisionTree extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            // initial state is [1] so API call is made to get first question card
            // refactor to store entire question card in state instead of just id
            questionCards: [1],
            hasSubroups: false,
            hasHouseholds: false,
            hasIndividuals: false,
        };
        this.fetchState = this.loadQuestionCards.bind(this);
    }

    componentDidMount() {
        this.loadQuestionCards();
    }

    loadQuestionCards(questionCard) {
        // add questionCard to questionCards in state
        //this.setState({questionCards: [...this.state.questionCards, questionCard]});
    }

    handleOption = (option, id) => {
        // handles case when user goes back to previous question card
        var questionCards = this.state.questionCards;
        if (questionCards.includes(id)) {
            var index = questionCards.indexOf(id);
            questionCards.splice(index + 1, questionCards.length - index);
        }

        this.setState({questionCards: [...questionCards, option]});
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
                    // ask how important it is to only render the subgroups,
                    // households, and individuals input fields when they are
                    // necessary. if not, we can just render every input field
                    // and let user decide which ones to fill out, if yes, find
                    // a way for QuestionCard to set hasSubgroups, hasHouseholds,
                    // and hasIndividuals to true. this will probably require
                    // a new field in the API database, called shortName. then,
                    // if shortName is "subgroups", set hasSubgroups to true, etc.
                    hasSubroups={this.state.hasSubroups}
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

                <ExportButton questionCards={this.state.questionCards}/>

            </div>
        );
    }
}

export default DecisionTree;
