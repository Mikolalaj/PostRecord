type Props = {
    image: string
}

export default function AlbumImage({ image }: Props) {
    return (
        <td>
            <img src={import.meta.env.VITE_RECORDS_IMAGE_PATH + image} alt={image} height='50' />
        </td>
    )
}
