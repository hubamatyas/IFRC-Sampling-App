import { Document, Page,Text, pdf } from '@react-pdf/renderer';
import styles from "./styles.module.scss";
import React from "react";

const MyDoc = ({qnames}) =>{
  console.log("write to pdf: "+qnames)
 return (
 <Document>
  <Page>
      <Text>Survey tool export</Text>
      <Text>------------------</Text>
      {qnames.map((name,i) => (
        <Text key={i}>{name}</Text>
      ))}
            
  </Page>
 </Document>
 );
}


const App = ({questionCards}) => {

  const names = React.useRef([]);
  const [loading, setLoading] = React.useState(false);

  const fetchState = async(id) => {
    await fetch('https://ifrc-sampling.azurewebsites.net/api/decision-tree/'+id+'/')
      .then(response => response.json())
      .then(data =>{
          names.current = [...names.current, data.state.name];
          console.log("Fetched question id:"+id)
        })
      .catch(e => {
        console.error(e);
      })
  }

  async function resetNames() {
    names.current=[];
  }


  const fetchAll = async() => {
    setLoading(true);
    await resetNames();
    for (const id of questionCards) {
      await fetchState(id);
    }

    var url = await generatePDFDocument();
    setLoading(false);
    window.open(url);
  }

  const generatePDFDocument = async () => {
    const blob = await pdf(
      <MyDoc qnames={names.current} />
    ).toBlob();
    return (URL.createObjectURL(blob))
  };
  

  return (
    <div>
    <a>
      <button onClick={()=>{fetchAll()}}>
        {loading? "Loading..." : "Export report"}
      </button>
    </a>
    </div>
  );
}


export default App;