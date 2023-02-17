import { usePDF, Document, Page,Text, PDFDownloadLink, pdf } from '@react-pdf/renderer';
import styles from "./styles.module.scss";
import React,{useEffect} from "react";

const MyDoc = ({qnames}) =>{
  console.log("MyDoc: "+qnames)
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

////////////////////////////////////////  APP  ////////////////////////////////////////

const App = ({questionCards}) => {

  const names = React.useRef([]);
  // const [names, setNames] = React.useState([]);
  // const [qnames, setQnames] = React.useState([]);
  
  const [instance, updateInstance] = usePDF({ document: <MyDoc qnames={names.current} /> });


  if (instance.loading) return <div>Loading ...</div>;

  if (instance.error) return <div>Something went wrong: {instance.error}</div>;


  const update = async() => {
    updateInstance(); 
  }

  const open = async() => {
    window.open(instance.url);
  }



  const fetchState = async(id) => {
    await fetch('https://ifrc-sampling.azurewebsites.net/api/decision-tree/'+id+'/')
      .then(response => response.json())
      .then(data =>
          {names.current = [...names.current, data.state.name];
          console.log("Fetched question id:"+id)}
          )
      .catch(e => {
        console.error(e);
      })
  }

  async function resetNames() {
    names.current=[];
  }


  const fetchAll = async() => {
    await resetNames();
    for (const id of questionCards) {
      await fetchState(id);
    }
    console.log("fetchAll: "+names.current)

    var url = await generatePDFDocument();
    window.open(url);
    // await update();
    // await open();
  }

  const generatePDFDocument = async () => {
    console.log("generatePDFDocument: "+names.current)
    const blob = await pdf(
      <MyDoc qnames={names.current} />
    ).toBlob();
    return (URL.createObjectURL(blob))
    //window.open(URL.createObjectURL(blob));
  
    //console.log(blob);
  };
  





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
      <button onClick={()=>{fetchAll()}}>
        export report
      </button>
    </a>
    </div>
  );


}


export default App;