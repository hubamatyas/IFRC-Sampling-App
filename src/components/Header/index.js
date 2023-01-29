import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const Header = ({title, text}) => (
    <section className={styles.section}>
        <div className={styles.title}> {title} </div>
        <div> {text} </div>
    </section>
);

export default Header;