import React from "react";
import styles from "./styles.module.scss";

function Button({children, ...props}) {
    return (
        <button
            tabIndex="0"
            className={`button button--${props.size} button--${props.type}`}
            {...props}
        >
            {props.icon === 'download' ? (
                <span className='f-icon-download font-size-sm spacing-half-r'></span>
            ) : null}
            {props.icon === 'back' ? (
                <span className='f-icon-chevron-left font-size-sm spacing-half-r'></span>
            ) : null}
            {props.icon === 'down' ? (
                <span className='underline f-icon-arrow-down'></span>
            ) : null}

            {props.text}

            {props.icon === 'dropdown' ? (
                <span className="f-icon-sm-triangle-down spacing-half-l"></span>
            ) : null}

        </button>
    );
}

export default Button;