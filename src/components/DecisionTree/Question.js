import React from "react";
import QuestionsCards from "./QuestionsCards";
// import "./styles/main.scss";
import {Calculator} from "./Calculator";
import Button from "../Button/index";
import Terminology from "./Terminology";


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
        <p><Terminology word={userAnswers}/></p>
        <div style={{
          display:"flex",
          justifyContent: 'center', 
          alignItems: 'center',
          flexDirection: 'row' 
        }}>
          {ansButtons}
        </div>
      </div>
    );
  }
};
export default Question;
