import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core'
import Home from './pages/Home'
import Login from './pages/Login'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Outlet } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { RecoilRoot } from 'recoil'
import { useState } from 'react'

const AuthProviderOutlet = () => (
    <RecoilRoot>
        <Outlet />
    </RecoilRoot>
)

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthProviderOutlet />}>
            <Route path='/login' element={<Login />} />
            <Route
                path='/'
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />
        </Route>
    )
)

function App() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
    const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme, primaryColor: 'violet' }}>
                <RouterProvider router={router} />
            </MantineProvider>
        </ColorSchemeProvider>
    )
}

export default App
