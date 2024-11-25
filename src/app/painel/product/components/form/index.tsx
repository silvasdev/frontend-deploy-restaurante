"use client"

import { ChangeEvent, useState } from "react"
import styles from "./style.module.scss"
import { Button } from "@/app/painel/components/button"
import { api } from "@/services/api"
import { getCookieClient } from "@/lib/cookieClient"
import {useRouter} from "next/navigation"

import {toast} from "sonner"

import { UploadCloud } from "lucide-react"
import Image  from "next/image"


interface CategoryProps{
    id: string,
    name: string
}

interface Props{
    categories: CategoryProps[]
}



export function Form({categories}: Props){

    const router = useRouter();

    const [image, setImage] = useState<File>()

    const [previewImage, setPreviewImage ] = useState("");

async function HandleRegisterProduct(formdata: FormData){

    const categoryIndex = formdata.get("category")

    const name = formdata.get("name")
    const price = formdata.get("price")
    const description = formdata.get("description")

    if(! name || !categoryIndex || !price || !description || !image){
        toast.warning("todos os campos são obrigatorios!")
        return;
    }

   const data = new FormData();

   data.append("name", name);
   data.append("price", price);
   data.append("description", description);
   data.append("category_id", categories[Number(categoryIndex)].id);
   data.append("file", image);


   const token = await getCookieClient();
     
   await api.post("/product", data, {
    headers:{
        Authorization: `Bearer ${token}`
    }
   })
   .catch((err) => {
    console.log(err)
    toast.warning("falhar ao cadastrar esse produto!")
    return;
   })

   toast.success("Produto cadastrado com sucesso!")

   router.push("/painel")


}



    async function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0]

            if(image.type !== "image/png" && image.type !== "image/jpeg"){
                toast.warning("formato de imagem não permitido, use arquivo (png) ou (jpeg)!")
                return;
            }
            
            setImage(image);
            setPreviewImage(URL.createObjectURL(image));
            
        }
    }

    return(
        <main className={styles.container}>

            <h1>Novo Produto</h1>

            <form className={styles.form} action={HandleRegisterProduct}>

                <label className={styles.labelImage}>
                    <span>
                        <UploadCloud  size={30}  color="#fff" />
                    </span>

                    <input type="file"
                        accept="image/png, image/jpeg"
                        required
                        onChange={handleFile}
                        />

                        {previewImage && (
                            <Image
                                alt="imagem de preview"
                                src={previewImage}
                                className={styles.preview}
                                fill={true}
                                quality={100}
                                priority={true}
                            />
                        )}

                </label>

                <select name="category">
                   {categories.map((Category, index) => (
                        <option key={Category.id} value={index}>
                            {Category.name}
                        </option>
                   ))}
                </select>

                <input
                     type="text" 
                     name="name"
                     placeholder="Digite o nome do produto"
                     required
                     className={styles.input}
                     />

                     
                <input
                     type="text" 
                     name="price"
                     placeholder="Preço do produto"
                     required
                     className={styles.input}
                     />

                     <textarea 
                        name="description"
                        className={styles.input}
                        required
                        placeholder="Descrição do produto"
                        ></textarea>

                    <Button name="Cadastrar Produto"/>

            </form>

            

        </main>
    )

}