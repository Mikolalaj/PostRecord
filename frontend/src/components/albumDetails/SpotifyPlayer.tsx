interface SpotifyPlayerProps {
    albumId: string
}

function SpotifyPlayer({ albumId }: SpotifyPlayerProps) {
    return (
        <iframe
            style={{ borderRadius: '12px', border: '0px' }}
            src={`https://open.spotify.com/embed/album/${albumId}?utm_source=generator`}
            width='100%'
            height='152'
            allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            loading='lazy'
        />
    )
}

export default SpotifyPlayer
