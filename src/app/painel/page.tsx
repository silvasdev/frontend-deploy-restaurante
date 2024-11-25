import { Order } from "./components/Order/orders";
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";
import { orderProps } from "@/lib/order.type";


async function getOrders(): Promise<orderProps[] | []> {
    
    try{

        const token = await getCookieServer();

        const response = await api.get("/orders", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

       return response.data || []

    }catch(err){
        console.log(err);
        return[];

    }

}

export default async function painel(){

    const orders = await getOrders();

    return(
        <>
            <Order orders={orders}/>
        </>
    )
}