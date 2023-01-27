import { RecoilRoot } from 'recoil'
import { MantineProvider, Text } from '@mantine/core'

export default function App() {
    return (
        <RecoilRoot>
            <MantineProvider withGlobalStyles withNormalizeCSS>
                <Text>Welcome to Mantine!</Text>
            </MantineProvider>
        </RecoilRoot>
    )
}
