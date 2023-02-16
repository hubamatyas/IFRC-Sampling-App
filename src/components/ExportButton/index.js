import { usePDF, Document, Page,Text } from '@react-pdf/renderer';
import styles from "./styles.module.scss";
import React,{useEffect} from "react";

const MyDoc = ({questionCards}) =>{
  console.log("export questions:"+questionCards)
  // const [names, setNames] = React.useState([]);
  const names = React.useRef([]);
  console.log("export question names:"+names.current)

  const [qnames, setQnames] = React.useState([]);

  const fetchState = async(id) => {
    await fetch('https://ifrc-sampling.azurewebsites.net/api/decision-tree/'+id+'/')
      .then(response => response.json())
      .then(data =>
          {names.current =  [...names.current, data.state.name]
          console.log("Fetched question id:"+id)}
      )
      .catch(e => {
        console.error(e);
      })
  }

  async function resetNames() {
    names.current = [];
  }

  useEffect( () =>{
     const fetchAll = async() => {
      await resetNames();
      for (const id of questionCards) {
        await fetchState(id);
      }
    }

    fetchAll()
    .then(()=>{setQnames(names.current)})
    .then(()=>{console.log("finish fetching")})

  },[questionCards])

  

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
  
  const [instance, updateInstance] = usePDF({ document: <MyDoc questionCards={questionCards} /> });

  

  if (instance.loading) return <div>Loading ...</div>;

  if (instance.error) return <div>Something went wrong: {instance.error}</div>;


  async function handleClick() {
    console.log("start update")
    await update().then(()=>{console.log("finish update")}).then(()=>{open()})
    
  }

  async function handleAwaitClick() {
    await update();
    await open();
  }


  const update = async() => {
    updateInstance(); 
    return("finish update")
  }
  const open = async() => {
    window.open(instance.url);
  }


  return (
    <div>
      <button onClick={update}>
        update
      </button>
      <button onClick={open}>
        open
      </button>
    {/* <a href={instance.url} download="test.pdf" > */}
    <a>
      <button onClick={handleAwaitClick}>
        export report
      </button>
    </a>
    </div>
  );
}

export default App;