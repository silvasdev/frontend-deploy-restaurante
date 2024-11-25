
import logoImg from '../../../public/logoimage.png'

import styles from '../../app/page.module.scss'
import Link from 'next/link'

import Image from 'next/image'

import {api} from "@/services/api"
import { redirect } from 'next/navigation'


async function HandleRegister(formdata: FormData){
  "use server"

  const name =formdata.get("name")
  const email =formdata.get("email")
  const password =formdata.get("password")
 
   if(name === "" || email === "" || password === ""){
    return;
   }
   try{
    await api.post('/users', {
      name,
      email,
      password
    })
   }catch{

   }

   redirect("/")
}



export default function Signup(){
  return (
   <div className={styles.ContainerCenter}>

    <div className={styles.sidebar}>

        <section className={styles.welcome}>
          <h1>Olá, vc esta na pagina de cadastro!</h1>
          <p>faça aqui o seu cadastro e o seu pedido</p>
          
          <Link href="/" className={styles.link}>Já tem uma conta? clique aqui para acessa sua conta!</Link>
        </section>

    </div>

    <div> 
                
      <section className={styles.signup}>

        <div className={styles.logos}>

          <Image 
            src={logoImg}
            alt='logo Hotelaria'
          />

        </div>
        <form action={HandleRegister}>

        <input type="text" required name='name' placeholder='Digite aqui seu nome.....' className={styles.input} />

          <input type="text" required name='email' placeholder='Digite aqui seu email.....' className={styles.input} />

          <input type="text" required name='password' placeholder='Digite Aqui a sua senha.....' className={styles.input} />

          <button type='submit' className={styles.button}>Cadastrar</button>

        </form>


      </section>
    </div>

   </div>

  )
}


