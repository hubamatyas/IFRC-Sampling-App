import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import ArrowSvg from "../../assets/arrow.svg";

type Props = {
  hasArrow?: boolean,
  [key: string]: React.ReactNode,
}

function Card({ hasArrow = true, ...props }: Props): JSX.Element {
    const [arrow, setArrow] = useState<boolean>(true);

    useEffect(() => {
        setArrow(hasArrow !== undefined ? hasArrow : true);
    }, [hasArrow]);

    return (
        <>
            <section className={styles.card}>
                {Object.keys(props).map((key: string) => (
                    <div key={key}>
                        {props[key]}
                    </div>
                ))}
            </section>
            {arrow && <img src={ArrowSvg} className={styles.arrow} alt="arrow" />}
        </>
    )
}

export default Card;
