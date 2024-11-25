"use client"
import styles from "./style.module.scss"

import { useFormStatus } from "react-dom";

interface Props{
    name: string;
}

export function Button({name}: Props){

    const {pending} = useFormStatus();

    return(
        <button type="submit" 
            disabled={pending} 
            className={styles.button}>
            {pending ? "carregando....." : name}
        </button>
    )
}