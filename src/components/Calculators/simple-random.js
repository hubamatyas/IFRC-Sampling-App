import React, { useState } from "react";
import NumberInput from "../NumberInput";
import Button from "../Button/index";
import Terminology from "../Terminology";
import styles from "./styles.module.scss";

export const Calculator = () => {

    const [population, setPopulation] = useState(1000);
    const [confidenceLevel, setConfidenceLevel] = useState(95);
    const [marginOfError, setMarginOfError] = useState(5);
    const [sampleSize, setSampleSize] = useState(0);
  
    const calculateSampleSize = () => {
      let zScore = 0;
    
      switch (confidenceLevel) {
        case 99:
          zScore = 2.576;
          break;
        case 95:
          zScore = 1.96;
          break;
        case 90:
          zScore = 1.64;
          break;
        default:
          console.log("Invalid confidence level. Using 95% as default.");
          zScore = 1.96;
      }
    
      let numerator = (zScore ** 2) * population;
      let denominator = ((marginOfError ** 2) * (population - 1)) + (zScore ** 2);
      setSampleSize(Math.ceil(numerator / denominator));
    };

    return (
        <div>
          <br></br>
          <h1>Simple Random Sampling</h1>
          <h2 style={{ fontWeight: 'bold', fontSize: '25px' }}> Sample Size Calculator</h2>
          <div className={styles.formInputs}>
          <NumberInput
              label="Population Size:"
              type="number"
              id="population"
              value={population}
              onChange={e => setPopulation(e.target.value)}
              autoFocus
          >
          </NumberInput>
          <br></br>
          <NumberInput
              label={<Terminology word="Confidence Level"/>}
              type="number"
              id="confidencelevel"
              value={confidenceLevel}
              onChange={e => setConfidenceLevel(e.target.value)}
              autoFocus
          >
          </NumberInput> 
          <br></br>
          <NumberInput
              label={<Terminology word="Margin of Error"/>}
              type="number"
              id="MarginofError"
              value={marginOfError}
              onChange={e => setMarginOfError(e.target.value)}
              autoFocus
          >
          </NumberInput> 
          
          <br></br>
          
          <Button
            variant={"secondary"}
            onClick={calculateSampleSize}
                
          >
            SUBMIT
          </Button>
          <br></br>
          </div>

          <p className={styles.sampleSizeText}>Sample size:</p>
        <h className={styles.sampleSizeNumber}>{sampleSize}</h>
        </div>
      );
    
}