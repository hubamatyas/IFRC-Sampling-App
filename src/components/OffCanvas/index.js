import React,{ useState } from "react";
import styles from "./styles.module.scss";
import { definitions } from "../Definitions";

// const openBtn = document.querySelector('.open-btn');
// const closeBtn = document.querySelector('.close-btn');
// const offcanvas = document.querySelector('.offcanvas');

// open off-canvas menu
// openBtn.addEventListener('click', function() {
//   offcanvas.classList.add('open');
// });

// close off-canvas menu
// closeBtn.addEventListener('click', function() {
//   offcanvas.classList.remove('open');
// });

{/* <u onclick={()=>{offcanvas.classList.add('open');}}>terminology</u> */}


function OffCanvas({terminology}) {

    const [isActive, setIsActive] = useState(false);
    const openCanvas = () => {
        setIsActive(true);
    }
    const closeCanvas = () => {
        setIsActive(false);
    }
    

    return (
        <div>
            <u onClick={openCanvas}>{terminology}</u>

            <div className={isActive? styles.offcanvasOpen: styles.offcanvas}>
                {/* <div className={styles.offcanvasInner}> */}
                <button className={styles.closeBtn} onClick={closeCanvas}>
                    &times;
                </button>
                <div className={styles.offcanvasContent}>
                    <h2 className={styles.offcanvasHeader}>{terminology}</h2>
                    <div>{definitions[terminology]}</div>
                </div>
                {/* </div> */}
            </div>
        </div>
    )
}

export default OffCanvas;