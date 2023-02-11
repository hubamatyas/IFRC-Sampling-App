import React,{useEffect} from "react";
import styles from "./styles.module.scss";
import QuestionCard from "../QuestionCard";

class DecisionTree extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            questionCards: [],
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

    render() {
        const test = <QuestionCard id={1} />;
        return (
            <div className={styles.intro}>
                <div>
                        <QuestionCard id={1} />
                        <QuestionCard id={2} />                        
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
