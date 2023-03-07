import React,{ useState } from "react";
import styles from "./styles.module.scss";
import { definitions } from "../Definitions";

function OffCanvas({terminology}) {
    const [isActive, setIsActive] = useState(false);
    const openCanvas = () => {
        setIsActive(true);
    }
    const closeCanvas = () => {
        setIsActive(false);
    }
    const content = definitions[terminology].props.children;
    
    return (
        <>
            <u onClick={openCanvas}>{terminology}</u>
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