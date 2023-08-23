import { Navigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { useUser } from '../hooks/auth/useUser'
import { Flex, Loader } from '@mantine/core'

type PrivateRouteProps = {
    children: JSX.Element
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
    const { data: user, isLoading } = useUser()
    if (isLoading)
        return (
            <Flex justify='center' align='center' h='100%'>
                <Loader />
            </Flex>
        )
    return user ? <Layout>{children}</Layout> : <Navigate to='/login' />
}

export default PrivateRoute
