import { Flex, Grid } from '@mantine/core'
import { useParams } from 'react-router-dom'
import AboutArtist from '../components/albumDetails/AboutArtist'
import Header from '../components/albumDetails/Header'
import TrackList from '../components/albumDetails/TrackList'
import VinylPressings from '../components/albumDetails/VinylPressings'
import QueryRenderer from '../components/common/QueryRenderer'
import { useAlbum } from '../hooks/album/useAlbums'

function Album() {
    const { id } = useParams()
    if (!id) return null

    return (
        <QueryRenderer
            query={useAlbum(id)}
            render={albumData => {
                return (
                    <Flex gap='xl' direction='column'>
                        <Header {...albumData} />
                        <Grid gutter={50}>
                            <Grid.Col lg={6} sm={6} xs={12}>
                                <TrackList tracklist={albumData.tracklist} />
                            </Grid.Col>
                            <Grid.Col lg={6} sm={6} xs={12}>
                                <AboutArtist {...albumData.artist} />
                            </Grid.Col>
                        </Grid>
                        <VinylPressings vinylPressings={albumData.pressings} />
                    </Flex>
                )
            }}
        />
    )
}

export default Album
