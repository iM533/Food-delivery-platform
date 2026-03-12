import { test, expect, describe } from 'vitest'
import AppContent from "../../components/AppContent.tsx";
import renderWithQuery from '../test-utils/renderWithQuery.tsx'


describe('App Content page', () => {
    test("renders heading", async () => {
        const content = await renderWithQuery(<AppContent/>)

        const heading = content.getByRole('heading', { name: /show all restaurants/i});
        await expect.element(heading).toBeInTheDocument()
    });

    test("renders restaurant card", async () => {
        const content = await renderWithQuery(<AppContent/>)

        const restaurantCards = content.getByTestId('restaurant-card');
        await expect.poll(() => restaurantCards.elements().length).toBeGreaterThan(0)
    });
})
