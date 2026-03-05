import {createContext, type ReactNode, useEffect, useState} from 'react';
import type {ProductDetails} from "./Product.tsx";

type UserContextProps = null | {
    isLoggedIn: boolean,
    setAuth: () => void,
    cartItems: ProductDetails[],
    addItem: (item: ProductDetails) => void,
    currentQuantity: number,
    changeQuantity: (method: 'increase' | 'decrease' | 'clear') => void,
    setNewCart: (item: ProductDetails[]) => void,
    totalAmount?: number,
}

export const UserContext = createContext<UserContextProps>(null);

type ContextProviderProps = {
    children: ReactNode,
}

export function ContextProvider({children}: ContextProviderProps){

    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [cartItems, setCartItems] = useState<ProductDetails[]>([])
    const [currentQuantity, setCurrentQuantity] = useState(1)

    const [totalAmount, setTotalAmount] = useState<number | undefined>(0)
    useEffect(() => {
        setTotalAmount(cartItems.reduce((acc, item) => acc + item.price * item.quantity!, 0))
    },[cartItems])

    function addItem(item:ProductDetails) {
        if(cartItems.length > 0){
            const filteredCart = cartItems.filter(cartItem => cartItem.restaurant_id == item.restaurant_id)
            setCartItems([...filteredCart, item])
        }else{
            setCartItems([...cartItems, item])
        }
    }

    function setNewCart(item:ProductDetails[]) {
            setCartItems(item)
    }


    function setAuth () {
        setIsLoggedIn(true)
    }

    function changeQuantity(method: 'increase' | 'decrease' | 'clear'){
        switch (method){
            case "increase":
                setCurrentQuantity(currentQuantity + 1)
                break;
            case "decrease":
                currentQuantity > 1 && setCurrentQuantity(currentQuantity - 1)
                break;
            case "clear":
                setCurrentQuantity(1);
                break;
        }
    }


    return <UserContext value={{
        isLoggedIn, setAuth, cartItems, addItem: (item) => addItem(item),
        currentQuantity, changeQuantity, setNewCart: (item) => setNewCart(item), totalAmount
    }}>{children}</UserContext>
}