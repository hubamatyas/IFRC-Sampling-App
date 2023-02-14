import React,{useEffect} from "react";
import styles from "./styles.module.scss";
import QuestionCard from "../QuestionCard";

class DecisionTree extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            // initial state is [1] so API call is made to get first question card
            questionCards: [1],
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

        this.setState({questionCards: [...this.state.questionCards, option]});
    }

    render() {
        return (
            <div>
                {this.state.questionCards.map((questionCard) => (
                    <div className={styles.card}>
                        <QuestionCard
                            key={questionCard}
                            id={questionCard}
                            onSelectOption={this.handleOption}/>
                    </div>
                ))}
            </div>
        );
    }
}

export default DecisionTree;
