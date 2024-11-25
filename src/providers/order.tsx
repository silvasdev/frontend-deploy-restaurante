"use client"
import { createContext, ReactNode, useState } from 'react'
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
import { toast } from 'sonner';

import { useRouter } from 'next/navigation';

export interface orderItemProps{
  id: string;
  amount: number;
  created_at: string;
  order_id: string;
  product_id: string;

  product: {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
  };

  order:{
    id: string;
    table: number;
    status: boolean;
    draft: boolean;
    name: string;
  }
}

type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => Promise<void>;
  onRequestClose: () => void;
  order: orderItemProps[];
  finishOrder: (order_id: string) => Promise<void>;
}

type OrderProviderProps = {
  children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({ children }: OrderProviderProps){
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<orderItemProps[]>([])

  const router = useRouter();

 async function onRequestOpen(order_id: string){

  const token = getCookieClient();

  const response = await api.get("/order/detail", {
    headers:{
      Authorization: `Bearer ${token}`
    },

    params:{
      order_id: order_id
    }
  })

    setOrder(response.data);
    setIsOpen(true);
  }

  function onRequestClose(){
    setIsOpen(false);
  }

  async function finishOrder(order_id: string) {
    const token = getCookieClient();

    const data = {
      order_id: order_id
    }

    try{

      await api.put("/order/finish", data, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })

    }catch(err){
      console.log(err)
      toast.warning("falha ao finalizar esse pedido!")
      return;
    }

    toast.success("Pedido finalizado com sucesso!");
    router.refresh();
    setIsOpen(false);

  }

  return(
    <OrderContext.Provider 
      value={{ 
        isOpen,
        onRequestOpen,
        onRequestClose,
        order,
        finishOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}


