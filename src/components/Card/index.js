import React,{useEffect} from "react";
import styles from "./styles.module.scss";

function Card(props) {
    return (
        <div className={styles.card}>
            <h1> {props.title} </h1>
            {props.children.map((child) => (
                <div key={child.id}>
                    {child}
                </div>
            ))}
        </div>
    );
}

export default Card;
