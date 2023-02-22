import React,{useEffect} from "react";
import styles from "./styles.module.scss";
import Card from "../Card";
import { _cs } from '@togglecorp/fujs';
import Terminology from "../Terminology";
import Loader from "../Loader";

class QuestionCard extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            question: null,
            term: null,
            id: props.id,
            parent_id: null,
            options: [],
            answer: null,
            answerKey: null,
            isLoading: true,
        };
        this.fetchState = this.fetchState.bind(this);
        this.handleOptionClick = this.handleOptionClick.bind(this);
    }

    componentDidMount() {
        this.fetchState();
    }

    fetchState() {
        fetch('https://ifrc-sampling.azurewebsites.net/api/decision-tree/'+this.state.id+'/')
            .then(response => response.json())
            .then(data => 
                this.setState({ 
                question: data.state.name,
                parent_id: data.state.parent_state,
                options: data.options,
                term: data.state.term,
                }))
            .then(() => this.setState({isLoading: false}));
    }

    // pass child_state to parent (i.e., DecisionTree) to render next question card
    handleOptionClick(term, option) {
        this.setState({
            answer: option.child_state,
            answerKey: option.child_state + option.name,},
            () => this.props.onSelectOption(
                {answer: this.state.answer,
                id: this.state.id,
                isHouseholds: option.name === "Households" ? true : false,
                isSubgroup: term === "sub-population groups" && option.name === "Yes" ? true : false,}
            )
        );
    }

    render() {
        const answer_key = this.state.answerKey;
        const question = this.state.question;
        const options = this.state.options;
        const term = this.state.term;
        return (
            <>
                {/* <img src={arrow} className={styles.arrow}/> */}
                {this.state.isLoading ? <Loader/> :
                    <Card>
                        <h2> <Terminology term={term} text={question}/> </h2>
                        <div className={styles.answers}>
                            {options.map((option) => (
                                <button 
                                    key={option.id}
                                    className={_cs(
                                        styles.optionBtn,
                                        option.child_state + option.name === answer_key
                                        && styles.isActive,
                                    )}
                                    onClick={() => this.handleOptionClick(term, option)}>
                                    {option.name}
                                </button>
                            ))}
                        </div>
                    </Card>
                }
            </>
        );
    }
}

export default QuestionCard;
