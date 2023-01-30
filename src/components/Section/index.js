import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const Section = ({title, subtitle, ...text}) => (
    <section className={styles.section}>
        <div className={styles.title}> {title} </div>
        <div className={styles.subtitle}> {subtitle} </div>
        {Object.values(text).map((text, index) => (
            <div key={index} className={styles.text}> {text} </div>
        ))}
    </section>
);

export default Section;