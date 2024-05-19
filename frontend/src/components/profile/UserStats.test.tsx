// import { test, expect } from 'bun:test'
// import UserStats from './UserStats'

// const stats = {
//     collection: 100,
//     wantlist: 200,
//     forSale: 300,
// }

// test('renders stats', () => {
//     render(<UserStats stats={stats} />)
//     expect(screen.getByText('100')).toBeInTheDocument()
//     expect(screen.getByText('200')).toBeInTheDocument()
//     expect(screen.getByText('300')).toBeInTheDocument()
// })

// test('dom test', () => {
//     document.body.innerHTML = `<button>My button</button>`
//     const button = document.querySelector('button')
//     expect(button?.innerText).toEqual('My button')
// })
import { expect, test } from 'bun:test'

test('2 + 2', () => {
    expect(2 + 2).toBe(4)
})
