import {pdf} from '@react-pdf/renderer';
import styles from "./styles.module.scss";
import React, {useRef,useState} from "react";
import { IoMdDownload } from 'react-icons/io';
import MyDoc from '../ReportDocument';
import {calculatorInputs, calculatorOutputs, subgroupsType, sampleSizeType} from "../../types/calculatorResponse";
import Alert from "../Alert";

interface ExportProps {
  notes?:string|null,
  questionCards: number[],
  calculatorInputs: calculatorInputs,
  calculatorOutputs: calculatorOutputs,
  subgroupSizes: subgroupsType,
}

interface Option {
  id: number;
  name: string;
  child_state: number;
}

const App: React.FC<ExportProps> = ({
  notes,
  questionCards,
  calculatorInputs,
  calculatorOutputs,
  subgroupSizes,
  },

) => {

  const questionNames = useRef<string[]>([]);
  const options = useRef<Option[]>([]);
  const answers = useRef<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchedNum, setFetchedNum] = useState<number>(0);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const fetchState = async(id:number) => {
    let success = true
    await fetch('https://ifrc-sampling.azurewebsites.net/api/decision-tree/'+id+'/')
      .then(response => response.json())
      .then(data =>{
        questionNames.current.push(data.state.name);

        if (options.current.length) {
          answers.current.push (
            options.current.find((opt)=>(opt.child_state === id))!.name
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
          calculatorInputs={calculatorInputs}
          calculatorOutputs={calculatorOutputs}
          subgroupSizes={subgroupSizes}
          notes={notes}
        />
      ).toBlob();
      console.log("PDF generated.")
      return (URL.createObjectURL(blob));
    }
    
    catch(err) {
      setShowAlert(true);
      return null;
    }

  };

  const handleClick = async() => {
    setShowAlert(false);
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
          " Export now!"
        }
      </button>

      {showAlert && 
      <Alert 
        onClose={()=>setShowAlert(false)} 
        text="Export failed." 
        type="error"/>
      }

    </div>
  );
}


export default App;