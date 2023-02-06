import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { userState } from '../atoms'

const baseURL = '/api'

const useAuth = () => {
    const setUser = useSetRecoilState(userState)
    const navigate = useNavigate()

    return {
        loginUser: async (email: string, password: string) => {
            const response = await fetch(`${baseURL}/auth/signIn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
            const data = await response.json()

            if (response.status === 200) {
                setUser(data.user)
                navigate('/')
            } else {
                return false
            }
        },
        registerUser: async (email: string, name: string, username: string, password: string) => {
            const response = await fetch(`${baseURL}/auth/signUp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    first_name: name,
                    username,
                    password,
                }),
            })
            const data = await response.json()

            if (response.status === 201) {
                return true
            } else {
                let error = ''
                for (const key in data) {
                    error += `${data[key][0]} `
                }
                return error
            }
        },
        logoutUser: async () => {
            const response = await fetch(`${baseURL}/auth/signOut`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.status === 204) {
                setUser(null)
                navigate('/login')
            }
            else {
                // TODO: get error message from the request
                return false 
            }
        },
    }
}

export default useAuth
