import AlbumForm from '../../components/addAlbum/AlbumForm'
import AlbumSearch from '../../components/addAlbum/AlbumSearch'

export default function AddNewAlbum() {
    return (
        <>
            <h1>Add a new album</h1>
            <AlbumSearch />
            <AlbumForm />
        </>
    )
}
