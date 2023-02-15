import React from "react";
import styles from "./styles.module.scss";
import Button from "../../components/Button/index";
import lang from "../../lang.js"
import { useTranslation } from "react-i18next";
import QuestionCard from "../../components/QuestionCard/index";
import DecisionTree from "src/components/DecisionTree";


class Resources extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            // initial state is [1] so API call is made to get first question card
            questionCards: [1],
        };
        //this.fetchState = this.loadQuestionCards.bind(this);
    }

    componentDidMount() {
        this.getCardsBFS();
    }

    // BFS to get all question cards
    async getCardsBFS() {
        // when done with project, add a condition to check if options[i]
        // has already been added to questionCards. this will prevent infinite looping
        while (this.state.questionCards.length > 0) {
            var currentId = this.state.questionCards.shift();
            console.log(currentId);
            var options = await this.getOptions(currentId);
            console.log(options)
            for (var i = 0; i < options.length; i++) {
                this.state.questionCards.push(options[i]);
                //console.log(options[i]);
            }
            break;
        }
        // TODO: figure out how to merge options on the same level
        // for example options for id 2 are [x,y] and for id 3 are [z,w]
        // so the option array for that level should be [x,y,z,w]
    }

    async getOptions(id) {
        var options = [];
        // make async await API call to get options
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch('https://ifrc-sampling.azurewebsites.net/api/decision-tree/'+id+'/');
        const data = await response.json();
        for (var i = 0; i < data.options.length; i++) {
            options.push(data.options[i].child_state);
        }
        
        return options;
            
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

export default Resources;