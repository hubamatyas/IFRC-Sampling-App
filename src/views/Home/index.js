import React from "react";
import styles from "./styles.module.scss";
import Header from "../../components/Header/index";
import { Link } from "react-router-dom";

const Home = () => (
    <div className={styles.container}>
        <div className={styles.intro}>
            <Header
                title="IFRC Community Sampling Tool"
                text="The IFRC Community Sampling Tool is a web-based application that allows users to create and manage sampling plans for community-based surveys. The tool is designed to be used by IFRC staff and partners to support the implementation of the IFRC Monitoring and Evaluation Framework."
            />
        </div>
        <div className={styles.teaser}>
            <Header
                title="Features"
                text="The features of the tool include: 1) the ability to create sampling plans for community-based surveys; 2) the ability to manage sampling plans; 3) the ability to generate sampling frames; 4) the ability to generate sampling lists; 5) the ability to generate sampling reports; and 6) the ability to generate sampling maps."
            />
        </div>
    </div>
);

export default Home;