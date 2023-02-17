import { Document, Page,Text, pdf } from '@react-pdf/renderer';
import styles from "./styles.module.scss";
import React from "react";
import { IoMdDownload } from 'react-icons/io';


const MyDoc = ({qnames, answers, calcState}) =>{

  return (
  <Document>
  <Page>
      <Text>Survey Tool Report</Text>
      <Text>----------------------------</Text>

      {qnames.map((name,i) => (
        <Text style={{ fontSize: 14, margin : 10 }} key={i}>
          {name}{"\n"}
          
          {answers[i]? 
            "---" + answers[i] :
            Object.keys(calcState).map((key) => (
              <Text> {key} :  {calcState[key]} {"\n"}</Text>
            ))
          }
        </Text>
      ))}


  </Page>
 </Document>
 );
}


const App = ({questionCards, calcState}) => {

  const names = React.useRef([]);
  const options = React.useRef([]);
  const answers = React.useRef([]);
  const [loading, setLoading] = React.useState(false);
  const [fetchedNum, setFetchedNum] = React.useState(0);
  
  const fetchState = async(id) => {
    await fetch('https://ifrc-sampling.azurewebsites.net/api/decision-tree/'+id+'/')
      .then(response => response.json())
      .then(data =>{
        names.current.push(data.state.name);

        if (options.current.length) {
          answers.current.push (
            options.current.find((opt)=>(opt.child_state === id)).option
          );
        }

        options.current = data.options;
      })

      .catch(e => {
        console.error(e);
      });
  }

  const resetRefs = async() => {
    names.current=[];
    options.current=[];
    answers.current=[];
  }

  const generatePDFDocument = async () => {
    const blob = await pdf(
      <MyDoc qnames={names.current} answers={answers.current} calcState={calcState}/>
    ).toBlob();
    return (URL.createObjectURL(blob))
  };

  const handleClick = async() => {
    setFetchedNum(0);
    setLoading(true);
    await resetRefs();
    
    for (const id of questionCards) {
      await fetchState(id);
      setFetchedNum((prev)=>prev+1);
    }

    var url = await generatePDFDocument();
    window.open(url);
    setLoading(false);
  }
  
  return (
    <div>
      <button className={styles.exportBtn} onClick={handleClick}>
        <IoMdDownload />
        {loading? 
          (" Loading... "+ ~~(100*fetchedNum/questionCards.length) + "%") : 
          " Export report"
        }
      </button>
    </div>
  );
}


export default App;