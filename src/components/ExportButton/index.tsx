import ExportNowButton from './ExportNowButton';
import {calculatorInputs, calculatorOutputs, subgroupsType, sampleSizeType, communityInfoType} from "../../types/calculatorResponse";
import styles from "./styles.module.scss";
import React, {useRef,useState,useEffect} from "react";
import { IoMdDownload } from 'react-icons/io';
import Card from "../../components/Card";
import ArrowSvg from "../../assets/arrow.svg";

/**
@fileoverview This module provides a button that allows the user to export the
report as a PDF. It exports a React functional component that renders a button
that, when clicked, displays a textarea for the user to enter any notes they want
to add to the report. The user can also choose to not add any notes. The component
also renders a button that, when clicked, dynamicly generate the PDF.
@module ExportButton
*/

interface ExportProps {
    questionCards: number[],
    calculatorInputs: calculatorInputs,
    calculatorOutputs: calculatorOutputs,
    subgroupSizes?: subgroupsType,
    communityInfo?:communityInfoType | null,
  }

const App: React.FC<ExportProps> = ({
    questionCards,
    calculatorInputs,
    calculatorOutputs,
    subgroupSizes=null,
    communityInfo=null,
    },
  
  ) => {

    const [clicked, setclicked] = useState<boolean>(false);
    const [hasNote, setHasNote] = useState<boolean>(true);
    const [note, setnote] = useState<string>("");

    useEffect(() => {
      setclicked(false);
      setnote("");
    }, [questionCards, calculatorInputs, calculatorOutputs, subgroupSizes]);

    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setnote(e.target.value);
    }

    return (

      <div>
        <button 
          style={{display:clicked?"none":"inline"}} 
          className={styles.exportBtn} 
          onClick={()=>{setclicked(true)}}
          data-cy="exportBtn"
        >
          <IoMdDownload />Export report
        </button>

        <div style={{display:clicked?"inline":"none"}}>
          <img src={ArrowSvg} className={styles.arrow}/>
          <Card hasArrow={false} >
            <div className={styles.noteCard}>
              <h3>  Any notes to add to the report? </h3>
              
              <div className={styles.radioBtns}>
                <input 
                  type="radio" 
                  name="haveNotes" 
                  value="Yes" 
                  className={styles.radioBtn}
                  onChange={()=>{setHasNote(true)}}
                  defaultChecked
                />
                <label style={{marginRight:"10px"}}>Yes</label>
                <input 
                  type="radio" 
                  name="haveNotes" 
                  value="No" 
                  className={styles.radioBtn}
                  onChange={()=>{setHasNote(false)}}
                />
                <label style={{marginRight:"10px"}}>No</label>
              </div>

              <textarea 
                style={{display:hasNote?"inline":"none"}}
                className={styles.noteArea}
                maxLength={400}
                placeholder="400 charactors maximum..." 
                rows={4} 
                cols={60} 
                onChange={handleNoteChange} 
              />
              
              <ExportNowButton
                questionCards={questionCards}
                calculatorInputs={calculatorInputs}
                calculatorOutputs={calculatorOutputs}
                subgroupSizes={subgroupSizes}
                communityInfo={communityInfo}
                notes={hasNote?note:null}
              />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  
  
  export default App;