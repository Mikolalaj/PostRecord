import axios, { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { loginPageResponse } from '../../atoms'
import { parseResponseMessage } from '../../utils/axios'
import { onError } from './common'

export function useConfirmEmailMutation() {
    const setLoginResponse = useSetRecoilState(loginPageResponse)
    const navigate = useNavigate()

    return useMutation(
        (token: string) => {
            return axios.post('/api/auth/confirmEmail', { token })
        },
        {
            onError,
            onSuccess: (response: AxiosResponse) => {
                navigate('/login')
                setLoginResponse({ isSuccess: true, message: parseResponseMessage(response) })
            },
        }
    )
}
