import logoImg from '../../public/LogoRestaurante1_processed.png'

import styles from '../app/page.module.scss'
import Link from 'next/link'

import Image from 'next/image'

import { api } from '@/services/api'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'


async function HandleLogin(formdata: FormData){
"use server"

  const email = formdata.get('email')
  const password = formdata.get('password')

    if(email === "" || password === ""){
      return;
    }

    try{

     const response = await api.post("/session", {
      email,
      password
     })

     if(!response.data.token){
      return;
     }

     console.log(response.data)

     const expresstime = 60 * 60 * 24 * 30 * 1000
     const cookieStore = await cookies();

     cookieStore.set("session", response.data.token, {
        maxAge: expresstime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
     })

    }catch(err){

      console.log('error')
      console.log(err)
      return;
    }

    
    redirect("/painel")
    

}


export default function Home(){
  return (
   <div className={styles.ContainerCenter}>

    <div className={styles.sidebar}>

        <section className={styles.welcome}>
          <h1>Seja bem vindo !</h1>
          <p>faça login para fazer seus pedidos, pratico e rapido</p>
          
          <Link href="/signup" className={styles.link}>Não tem uma conta? Cadastre-se aqui!</Link>
        </section>

    </div>

    <div> 
                
      <section className={styles.login}>

        <div className={styles.logo}>

          <Image 
            src={logoImg}
            alt='logo Hotelaria'
          />

        </div>

        <form action={HandleLogin}>

          <input type="text" required name='email' placeholder='Digite aqui seu email.....' className={styles.input} />

          <input type="text" required name='password' placeholder='Digite Aqui a sua senha.....' className={styles.input} />

          <button type='submit' className={styles.button}>Entrar</button>

        </form>


      </section>
    </div>

   </div>

  )
}