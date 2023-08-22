import { Flex, Grid } from '@mantine/core'
import { useParams } from 'react-router-dom'
import AboutArtist from '../components/albumDetails/AboutArtist'
import Header from '../components/albumDetails/Header'
import TrackList from '../components/albumDetails/TrackList'
import VinylPressings from '../components/albumDetails/VinylPressings'
import QueryRenderer from '../components/common/QueryRenderer'
import { useAlbum } from '../hooks/album/useAlbums'
import { usePressings } from '../hooks/album/usePressings'

function Album() {
    const { id } = useParams()
    if (!id) return null

    return (
        <QueryRenderer
            queries={[useAlbum(id), usePressings(id)] as const}
            render={(albumData, pressings) => (
                <Flex gap='xl' direction='column' mt={30}>
                    <Header {...albumData} />
                    <Grid gutter={50}>
                        <Grid.Col lg={6} sm={6} xs={12}>
                            <TrackList tracklist={albumData.tracklist} />
                        </Grid.Col>
                        <Grid.Col lg={6} sm={6} xs={12}>
                            <AboutArtist {...albumData.artist} />
                        </Grid.Col>
                    </Grid>
                    <VinylPressings vinylPressings={pressings} />
                </Flex>
            )}
        />
    )
}

export default Album
