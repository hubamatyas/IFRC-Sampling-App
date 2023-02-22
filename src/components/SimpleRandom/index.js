import React, { useState } from "react";
import styles from "./styles.module.scss";
import { withTranslation } from "react-i18next";
import Card from "../Card";
import ExportButton from "../ExportButton";
import Terminology from "../Terminology";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

class SimpleRandom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            marginOfError: null,
            confidenceLevel: null,
            nonResponseRate: null,
            households: null,
            individuals: null,
            sampleSize: null,
            subgroups: [this.createSubgroup()],
            hasSubroups: props.hasSubroups,
            hasHouseholds: props.hasHouseholds,
            hasIndividuals: props.hasIndividuals,
            loadedSubgroups: false,
        };
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            marginOfError: event.target.margin.value,
            confidenceLevel: event.target.confidence.value,
            nonResponseRate: event.target.response.value,
            households: event.target.households ? event.target.households.value : null,
            individuals: event.target.individuals ? event.target.individuals.value : null,
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
    
    createSubgroup = () => {
        const x = Math.random();
        return (
            <div className={styles.field}>
                <label for="margin"> Group {x}</label>
                <div className={styles.subgroup}>
                    <input type="number" id="margin" name="margin" required />
                    <button
                        className={styles.newRow}
                        onClick={(e) => this.removeSubgroup(e)}>
                        <AiOutlineMinus/>
                    </button>
                    <button
                        className={styles.newRow}
                        onClick={(e) => this.addSubgroup(e)}>
                        <AiOutlinePlus/>
                    </button>
                </div>
            </div>
        );
    }

    addSubgroup = (event) => {
        event.preventDefault();
        if (this.state.subgroups.length >= 10) {
            return;
        }
        this.setState({
            subgroups: [...this.state.subgroups, this.createSubgroup()]
        });
    }

    removeSubgroup = (event) => {
        event.preventDefault();
        if (this.state.subgroups.length === 1) {
            return;
        }

        this.setState({
            subgroups: this.state.subgroups.slice(0, -1)
        });
    }

    handleSubgroupSubmit = (event) => {
        event.preventDefault();
        // get all the numbers from the input fields and console.log them
        for (let i = 0, len = event.target.length; i < len; i++) {
            if (event.target[i].value) {
                console.log(event.target[i].value)
            }
        }
        this.setState({
            loadedSubgroups: true
        })
    }

    render() {
        const { t } = this.props;
        console.log(this.state.hasHouseholds, this.state.hasIndividuals, this.state.hasSubroups)
        return (
            <>
                {this.state.hasSubroups && !this.hasHouseholds &&
                    <Card>
                    <h2> <Terminology term="sub-population groups" text="Identify sub-population groups" /></h2>
                    <form onSubmit={(e) => this.handleSubgroupSubmit(e)}>
                        {this.state.subgroups.map((subgroup) => (
                            <>{subgroup}</>
                        ))}
                        <div className={styles.calculate}>
                            <input type="submit" className={styles.btn} />
                        </div>
                    </form>
                    </Card>
                }
                {(this.state.hasHouseholds
                || (this.state.hasIndividuals && this.state.loadedSubgroups
                || (this.state.hasIndividuals && !this.state.hasSubroups))) &&
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
                            {this.state.hasHouseholds &&
                                <div className={styles.field}>
                                    <label for="households"> Number of households </label>
                                    <input type="number" id="households" name="households" placeholder="" />
                                </div>
                            }
                            {this.state.hasIndividuals && !this.state.hasSubroups &&
                                <div className={styles.field}>
                                    <label for="individuals"> Number of individuals </label>
                                    <input type="number" id="individuals" name="individuals" placeholder="" />
                                </div>
                            }
                            <div className={styles.calculate}>
                                <input type="submit" className={styles.btn} />
                            </div>
                        </form>
                    </Card>
                }
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