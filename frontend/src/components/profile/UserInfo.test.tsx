import UserInfo from './UserInfo'
import { expect, describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Profile } from 'hooks/auth/useUser'
import { vi } from 'vitest'

export const mockedUseNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
    const mod = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
    return {
        ...mod,
        useNavigate: () => mockedUseNavigate,
    }
})


const user: Profile = {
    id: '1',
    username: 'john.doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@email.com',
    isAdmin: false,
    stats: {
        collection: 0,
        wantlist: 1,
        forSale: 3,
    },
    joinedAt: new Date('2021-01-01'),
    favouriteAlbum: {
        id: '1',
        title: 'Album title',
        image: 'album.jpg',
        artist: 'Album artist',
    },
    bio: 'User bio',
}

describe('UserInfo', () => {
    it('should render user info', () => {
        // mockedUseNavigate
        render(<UserInfo user={user} isProfileOwner={false} />)

        expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
})
