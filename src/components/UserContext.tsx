import {createContext, type ReactNode, useState} from 'react';
import type {ProductDetails} from "./Product.tsx";

type UserContextProps = null | {
    isLoggedIn: boolean,
    setAuth: () => void,
    cartItems: ProductDetails[],
    addItem: (item: ProductDetails) => void,
    currentQuantity: number,
    addQuantity: () => void,
    decreaseQuantity: () => void,
    cleanQuantity: () => void,
}

export const UserContext = createContext<UserContextProps>(null);

type ContextProviderProps = {
    children: ReactNode,
}

export function ContextProvider({children}: ContextProviderProps){

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [cartItems, setCartItems] = useState<ProductDetails[]>([])
    const [currentQuantity, setCurrentQuantity] = useState(1)

    function addItem(item:ProductDetails) {
        setCartItems([...cartItems, item])
    }

    function setAuth () {
        setIsLoggedIn(true)
    }

    function addQuantity(){
        setCurrentQuantity(currentQuantity + 1)
    }
    function decreaseQuantity(){
        currentQuantity !== 0 && setCurrentQuantity(currentQuantity - 1)
    }

    function cleanQuantity(){
        setCurrentQuantity(1);
    }

    return <UserContext value={{
        isLoggedIn, setAuth, cartItems, addItem: (item) => addItem(item),
        currentQuantity, addQuantity, decreaseQuantity, cleanQuantity
    }}>{children}</UserContext>
}