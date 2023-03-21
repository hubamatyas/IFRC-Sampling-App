import React,{useState} from "react";
import styles from "./styles.module.scss";
import {IoWarningOutline} from 'react-icons/io5';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import {FiAlertTriangle} from 'react-icons/fi';
import {CgCheckO} from 'react-icons/cg';

function Alert({text, type, onClose}) {
    let AlertStyle

    switch (type) {
        case "warning":
            AlertStyle = styles.warningAlert
            break;
        case "error":
            AlertStyle = styles.errorAlert
            break;
        case "success":
            AlertStyle = styles.successAlert
            break;
        default:
            AlertStyle = styles.infoAlert
            break;
    }

    return (
        <div className={AlertStyle}>
            <span className={styles.icon}>
                {type === "warning" ?
                    <IoWarningOutline size="24px" /> : null}
                {type === "error" ?
                    <FiAlertTriangle size="24px" /> : null}
                {type === "info" ?
                    <AiOutlineInfoCircle size="24px" /> : null}
                {type === "success" ?
                    <CgCheckO size="24px" /> : null}
            </span>
            <span className={styles.alertText}>{text}</span>
            <span className={styles.closebtn} onClick={onClose}>
                &times;
            </span> 
        </div>
    );
}

export default Alert;