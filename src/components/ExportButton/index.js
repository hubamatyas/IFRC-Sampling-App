import { Document, Page,Text, pdf } from '@react-pdf/renderer';
import styles from "./styles.module.scss";
import React from "react";
import { IoMdDownload } from 'react-icons/io';


const MyDoc = ({questionNames, answers, calculatorState}) =>{
  return (
  <Document>
  <Page>
      <Text>Survey Tool Report</Text>
      <Text>----------------------------</Text>

      {questionNames.map((name,i) => (
        <Text style={{ fontSize: 14, margin : 10 }} key={i}>
          {name}{"\n"}
      
          {answers[i]? 
            "---" + answers[i] 
            :
            Object.keys(calculatorState).map((stateKey, i) => (
              <Text key={i}> 
                {stateKey} :  {calculatorState[stateKey]} {"\n"}
              </Text>
            ))
          }
        </Text>
      ))}
  </Page>
 </Document>
 );
}


const App = ({questionCards, calculatorState}) => {

  const questionNames = React.useRef([]);
  const options = React.useRef([]);
  const answers = React.useRef([]);
  const [loading, setLoading] = React.useState(false);
  const [fetchedNum, setFetchedNum] = React.useState(0);
  
  const fetchState = async(id) => {
    let success = true
    await fetch('https://ifrc-sampling.azurewebsites.net/api/decision-tree/'+id+'/')
      .then(response => response.json())
      .then(data =>{
        questionNames.current.push(data.state.name);

        if (options.current.length) {
          answers.current.push (
            options.current.find((opt)=>(opt.child_state === id)).name
          );
        }

        options.current = data.options;
      })

      .catch(e => {
        console.error(e);
        alert("Sorry we have a little problem fetching data. Export failed." );
        success = false
      });

    return success;
  }

  const resetRefs = async() => {
    questionNames.current=[];
    options.current=[];
    answers.current=[];
  }

  const generatePDFDocument = async () => {
    try{
      const blob = await pdf(
        <MyDoc 
          questionNames={questionNames.current} 
          answers={answers.current} 
          calculatorState={calculatorState}
        />
      ).toBlob();
      return (URL.createObjectURL(blob));
    }
    
    catch(err) {
      console.log(err.message);
      alert("Sorry we have a little problem rendering PDF. Export failed." );
      return null;
    }
  };

  const handleClick = async() => {
    setFetchedNum(0);
    setLoading(true);
    await resetRefs();
    
    for (const id of questionCards) {
      if (! await fetchState(id)) {
        setLoading(false);
        return;
      };
      setFetchedNum((prev)=>prev+1);
    }

    var url = await generatePDFDocument();
    if (url) {window.open(url);}
    setLoading(false);
  }
  
  return (
    <div>
      <button className={styles.exportBtn} onClick={handleClick}>
        <IoMdDownload />
        {loading? 
          (" Loading... "+ ~~(99*fetchedNum/(questionCards.length)) + "%") 
          : 
          " Export report"
        }
      </button>
    </div>
  );
}


export default App;