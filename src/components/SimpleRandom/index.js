import React, { useState } from "react";
import styles from "./styles.module.scss";
import { withTranslation } from "react-i18next";
import Card from "../Card";
import ExportButton from "../ExportButton";
import Terminology from "../Terminology";

class SimpleRandom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            marginOfError: null,
            confidenceLevel: null,
            nonResponseRate: null,
            subgroups: null,
            households: null,
            individuals: null,
            sampleSize: null,
            // hasSubroups: false,
            // hasHouseholds: false,
            // hasIndividuals: false,
            // conditionally render these fields in the form
            // they should be passed down to SimpleRandom as props
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.calculateSampleSize = this.calculateSampleSize.bind(this);
    }
    

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            marginOfError: event.target.margin.value,
            confidenceLevel: event.target.confidence.value,
            nonResponseRate: event.target.response.value,
            subgroups: event.target.subgroups.value,
            households: event.target.households.value,
            individuals: event.target.individuals.value,
        }, () => {
            this.calculateSampleSize();
        }
        );
    }

    calculateSampleSize() {
        // call API to calculate sample size
        this.setState(
            { sampleSize: 50 }
        )
    }
        

    render() {
        const { t } = this.props;
        return (
            <>
                <Card>
                    <h2> <Terminology term="simple random" text="Simple Random Calculator" /></h2>
                    <form className={styles.inputFields} onSubmit={(e) => this.handleSubmit(e)}>
                        <div className={styles.field}>
                            <label for="margin"> Margin of error (%)</label>
                            <input type="number" id="margin" name="margin" placeholder="5" />
                        </div>
                        <div className={styles.field}>
                            <label for="confidence"> Confidence level (%)</label>
                            <select id="confidence" name="confidence" >
                                <option value="95">95</option>
                                <option value="99">99</option>
                                <option value="90">90</option>
                                <option value="85">85</option>
                                <option value="80">80</option>
                            </select>
                        </div>
                        <div className={styles.field}>
                            <label for="response"> Non-response rate (%)</label>
                            <input type="number" id="response" name="response" placeholder="0" />
                        </div>
                        <div className={styles.field}>
                            <label for="subgroups"> Number of subgroups </label>
                            <input type="number" id="subgroups" name="subgroups" placeholder=""/>
                        </div>
                        <div className={styles.field}>
                            <label for="households"> Number of households </label>
                            <input type="number" id="households" name="households" placeholder="" />
                        </div>
                        <div className={styles.field}>
                            <label for="individuals"> Number of individuals </label>
                            <input type="number" id="individuals" name="individuals" placeholder="" />
                        </div>
                        <div className={styles.calculate}>
                            <input type="submit" className={styles.btn} />
                        </div>
                    </form>
                </Card>
                {this.state.sampleSize &&
                    <div className={styles.result}>
                        <Card hasArrow={false}>
                            <h2> Sample Size: {this.state.sampleSize} </h2>
                            <p> {t('aboutGoal')}{t('aboutGoal')}{t('aboutGoal')}{t('aboutGoal')}{t('aboutGoal')}</p>
                        </Card>
                        <ExportButton questionCards={this.props.questionCards} calculatorState={this.state}/>
                    </div>
                }
            </>
        )
    }
}

export default withTranslation()(SimpleRandom);