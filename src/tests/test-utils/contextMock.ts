import type {UserContextProps} from "../../components/UserContext.tsx";


export const contextMock:UserContextProps = {
    isLoggedIn: true,
    setAuth: () => {},
    cartItems: [],
    addItem: () => {},
    currentQuantity: 0,
    changeQuantity: () => {},
    setNewCart: () => {},
    totalAmount: 0,
    isDarkTheme: false,
    changeTheme: () => {},
}