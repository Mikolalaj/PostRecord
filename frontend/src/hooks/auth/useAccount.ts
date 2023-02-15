import axios, { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { loginPageResponse } from '../../atoms'
import { parseResponse } from '../../utils/axios'
import { onError } from './common'

type ResetPasswordRequest = {
    password: string
    token: string
    email: string
}

export function useAccount() {
    const setLoginResponse = useSetRecoilState(loginPageResponse)
    const navigate = useNavigate()

    const confirmEmailMutation = useMutation(
        (token: string) => {
            return axios.post('/api/auth/confirmEmail', { token })
        },
        {
            onError,
            onSuccess: (response: AxiosResponse) => {
                navigate('/login')
                setLoginResponse({ isSuccess: true, message: parseResponse(response).message })
            },
        }
    )

    const forgotPasswordMutation = useMutation(
        (data: { email: string }) => {
            return axios.post('/api/auth/forgotPassword', data)
        },
        {
            onError,
            onSuccess: (response: AxiosResponse) => {
                setLoginResponse({ isSuccess: true, message: parseResponse(response).message })
            },
        }
    )

    const resetPasswordMutation = useMutation(
        (data: ResetPasswordRequest) => {
            return axios.post('/api/auth/resetPassword', data)
        },
        {
            onError,
            onSuccess: (response: AxiosResponse) => {
                navigate('/login')
                setLoginResponse({ isSuccess: true, message: parseResponse(response).message })
            },
        }
    )

    return {
        confirmEmail: confirmEmailMutation.mutate,
        forgotPassword: forgotPasswordMutation.mutate,
        resetPassword: resetPasswordMutation.mutate,
    }
}
