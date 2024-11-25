
"use client"
import Link from "next/link";
import Image from "next/image"
import styles from "./styles.module.scss"
import LogoImage from '/public/logoimage.png'
import {LogOutIcon} from "lucide-react"
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export  function Header(){

    const router = useRouter();

    async function handleLogout(){
        deleteCookie("session", {path: "/"});

        toast.success("voçê saiu!")

        router.replace("/");
}
    


    return(
        <header className={styles.HeaderContainer}>

            <div className={styles.HeaderContent}>

                <Link href="/painel">

                <Image 
                 
                 alt="logo" 
                 src={LogoImage}
                 width={130}
                 height={130}
                 priority={true}
                 quality={100}
                 />
                
                
                </Link>
                

                 <nav>
                    <Link href="painel/category">categoria</Link>
                    <Link href="/painel/product">produto</Link>

                    <form action={handleLogout}>
                        <button type="submit">
                            <LogOutIcon size={24} />
                        </button>
                    </form>
                 </nav>
            </div>


        </header>
    )
}