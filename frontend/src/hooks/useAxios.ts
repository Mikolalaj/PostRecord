import axios, { isAxiosError } from 'axios';

const baseURL = '/api'

export interface Response {
    isSuccess: boolean
    message: string
}

enum Method {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

async function useAxios(method: Method, url: string, expectedStatus: number, postData?: object): Promise<Response> {
    try {
        const { data, status } = await axios({
            method: method,
            url: `${baseURL}${url}`,
            data: postData,
        })
        if (status === expectedStatus) {
            return {
                isSuccess: true,
                message: data.message,
            }
        } else {
            return {
                isSuccess: false,
                message: data.message,
            }
        }
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response) {
                return {
                    isSuccess: false,
                    message: error.response.data.message,
                }
            }
        }
        return {
            isSuccess: false,
            message: `Something went wrong... ${error}`,
        }
    }
}