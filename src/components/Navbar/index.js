import React, { useState } from "react";
import styles from "./styles.module.scss";
import logo from "../../assets/logo.svg";
import MobileNavbar from "../MobileNavbar";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";


function Navbar(){
    const [isOpen, setIsOpen] = useState(false);
    let mobileNav

    if (isOpen) {
        mobileNav = ( <MobileNavbar/> )
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.bar}>
                    <div>
                        <Link to="/">
                            <li className={styles.logo}>
                                <img src={logo} alt="logo" />
                            </li>
                        </Link>
                    </div>
                    <div className={styles.navlinks}>
                        <Link to="/">
                            <li className={styles.link}>Home</li>
                        </Link>
                        <Link to="/sampling">
                            <li className={styles.link}>Sampling</li>
                        </Link>
                        <Link to="/resources">
                            <li className={styles.link}>Resources</li>
                        </Link>
                        <Link to="/about">
                            <li className={styles.link}>About</li>
                        </Link>
                    </div>
                    <button className={styles.navBtn} onClick={() => setIsOpen(!isOpen)}>
                        <FiMenu size={40} className={styles.burger}/>
                    </button>
                </div>
            </header>
            <div onClick={() => setIsOpen(false)}>
                { mobileNav }
            </div>
        </>
    )
}

export default Navbar;