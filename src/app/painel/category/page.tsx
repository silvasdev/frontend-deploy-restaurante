
import { redirect } from "next/navigation"
import { Button } from "../components/button"
import styles from "./style.module.scss"

import { getCookieServer} from "@/lib/cookieServer"

import { api } from "@/services/api"


export default function Category(){

    async function handleRegisterCategory( formdata: FormData){
        "use server"

        const name = formdata.get("name")

        if(name === "") return;

        const data = {
            name: name
        }

        const token = await getCookieServer();

        await api.post("/category", data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        .catch((err) => {
            console.log(err)
            return;
        })

        redirect("/painel")
    }

    return(

        <main className={styles.container}>
            <h1>Nova Categoria</h1>

            <form action={handleRegisterCategory} className={styles.form}>

                <input 
                className={styles.input}
                type="text" 
                name="name"
                placeholder="Nome da categoria, ex: Alacarte"
                required
                />
                <Button name="Cadastrar"/>
            </form>
        </main>
    )
}