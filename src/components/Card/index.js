import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import arrowSvg from "../../assets/arrow.svg";

function Card({ hasArrow, ...props }){
    const [arrow, setArrow] = useState(true);

    useEffect(() => {
        setArrow(hasArrow !== undefined ? hasArrow : true);
    }, []);

    return (
        <>
            <section className={styles.card}>
                {Object.keys(props).map((key) => (
                    <div key={key}>
                        {props[key]}
                    </div>
                ))}
            </section>
            {arrow && <img src={arrowSvg} className={styles.arrow}/>}
        </>
    )
}

export default Card;