import React, { FormEvent, ReactNode } from "react";
import styles from "./styles.module.scss";
import { _cs } from "@togglecorp/fujs";

function Input({ ...props }){

  return (
    <>
        {
            Object.keys(props).map((key) => (
                <div key={key} className={styles.field}>
                    {props[key]}
                </div>
            ))
        }
    </>
  );
}

export default Input;
