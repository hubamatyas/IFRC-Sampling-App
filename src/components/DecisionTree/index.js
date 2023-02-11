import React,{useEffect} from "react";
import styles from "./styles.module.scss";
import QuestionCard from "../QuestionCard";

class DecisionTree extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            questionCards: [1],
        };
        this.fetchState = this.loadQuestionCards.bind(this);
    }

    componentDidMount() {
        this.loadQuestionCards();
    }

    loadQuestionCards(questionCard) {
        // add questionCard to questionCards in state
        this.setState({questionCards: [...this.state.questionCards, questionCard]});
    }

    handleOption = (option) => {
        console.log('Decision tree - parent', option);
        this.setState({questionCards: [...this.state.questionCards, option]});
    }

    render() {
        return (
            <div className={styles.intro}>
                <div>
                        {this.state.questionCards.map((questionCard) => (
                            <QuestionCard id={questionCard} onSelectOption={this.handleOption} />
                        ))}
                </div>
                {/* <h1> {question} </h1>
                <ul>
                    {options.map((option) => (
                        <li key={option.id} onClick={() => this.fetchState(option.child_state)}>
                            {option.option}
                        </li>
                    ))}
                </ul> */}
            </div>
        );
    }
}

export default DecisionTree;
