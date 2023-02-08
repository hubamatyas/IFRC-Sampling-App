import React from "react";
import QuestionsCards from "./qn-cards";
// import "./styles/main.scss";
import {Calculator} from "../Calculators/simple-random";
import Button from "../Button/index";
import Terminology from "../Terminology";
import styles from "./styles.module.scss";


// the current question to answer
const Question = ( {setUserAnswers, userAnswers} ) => {

  if (!Object.keys(QuestionsCards).includes(userAnswers)){
    return <Calculator />
  }

  else{
    const ansButtons = []
    QuestionsCards[userAnswers][1].forEach((ans, index) => {
      ansButtons.push (
        <Button 
          variant="secondary"
          onClick={() =>setUserAnswers(userAnswers + index)}
        >
          {ans}
        </Button>
          )
        }
    )
    
    return (
      <div>
        <br></br>
        <p className={styles.questionText}><Terminology word={userAnswers}/></p>
        <div className={styles.answerButtons}>
          {ansButtons}
        </div>
      </div>
    );
  }
};
export default Question;
