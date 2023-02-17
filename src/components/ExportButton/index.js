import { Document, Page,Text, pdf } from '@react-pdf/renderer';
import styles from "./styles.module.scss";
import React from "react";

const MyDoc = ({qnames, answers}) =>{
  console.log("questions write to pdf: "+qnames)
  console.log("answers write to pdf: "+answers)
 return (
 <Document>
  <Page>
      <Text>Survey Tool Report</Text>
      <Text>----------------------------</Text>
      {qnames.map((name,i) => (
        <Text style={{ fontSize: 14, margin : 10 }} key={i}>
          {name}{"\n"}
          ---{answers[i]}
        </Text>
      ))}
            
  </Page>
 </Document>
 );
}


const App = ({questionCards}) => {

  const names = React.useRef([]);
  const options = React.useRef([]);
  const answers = React.useRef([]);
  const [loading, setLoading] = React.useState(false);
  const [fetchedNum, setFetchedNum] = React.useState(0);

  const fetchState = async(id) => {
    await fetch('https://ifrc-sampling.azurewebsites.net/api/decision-tree/'+id+'/')
      .then(response => response.json())
      .then(data =>{
          names.current = [...names.current, data.state.name];

          if (options.current.length) {
            answers.current = [...answers.current, 
              options.current.find((opt)=>(opt.child_state === id)).option
            ];
          }

          options.current = data.options;

        })
      .catch(e => {
        console.error(e);
      });
      console.log("fetched qn id: "+id)

  }

  async function resetRefs() {
    names.current=[];
    options.current=[];
    answers.current=[];
  }

  const generatePDFDocument = async () => {
    const blob = await pdf(
      <MyDoc qnames={names.current} answers={answers.current}/>
    ).toBlob();
    return (URL.createObjectURL(blob))
  };

  const fetchAll = async() => {
    console.log(questionCards)
    setFetchedNum(0);
    setLoading(true);
    await resetRefs();
    for (const id of questionCards) {
      await fetchState(id);
      setFetchedNum((prev)=>prev+1);
    }

    var url = await generatePDFDocument();
    setLoading(false);
    window.open(url);
  }

  

  return (
    <div>
    <a>
      <button onClick={()=>{fetchAll()}}>
        {loading? ("Loading... "+ ~~(100*fetchedNum/questionCards.length) + "%") : "Export report"}
      </button>
    </a>
    </div>
  );
}


export default App;