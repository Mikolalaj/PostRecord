import { AxiosError } from 'axios'
import { useSetRecoilState } from 'recoil'
import { loginPageResponse } from '../../atoms'
import { parseErrorMessage } from '../../utils/axios'

export function onError(error: AxiosError) {
    const setLoginResponse = useSetRecoilState(loginPageResponse)

    setLoginResponse({ isSuccess: false, message: parseErrorMessage(error) })
}
