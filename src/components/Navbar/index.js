import React from "react";
import styles from "./styles.module.scss";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => (
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
        </div>
    </header>
);

export default Navbar;