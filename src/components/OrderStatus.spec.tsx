import {render} from '@testing-library/react'
import { OrderStatus } from './orderStatus'

describe('OrderStatus', () => {
    it('should display the right text when order status is pending', () => {
        const wrapper = render(<OrderStatus status="pending" />)
        const statusText = wrapper.getByText('Pendente')
        const badgeElement = wrapper.getByTestId('badge')

        expect(statusText).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-chart-3')

        wrapper.debug()
    })
    it('should display the right text when order status is canceled', () => {
        
        const wrapper = render(<OrderStatus status="canceled" />)
        const statusText = wrapper.getByText('Cancelado')
        const badgeElement = wrapper.getByTestId('badge')

        expect(statusText).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-chart-5')

        wrapper.debug()
    })
    it('should display the right text when order status is delivered', () => {
        
        const wrapper = render(<OrderStatus status="delivered" />)
        const statusText = wrapper.getByText('Entregue')
        const badgeElement = wrapper.getByTestId('badge')

        expect(statusText).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-chart-2')

        wrapper.debug()
    })
    it('should display the right text when order status is delivering', () => {
        
        const wrapper = render(<OrderStatus status="delivering" />)
        const statusText = wrapper.getByText('Em entrega')
        const badgeElement = wrapper.getByTestId('badge')

        expect(statusText).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-chart-1')

        wrapper.debug()
    })
    it('should display the right text when order status is processing', () => {
        
        const wrapper = render(<OrderStatus status="processing" />)
        const statusText = wrapper.getByText('Em preparo')
        const badgeElement = wrapper.getByTestId('badge')

        expect(statusText).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-chart-1')

        wrapper.debug()
    })
})