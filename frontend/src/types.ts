type MantineColor =
    | 'dark'
    | 'gray'
    | 'red'
    | 'pink'
    | 'grape'
    | 'violet'
    | 'indigo'
    | 'blue'
    | 'cyan'
    | 'green'
    | 'lime'
    | 'yellow'
    | 'orange'
    | 'teal'

export type TracklistType = {
    number: number
    title: string
    duration: string
    features: string | null
}[]

export type PressingType = {
    id: string
    name: string
    image: string
    color: MantineColor
    isInCollection: boolean
}

export type ArtistType = {
    name: string
    image: string
    description: string
}

export type AlbumType = {
    title: string
    image: string
    genre: string
    style: string
    year: string
    spotifyId: string
    artist: ArtistType
    tracklist: TracklistType
    pressings: PressingType[]
}
