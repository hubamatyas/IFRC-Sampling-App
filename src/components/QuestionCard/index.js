import React,{useEffect} from "react";
import styles from "./styles.module.scss";

class QuestionCard extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            question: '',
            id: props.id,
            parent_id: null,
            description: '',
            options: [],
        };
        this.fetchState = this.fetchState.bind(this);
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

    render() {
        const question = this.state.question;
        const options = this.state.options;
        console.log(question);
        console.log(options);
        return (
            <div className={styles.intro}>
                <h1> {question} </h1>
                <ul>
                    {options.map((option) => (
                        <li key={option.id} onClick={() => this.fetchState(option.child_state)}>
                            {option.option}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default QuestionCard;
