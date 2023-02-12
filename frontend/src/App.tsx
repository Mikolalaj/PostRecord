import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core'
import Home from './pages/Home'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Outlet } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { RecoilRoot } from 'recoil'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const AuthProviderOutlet = () => (
    <RecoilRoot>
        <Outlet />
    </RecoilRoot>
)

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthProviderOutlet />}>
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
        </Route>
    )
)

function App() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
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
