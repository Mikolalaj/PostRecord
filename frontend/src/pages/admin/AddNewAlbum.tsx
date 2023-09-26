import { useSetRecoilState } from 'recoil'
import AlbumForm from '../../components/addAlbum/AlbumForm'
import AlbumSearch from '../../components/addAlbum/AlbumSearch'
import { spotifyAlbumIdState } from '../../hooks/album/useSpotifyAlbum'

export default function AddNewAlbum() {
    const setAlbumId = useSetRecoilState(spotifyAlbumIdState)

    return (
        <>
            <h1>Add a new album</h1>
            <AlbumSearch onSelect={value => setAlbumId(value)} />
            <AlbumForm />
        </>
    )
}
