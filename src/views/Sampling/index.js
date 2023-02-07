import React from "react";
import styles from "./styles.module.scss";
// import lang from "../../lang.js"
// import { useTranslation } from "react-i18next";
import DecisionTree from "../../components/DecisionTree/index";
import Terminology from "../../components/Terminology/index.js";

export default function App() {

  return (
    <div>
    <div className={styles.intro}>
      <h1>Surveying Tool</h1>
      <p >    
        In a survey, we want to know certain characteristics of a large population, but we are almost never able to do a complete census of it. So we draw a sample a subset of the population and collect data on it. Then we generalize the results,
        with an allowance for <Terminology word="sampling error"/>(usually within 5% at 95% confidence level), to the entire population from which the sample was selected. If we interview people in a “convenience” sample—whoever easy to find—we 
        cannot calculate the sampling error or quantify possible selection bias. This reduces the value of a survey to a qualitative study, where the results are limited to the respondents themselves, and therefore are only indicative and not 
        representative of the target population. To have confidence in generalizing sample results to the target population requires 
        a <Terminology word="probability sample"/> of the population (i.e., everyone’s probability of being selected is known).
      </p>
    </div>

      <br/>
        <DecisionTree />
    </div>
  );
}