import axios, { isAxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { userState } from '../atoms'

const baseURL = '/api'

const useAuth = () => {
    const setUser = useSetRecoilState(userState)
    const navigate = useNavigate()

    return {
        loginUser: async (email: string, password: string): Promise<string> => {
            try {
                const { data, status } = await axios.post(`${baseURL}/auth/signIn`, {
                    email,
                    password,
                })
                if (status === 200) {
                    setUser(data.user)
                    navigate('/')
                    return ''
                } else {
                    return data.message
                }
            } catch (error) {
                if (isAxiosError(error)) {
                    if (error.response) {
                        return error.response.data.message
                    }
                }
                return `Something went wrong... ${error}`
            }
        },
        registerUser: async (email: string, firstName: string, lastName: string, password: string): Promise<string> => {
            try {
                const { data, status } = await axios.post(`${baseURL}/auth/signUp`, {
                    email,
                    firstName,
                    lastName,
                    password,
                })
                if (status === 201) {
                    return ''
                } else {
                    return data.message
                }
            } catch (error) {
                if (isAxiosError(error)) {
                    if (error.response) {
                        return error.response.data.message
                    }
                }
                return `Something went wrong... ${error}`
            }
        },
        logoutUser: async () => {
            try {
                const { data, status } = await axios.post(`${baseURL}/auth/signOut`)
                if (status === 204) {
                    setUser(null)
                    navigate('/login')
                    return ''
                } else {
                    return data.message
                }
            } catch (error) {
                if (isAxiosError(error)) {
                    if (error.response) {
                        return error.response.data.message
                    }
                }
                return `Something went wrong... ${error}`
            }
        },
    }
}

export default useAuth
