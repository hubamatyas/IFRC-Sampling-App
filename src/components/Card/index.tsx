import React, { useState, useEffect } from "react";
import { _cs } from "@togglecorp/fujs";

import styles from "./styles.module.scss";

import ArrowSvg from "../../assets/arrow.svg";

type Props = {
  hasArrow?: boolean,
  hasPulse?: boolean,
  [key: string]: React.ReactNode,
}

function Card({ hasArrow = true, hasPulse, ...props }: Props): JSX.Element {
    const [arrow, setArrow] = useState<boolean>(true);

    useEffect(() => {
        setArrow(hasArrow !== undefined ? hasArrow : true);
    }, [hasArrow]);

    return (
        <>
            <section className={_cs(
                styles.card,
                hasPulse && styles.pulse,
            )}>
                {Object.keys(props).map((key: string) => (
                    <div key={key}>
                        {props[key]}
                    </div>
                ))}
            </section>
            {arrow && <img src={ArrowSvg} className={styles.arrow}/>}
        </>
    )
}

export default Card;
