import UserStats from './UserStats'
import { expect, describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'

const stats = {
    collection: 100,
    wantlist: 200,
    forSale: 300,
}

describe('UserStats', () => {
    it('renders numbers', () => {
        render(<UserStats stats={stats} />)

        expect(screen.getByText('100')).toBeInTheDocument()
        expect(screen.getByText('200')).toBeInTheDocument()
        expect(screen.getByText('300')).toBeInTheDocument()
    })

    it('renders labels', () => {
        render(<UserStats stats={stats} />)

        expect(screen.getByText('Collection')).toBeInTheDocument()
        expect(screen.getByText('Wantlist')).toBeInTheDocument()
        expect(screen.getByText('For sale')).toBeInTheDocument()
    })
})
