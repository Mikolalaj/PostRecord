export type TracklistType = {
    number: number
    title: string
    duration: string
}[]

export type PressingType = {
    id: string
    name: string
    image: string
    color: string
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
