"use client"

import {use} from "react"
import styles from "./style.module.scss"
import { RefreshCcw} from "lucide-react"
import { orderProps } from "@/lib/order.type"
import {ModalOrder} from "@/app/painel/components/modal"
import { OrderProvider } from "@/providers/order"
import { OrderContext } from "@/providers/order"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Props{
    orders: orderProps[]
}

export function Order({orders}: Props){

    const {isOpen, onRequestOpen} = use(OrderContext)

    const router = useRouter();

   async function handleDetailOrder(order_id: string){
      await  onRequestOpen(order_id);
    }

    function handleRefresh(){
        router.refresh();
        toast.success("Pedidos Atualizados!")
    }

    return(
        <>
        <main className={styles.container}>

            <section className={styles.containerHeader}>

                <h1>Ultimos pedidos</h1>
                <button onClick={handleRefresh}>
                    <RefreshCcw size={24} color="#3fffa3" />
                </button>

            </section>

            <section className={styles.listOrders}>

                {orders.length === 0 && (
                    <span className={styles.emptyItem}>Nehum Pedido Aberto No Momento....</span>
                )}

                {orders.map( order => (

                    <button key={order.id} className={styles.orderItem} onClick={() => handleDetailOrder(order.id)}>

                        <div></div>
                        <span> Mesa {order.table}</span>

                    </button>

                ))}

            </section>
            
        </main>


                {isOpen && < ModalOrder/> }
        

        </>
    )
}