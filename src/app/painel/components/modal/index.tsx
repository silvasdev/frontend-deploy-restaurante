"use client"

import styles from './style.module.scss'
import {X} from "lucide-react"
import {use} from 'react'
import { OrderContext } from '@/providers/order'
import { calculateTotalOrder } from '@/lib/help'

export function ModalOrder(){


    const {onRequestClose, order, finishOrder} = use(OrderContext);

    async function handleFinshOrder() {
        await finishOrder(order[0].order.id)
    }

    return(
        <dialog className={styles.dialogContainer}>
            <section className={styles.dialogcontent}>
                <button className={styles.dialogBack} onClick={onRequestClose}>
                    <X size={40} color='#FF3f4b'/>
                </button>

                <article className={styles.container}>

                    <h2>Detalhes do pedido</h2>

                    <span className={styles.table}>
                        Mesa <b>{ order[0].order.table }</b>
                    </span>

                   {order.map(item => (
                     <section className={styles.item} key={item.id}>

                        <img
                         src={item.product.banner}
                         alt="logo" 
                         width={50}
                         height={50}
                         />

                        <span>Qtd: {item.amount} - <b>{item.product.name} - R$ {parseFloat(item.product.price) * item.amount}</b> </span>
                        <span className={styles.description}>{item.product.description}</span>
                     </section>
                   ))}

                   <h3 className={styles.total}>Valor Total = R$ {calculateTotalOrder(order)}</h3>

                    <button onClick={handleFinshOrder}  className={styles.buttonOrder} >Finalizar Pedido</button>

                </article>
            </section>
        </dialog>
    )

}