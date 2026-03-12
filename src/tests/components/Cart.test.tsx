import {expect, test, describe} from 'vitest'
import Cart from "../../components/Cart.tsx";
import {ContextProvider, type UserContextProps} from "../../components/UserContext.tsx";
import renderWithQuery from "../test-utils/renderWithQuery.tsx";
import {UserContext} from "../../components/UserContext.tsx";
import {contextMock} from "../test-utils/contextMock.ts";


describe('Cart page', () => {
    test('renders empty cart', async () => {

        const content = await renderWithQuery(<ContextProvider><Cart/></ContextProvider>)
        const header = content.getByRole('heading', { name: /Your cart looks empty/i})
        await expect.element(header).toBeInTheDocument();
    })

    test("renders not empty cart", async () => {

        const cartContext:UserContextProps = {...contextMock!, cartItems: [
                {
                    title: "Test product title",
                    description: "Test product description",
                    price: 10,
                    restaurant_id: 1,
                    quantity: 1,
                    img: () => 'nothing',
                }
            ]}
        const content = await renderWithQuery(
            <UserContext value={cartContext}>
                <Cart />
            </UserContext>
        )
        const title = content.getByText(/test product title/i)
        await expect.element(title).toBeInTheDocument()
    })

    test('renders notification after placing the order', async () => {
        const cartContext:UserContextProps = {...contextMock!, cartItems: [
                {
                    title: "Test product title",
                    description: "Test product description",
                    price: 10,
                    restaurant_id: 1,
                    quantity: 1,
                    img: () => 'nothing',
                }
            ]}
        const content = await renderWithQuery(
            <UserContext value={cartContext}>
                <Cart />
            </UserContext>
        )
        const orderPlacedText = content.getByText(/your demo order placed!/i)
        await content.getByRole('button').click()
        await expect.element(orderPlacedText).toBeInTheDocument()
    })
})



