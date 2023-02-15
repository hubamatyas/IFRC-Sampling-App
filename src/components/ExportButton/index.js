import { usePDF, Document, Page,Text } from '@react-pdf/renderer';
import styles from "./styles.module.scss";
import React,{useEffect} from "react";

const MyDoc = ({questionCards}) =>{
  console.log("export questions:"+questionCards)
  const [names, setNames] = React.useState([]);
  console.log("export question names:"+names)


  const fetchState = async(id) => {
    await
      fetch('https://ifrc-sampling.azurewebsites.net/api/decision-tree/'+id+'/')
      .then(response => response.json())
      .then(data =>
          {setNames(names => [...names, data.state.name])
          console.log("Fetched question id:"+id)}
      )
      .catch(e => {
        console.error(e);
      })
  }

  async function resetNames() {
    setNames([]);
  }

  useEffect( () =>{
     const fetchAll = async() => {
      await resetNames();
      for (const id of questionCards) {
        await fetchState(id);
      }
    }

    fetchAll();
    
  },[questionCards])



 return (
 <Document>
  <Page>
      <Text>Survey tool export</Text>
      <Text>------------------</Text>
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
    <button onClick={()=>{updateInstance()}}>
      Export
    </button>
  </a>
    </div>
  );
}

export default App;