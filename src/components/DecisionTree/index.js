import React, { useEffect } from "react";
import Question from "./next-qn";
import UserAnswer from "./previous-qns";
import Button from "../Button/index";
import styles from "./styles.module.scss";
import lang from "../../lang.js"

export default function DecisionTree() {

  const [userAnswers, setUserAnswers] = React.useState([{
    "id": 0,
    "name": "Do you have a list frame?",
    "parent_id": null,
    "description": "Some text"
}]);

//   const restart = () => {
//     setUserAnswers(setUserAnswers(userAnswers[0]));
//   }; 

//   const goPrev =() => {
//     if (userAnswers.length>1){
//       setUserAnswers(userAnswers.slice(0, -1))
//     }
//   }


    useEffect( () => 
  {
    console.log('Fetching...')

    fetch('http://127.0.0.1:8000/api/state-list/')
    .then(response => response.json())
    .then(data => 
      setUserAnswers(
        data
      ))  
  },[])
  


    return (
        <div >
            <h1>Surveying Tool</h1>
            <br/>

            {userAnswers.map(({id,name,parent_id,description},index)=>{
                return(
                <div key={index}>
                    <li>{id}</li>
                    <li>{name}</li>
                    <li>{parent_id}</li>
                    <li>{description}</li>
                    <br></br>
                </div>
                )
            })}
            </div> 
        )
            
    

//   return (
//     <div >
//         <h1>Surveying Tool</h1>
//         <br/>

//         <UserAnswer userAnswers={userAnswers} />

//         <Question
//             setUserAnswers={setUserAnswers}
//             userAnswers={userAnswers}
//         /> 

//         <hr></hr>
//         <div style={{
//           display:"flex",
//           justifyContent: 'center', 
//           alignItems: 'center',
//           flexDirection: 'row' 
//         }}>
//             <Button
//                 variant={"secondary"}
//                 onClick={goPrev}
//             >
//                 previous question
//             </Button>

//             <Button
//                 variant={"secondary"}
//                 onClick={restart}
//             >
//                 Restart
//             </Button>
//         </div>
//         <br/>
//     </div>
  
//   );



}