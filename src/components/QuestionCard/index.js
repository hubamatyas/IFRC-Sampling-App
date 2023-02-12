import React,{useEffect} from "react";
import styles from "./styles.module.scss";
import { _cs } from '@togglecorp/fujs';

class QuestionCard extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            question: '',
            id: props.id,
            parent_id: null,
            description: '',
            options: [],
            selected_option: null,
        };
        this.fetchState = this.fetchState.bind(this);
        this.handleOptionClick = this.handleOptionClick.bind(this);
    }

    componentDidMount() {
        this.fetchState();
    }

    fetchState() {
        fetch('http://127.0.0.1:8000/api/decision-tree/'+this.state.id+'/')
            .then(response => response.json())
            .then(data => 
                this.setState({ 
                question: data.state.name,
                parent_id: data.state.parent_id,
                description: data.state.description,
                options: data.options,
                })
            );
    }

    // pass child_state to parent (i.e., DecisionTree) to render next question card
    handleOptionClick(child_state) {
        this.setState({selected_option: child_state},
            () => this.props.onSelectOption(
                this.state.selected_option,
                this.state.id
            )
        );
    }

    render() {
        const question = this.state.question;
        const options = this.state.options;
        return (
            <div className={styles.card}>
                <h2> {question} </h2>
                <div className={styles.answers}>
                    {options.map((option) => (
                        <button 
                            key={option.id}
                            className={_cs(
                                styles.optionBtn,
                                option.child_state === this.state.selected_option && styles.isActive,
                            )}
                            onClick={() => this.handleOptionClick(option.child_state)}>
                            {option.option}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}

export default QuestionCard;
