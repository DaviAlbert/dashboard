import { render } from "@testing-library/react"
import { Pagination } from "./pagination"
import userEvent from '@testing-library/user-event'

const onPageChangeCallback = vi.fn()

describe('Pagination', () => {
    beforeEach(() => {
        onPageChangeCallback.mockClear()
    })
    it('Should display the right number of pages and results', () => {
        const wrapper = render(
            <Pagination totalCount={200} perPage={10} pageIndex={0} onPageChange={onPageChangeCallback} />
        )
        
        expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument()
        expect(wrapper.getByText('Total de 200 item(s)')).toBeInTheDocument()
    })
    it('Should be able to navigate to the next page', async () => {
        const user = userEvent.setup()

        const wrapper = render(
            <Pagination totalCount={200} perPage={10} pageIndex={0} onPageChange={onPageChangeCallback} />
        )
        const nextPageButton = wrapper.getByRole('button', {
            name: 'Próxima página',
        })
        await user.click(nextPageButton)

        expect(onPageChangeCallback).toHaveBeenCalledWith(1)
    })
    it('Should be able to navigate to the previus page', async () => {
        const user = userEvent.setup()

        const wrapper = render(
            <Pagination totalCount={200} perPage={10} pageIndex={5} onPageChange={onPageChangeCallback} />
        )
        const nextPageButton = wrapper.getByRole('button', {
            name: 'Página anterior',
        })
        await user.click(nextPageButton)

        expect(onPageChangeCallback).toHaveBeenCalledWith(4)
    })
    it('Should be able to navigate to the first page', async () => {
        const user = userEvent.setup()

        const wrapper = render(
            <Pagination totalCount={200} perPage={10} pageIndex={5} onPageChange={onPageChangeCallback} />
        )
        const nextPageButton = wrapper.getByRole('button', {
            name: 'Primeira página',
        })
        await user.click(nextPageButton)

        expect(onPageChangeCallback).toHaveBeenCalledWith(0)
    })
    it('Should be able to navigate to the last page', async () => {
        const user = userEvent.setup()

        const wrapper = render(
            <Pagination totalCount={200} perPage={10} pageIndex={0} onPageChange={onPageChangeCallback} />
        )
        const nextPageButton = wrapper.getByRole('button', {
            name: 'Ultima página',
        })
        await user.click(nextPageButton)

        expect(onPageChangeCallback).toHaveBeenCalledWith(19)
    })
})