import { MantineProvider } from '@mantine/core'
import Home from './pages/Home'
import Login from './pages/Login'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Outlet } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { RecoilRoot } from 'recoil'

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
    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                primaryColor: 'violet',
            }}
        >
            <RouterProvider router={router} />
        </MantineProvider>
    )
}

export default App
