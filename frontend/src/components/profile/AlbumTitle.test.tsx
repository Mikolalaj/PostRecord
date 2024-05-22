import AlbumTitle from './AlbumTitle'
import { expect, describe, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { mockedUseNavigate } from '../../tests/mocks/react-router'

describe('AlbumTitle', () => {
  it('renders title', () => {
    render(<AlbumTitle id='1' title='Title' />)
    expect(screen.getByText('Title')).toBeInTheDocument()
  })

  it('navigates to album page on click', () => {
    render(<AlbumTitle id='1' title='Title' />)
    screen.getByText('Title').click()
    expect(mockedUseNavigate).toHaveBeenCalledWith('/album/1')
  })

  it('underlines title on hover', () => {
    const { container } = render(<AlbumTitle id='1' title='Title' />)
    const title = screen.getByText('Title')
    expect(title).not.toHaveStyle('text-decoration: underline')
    const td = container.getElementsByTagName('td')[0]
    fireEvent.mouseEnter(td)
    expect(title).toHaveStyle('text-decoration: underline')
  })

  it('shows external link icon on hover', async () => {
    const { container } = render(<AlbumTitle id='1' title='Title' />)
    const icon = container.getElementsByTagName('svg')[0]
    expect(icon).toHaveStyle('visibility: hidden')
    const td = container.getElementsByTagName('td')[0]
    fireEvent.mouseEnter(td)
    expect(icon).toHaveStyle('visibility: visible')
  })
})
