import React from "react";
import styles from "./styles.module.scss";
import Button from "../../components/Button/index";
import lang from "../../lang.js"
import { definitions } from "../../components/Definitions/index";
import { useTranslation } from "react-i18next";
import ShowMore from "../../components/ShowMore";


function Resources(){
    const { t } = useTranslation();

    // log all the keys and values in the definitions object in one line
    console.log(Object.entries(definitions)[0]);

    return (
        <>
            <div className={styles.intro}>
                <h1 className={styles.title}> Browse terms and defintions to learn more about sampling.</h1>
                <p className={styles.introText}> Find more information about sampling approaches, technical terms and external resources to explore sampling.</p>
            </div>
            <div className={styles.resources}>
                {
                    Object.entries(definitions).map((key) => (
                        // capitalize the first letter of the key
                        <ShowMore
                            title={key[0].charAt(0).toUpperCase() + key[0].slice(1)}
                            content={key[1]}
                        />
                    ))
                }
            </div>
        </>
    );
}

export default Resources;