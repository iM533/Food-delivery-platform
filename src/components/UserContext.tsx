import {createContext, type ReactNode, useState} from 'react';


type UserContextProps = null | {
    isLoggedIn: boolean,
    setAuth: () => void,
}

export const UserContext = createContext<UserContextProps>(null);

type ContextProviderProps = {
    children: ReactNode,
}

export function ContextProvider({children}: ContextProviderProps){

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    function setAuth () {
        setIsLoggedIn(true)
    }

    return <UserContext value={{isLoggedIn, setAuth}}>{children}</UserContext>
}