import React from "react";
import Question from "./next-qn";
import UserAnswer from "./previous-qns";
import Button from "../Button/index";
import styles from "./styles.module.scss";
import lang from "../../lang.js"

export default function DecisionTree() {

  const [userAnswers, setUserAnswers] = React.useState("f");

  const restart = () => {
    setUserAnswers("f");
  }; 

  const goPrev =() => {
    if (userAnswers.length>1){
      setUserAnswers(userAnswers.slice(0, -1))
    }
  }

  return (
    <div >
        <h1>Surveying Tool</h1>
        <br/>

        <UserAnswer userAnswers={userAnswers} />

        <Question
            setUserAnswers={setUserAnswers}
            userAnswers={userAnswers}
        /> 

        <hr></hr>
        <div style={{
          display:"flex",
          justifyContent: 'center', 
          alignItems: 'center',
          flexDirection: 'row' 
        }}>
            <Button
                variant={"secondary"}
                onClick={goPrev}
            >
                previous question
            </Button>

            <Button
                variant={"secondary"}
                onClick={restart}
            >
                Restart
            </Button>
        </div>
        <br/>
    </div>
  
  );
}