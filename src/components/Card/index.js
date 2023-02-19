import React, { useState } from "react";
import styles from "./styles.module.scss";
import arrow from "../../assets/arrow.svg";

function Card(props){
    let hasArrow = true;
    if (props.hasArrow === false) {
        hasArrow = false;
    }

    return (
        <>
            <section className={styles.card}>
                {Object.keys(props).map((key) => (
                    <div key={key}>
                        {props[key]}
                    </div>
                ))}
            </section>
            {hasArrow && <img src={arrow} className={styles.arrow}/>}
        </>
    )
}

export default Card;