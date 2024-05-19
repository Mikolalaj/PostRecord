import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Album from './pages/Album'
import Explore from './pages/Explore'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFoundPage from './pages/NotFoundPage'
import Profile from './pages/Profile'
import ResetPassword from './pages/ResetPassword'
import Admin from './pages/admin/Admin'
import PrivateRoute from './utils/PrivateRoute'

const queryClient = new QueryClient()

const AuthProviderOutlet = () => (
    <RecoilRoot>
        <Outlet />
    </RecoilRoot>
)

const adminRoutes = [{ path: '/admin/:subPage', element: <Admin /> }]

const privateRoutes = [
    { path: '/', element: <Home /> },
    { path: '/explore', element: <Explore /> },
    { path: '/album/:id', element: <Album /> },
    { path: '/profile/:username?', element: <Profile /> },
]

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthProviderOutlet />} errorElement={<NotFoundPage />}>
            <Route path='/login' element={<Login />} />
            <Route path='/resetPassword' element={<ResetPassword />} />
            {privateRoutes.map(route => (
                <Route key={route.path} path={route.path} element={<PrivateRoute>{route.element}</PrivateRoute>} />
            ))}
            {adminRoutes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<PrivateRoute isAdminRequired={true}>{route.element}</PrivateRoute>}
                />
            ))}
        </Route>
    )
)

function App() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>((localStorage.getItem('colorScheme') as ColorScheme) || 'light')
    const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

    return (
        <QueryClientProvider client={queryClient}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS theme={{ colorScheme, primaryColor: 'violet' }}>
                    <ModalsProvider>
                        <NotificationsProvider>
                            <RouterProvider router={router} />
                        </NotificationsProvider>
                    </ModalsProvider>
                </MantineProvider>
            </ColorSchemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default App
