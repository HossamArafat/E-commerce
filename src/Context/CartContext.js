import { createContext, useState } from "react";

export const Cart = createContext()
export default function CartProvider({children}) {
    const [isChange, setIsChange] = useState(false)

    return(
        <Cart.Provider value={{isChange, setIsChange}}>{children}</Cart.Provider>
    )
}