import React from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

function Button({text, link, style}) {
    let buttonClass
    let textClass

    switch (style) {
        case "inverse":
            buttonClass = styles.inverse
            textClass = styles.inverseText
            break;
        default:
            buttonClass = styles.default
            textClass = styles.defaultText
            break;
    }

    return (
        <div className={styles.button}>
            <button className={ buttonClass }>
                <Link
                    className={ textClass }
                    to={ link }>
                    { text }
                </Link>
            </button>
        </div>
    );
}

export default Button;