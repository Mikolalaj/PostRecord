import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Explore from './pages/Explore'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFoundPage from './pages/NotFoundPage'
import ResetPassword from './pages/ResetPassword'
import PrivateRoute from './utils/PrivateRoute'

const queryClient = new QueryClient()

const AuthProviderOutlet = () => (
    <RecoilRoot>
        <Outlet />
    </RecoilRoot>
)

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthProviderOutlet />} errorElement={<NotFoundPage />}>
            <Route path='/login' element={<Login />} />
            <Route path='/resetPassword' element={<ResetPassword />} />
            <Route
                path='/'
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />
            <Route
                path='/explore'
                element={
                    <PrivateRoute>
                        <Explore />
                    </PrivateRoute>
                }
            />
        </Route>
    )
)

function App() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>((localStorage.getItem('colorScheme') as ColorScheme) || 'light')
    const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

    return (
        <QueryClientProvider client={queryClient}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme, primaryColor: 'violet' }}>
                    <RouterProvider router={router} />
                </MantineProvider>
            </ColorSchemeProvider>
        </QueryClientProvider>
    )
}

export default App
