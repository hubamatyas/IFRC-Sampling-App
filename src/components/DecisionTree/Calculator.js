import React, { useState } from "react";
import NumberInput from "../NumberInput";
import Button from "../Button/index";
import Terminology from "./Terminology";

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
          <p style={{ fontWeight: 'bold', fontSize: '25px' }}> Sample size Calculator</p>
          <div style={{
          display:"flex",
          justifyContent: 'center', 
          alignItems: 'center' ,
          flexDirection: 'column' 
            }}>
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

          <p style={{ fontWeight: 'bold', fontSize: '25px' }}>Sample size:</p>
        <h id="sampleSize" style={{ fontWeight: 'bold', fontSize: '35px',color: '#f5333f'  }}>{sampleSize}</h>
        </div>
      );
    
}