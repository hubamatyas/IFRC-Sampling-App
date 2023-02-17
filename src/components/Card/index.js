import React, { useState } from "react";
import styles from "./styles.module.scss";

function Card(props){

    return (
        <section className={styles.card}>
            {Object.keys(props).map((key) => (
                <div key={key}>
                    {props[key]}
                </div>
            ))}
        </section>
    )
}

export default Card;