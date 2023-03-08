import React,{ useState } from "react";
import styles from "./styles.module.scss";
import { definitions } from "../Definitions";
// import an fa icon that has a question mark


function OffCanvas({terminology}) {
    const [isActive, setIsActive] = useState(false);
    const openCanvas = () => {
        setIsActive(true);
    }
    const closeCanvas = () => {
        setIsActive(false);
    }
    
    // catch the error if the terminology is not found in the definitions
    const content = definitions[terminology.toLowerCase()].props.children;
    
    return (
        <>
            <span onClick={openCanvas} className={styles.term}>{terminology}</span>
            <sup onClick={openCanvas}>&#9432;</sup>
            <div className={isActive? styles.open: styles.default}>
                <button className={styles.closeBtn} onClick={closeCanvas}>
                    &times;
                </button>
                <h3 className={styles.title}>{terminology.charAt(0).toUpperCase() + terminology.slice(1)}</h3>
                <div className={styles.content}>{content}</div>
            </div>
        </>
    )
}

export default OffCanvas;