import { useState } from 'react'
import AlbumForm from './addAlbum/AlbumForm'
import AlbumSearch from './addAlbum/AlbumSearch'

export default function AddNewAlbum() {
    const [albumId, setAlbumId] = useState<string>('')
    return (
        <>
            <AlbumSearch albumsType='spotify' setAlbumId={setAlbumId} />
            <AlbumForm albumId={albumId} />
        </>
    )
}
