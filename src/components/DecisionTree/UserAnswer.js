import QuestionsCards from "./QuestionsCards";
import Button from "../Button/index";
import Terminology from "./Terminology";

// return the question cards that have been answered
const UserAnswer = ( {userAnswers} ) => {

  const quescards = []

  for (let i = 1; i < userAnswers.length; i++){
    let dictkey = userAnswers.slice(0,i)
    quescards.push(
      <div key={dictkey}>
        <br></br>
        <p><Terminology word={dictkey}/></p>
        <div style={{
          display:"flex",
          justifyContent: 'center', 
          alignItems: 'center',
          flexDirection: 'row' 
        }}>
          <Button 
            variant={"primary"}>
            {(QuestionsCards[dictkey][1][userAnswers.charAt(i)])}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>{quescards}</div>
  );
};
export default UserAnswer;