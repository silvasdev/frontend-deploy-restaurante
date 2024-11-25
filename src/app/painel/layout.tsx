
import {Header} from '@/app/painel/components/Header'
import { OrderProvider } from '@/providers/order'



export default function PainelLayout({children}: {children: React.ReactNode}){

return(
    <>
        <Header />
        <OrderProvider>
            {children}
        </OrderProvider>
        
    </>
)

}