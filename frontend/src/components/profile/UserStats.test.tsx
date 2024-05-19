import UserStats from './UserStats'
import { expect, test, describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'

const stats = {
    collection: 100,
    wantlist: 200,
    forSale: 300,
}

test('2 + 2', () => {
    expect(2 + 2).toBe(4)
})

describe('UserStats', () => {
    it('renders headline', () => {
        render(<UserStats stats={stats} />)

        expect(screen.getByText('100')).toBeInTheDocument()
        expect(screen.getByText('200')).toBeInTheDocument()
        expect(screen.getByText('300')).toBeInTheDocument()
    })
})
