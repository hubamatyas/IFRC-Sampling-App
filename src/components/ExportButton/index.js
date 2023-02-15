import { usePDF, Document, Page,Text } from '@react-pdf/renderer';
import styles from "./styles.module.scss";
import React,{useEffect} from "react";

const MyDoc = ({questionCards}) =>{
  console.log("export questions:"+questionCards)
  const [names, setNames] = React.useState([]);
  console.log("export questions:"+names)

  const fetchState = async(id) => {
      
      console.log("Fetching question id:"+id)
      fetch('https://ifrc-sampling.azurewebsites.net/api/decision-tree/'+id+'/')
      .then(response => response.json())
      .then(data =>
          setNames(names => [...names, data.state.name])
      );
  }

  async function resetNames() {
    setNames([]);
  }

  useEffect( () =>
  { 
    questionCards.reduce((p, id) => p.then(fetchState(id)), Promise.resolve())
    .then(resetNames)
  },[questionCards])



 return (
 <Document>
  <Page>
      <Text>Survey tool export</Text>
      {names.map((name,i) => (
        <Text key={i}>{name}</Text>
      ))}
            
  </Page>
 </Document>
 );
}

const App = ({questionCards}) => {
  
  const [instance, updateInstance] = usePDF({ document: <MyDoc questionCards={questionCards}/> });
  if (instance.loading) return <div>Loading ...</div>;

  if (instance.error) return <div>Something went wrong: {instance.error}</div>;

  return (
    <div>

  <a href={instance.url} download="test.pdf" >
    <button onClick={updateInstance}>
      Export
    </button>
  </a>
    </div>
  );
}

export default App;