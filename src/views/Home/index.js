import React from "react";
import styles from "./styles.module.scss";
import Section from "../../components/Section/index";
import Button from "../../components/Button/index";
import { Link } from "react-router-dom";

const Home = () => (
    <>
        <div className={styles.intro}>
            <h1>IFRC Community Sampling Tool</h1>
            <p>The tool is designed to be used by IFRC staff and partners to support the implementation of the IFRC Monitoring and Evaluation Framework.</p>
            <p>The Red Cross Red Crescent runs community surveys in nearly all their programming. It is critical for understanding the views of affected populations, and how effective programmes are.</p>
            <p>It is critical for understanding the views of affected populations, and how effective programmes are. Often times, country-level teams do not have technical expertise in sampling.</p>
            <Button
                text="Get Started"
                link="/sampling"
                style="default"
            />
        </div>
        <div className={styles.features}>
            <h1>Features</h1>
            <p>An intuitive tool that can guide as well as educate the IFRC volunteers via informational sections throughout the sampling process.</p>
            <h2>The features of the tool include:"</h2>
            <ul>
                <li>the ability to create sampling plans for community-based surveys;</li>
                <li>the ability to manage sampling plans;</li>
                <li>the ability to generate sampling frames;</li>
            </ul>
        </div>
        <div className={styles.howto}>
            <h1>How to use the tool</h1>
            <Button
                    text="Get Started"
                    link="/sampling"
                    style="inverse"
            />
        </div>
    </>
);

export default Home;