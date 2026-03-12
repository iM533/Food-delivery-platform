import {describe, test, expect} from "vitest";
import Restaurant from "../../components/Restaurant.tsx";
import renderWithQuery from "../test-utils/renderWithQuery.tsx";

describe('Restaurant component', () => {
    test('renders restaurant card', async () => {
        const content = await renderWithQuery(<Restaurant img={() => 'nothing.png'} title={'Test Restaurant'} deliveryPrice={100} deliveryTime={100} id={1} slug={'test-restaurant'}/>)
        const restaurantTitle = content.getByText(/test restaurant/i)
        await expect.element(restaurantTitle).toBeInTheDocument()
    })

    test('renders valid delivery price', async () => {
        const content = await renderWithQuery(<Restaurant img={() => 'nothing.png'} title={'Test Restaurant2'} deliveryPrice={300} deliveryTime={60} id={1} slug={'test-restaurant'}/>)
        const deliveryPrice = content.getByText('3.00 €')
        await expect.element(deliveryPrice).toBeInTheDocument()
    })

    test('renders valid image alt', async () => {
        const content = await renderWithQuery(<Restaurant img={() => 'nothing.png'} title={'Test Restaurant3'} deliveryPrice={200} deliveryTime={30} id={1} slug={'test-restaurant'}/>)
        const imageAlt = content.getByAltText('Test Restaurant3')
        await expect.element(imageAlt).toBeInTheDocument()
    })
})