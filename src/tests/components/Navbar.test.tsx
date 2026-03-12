import {expect, test, describe} from 'vitest';
import renderWithQuery from "../test-utils/renderWithQuery.tsx";
import Navbar from "../../components/Navbar.tsx";
import {UserContext} from "../../components/UserContext.tsx";
import {contextMock} from "../test-utils/contextMock.ts";

describe('Navbar component', () => {
    test('renders input', async () => {
        const content = await renderWithQuery(<UserContext value={contextMock}><Navbar/></UserContext>)
        const input = content.getByRole('searchbox', { name: /food, restaurants/i })
        await expect.element(input).toBeInTheDocument();
    })

    test('switched to dark theme', async () => {
        const content = await renderWithQuery(<UserContext value={{...contextMock!, isDarkTheme: false}}><Navbar/></UserContext>)
        const moon = content.getByTestId('moon')
        await expect.element(moon).toBeInTheDocument();
    })

    test('switched to light theme', async () => {
        const content = await renderWithQuery(<UserContext value={{...contextMock!, isDarkTheme: true}}><Navbar/></UserContext>)
        const sun = content.getByTestId('sun')
        await expect.element(sun).toBeInTheDocument();
    })

    test('renders not empty cart', async () => {
        const content = await renderWithQuery(<UserContext value={{...contextMock!, totalAmount: 10}}><Navbar/></UserContext>)
        const cartText = content.getByText(/view basket 10 €/i)
        await expect.element(cartText).toBeInTheDocument()

    })

    test('renders empty cart', async () => {
        const content = await renderWithQuery(<UserContext value={{...contextMock!, totalAmount: 0}}><Navbar/></UserContext>)
        const cartText = content.getByText(/view basket 0 €/i)
        await expect.element(cartText).toBeInTheDocument();
    })
})