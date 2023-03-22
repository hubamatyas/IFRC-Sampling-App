import React,{ useState } from "react";

import styles from "./styles.module.scss";

import Definitions from "../Definitions";

/**
 * Renders an OffCanvas component displaying the definition of a given terminology
 * @param {Object} props - The component props
 * @param {string} props.terminology - The terminology to display the definition of
 * @returns {JSX.Element} - The rendered OffCanvas component
*/

function OffCanvas({terminology}) {
    const [isActive, setIsActive] = useState(false);
    const openCanvas = () => {
        setIsActive(true);
    }
    const closeCanvas = () => {
        setIsActive(false);
    }
    
    const definitions = Definitions();
    const content = definitions[terminology.toLowerCase()].props.children;
    
    return (
        <>
            <span onClick={openCanvas} className={styles.term}><u>{terminology}</u><sup>&#9432;</sup></span>
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