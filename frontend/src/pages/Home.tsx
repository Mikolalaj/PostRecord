import { useState, useEffect } from 'react'

type Props = {}

export default function Home({}: Props) {
    // const [message, setMessage] = useState<string>('')

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const { data } = await api.get('/hello/')
    //         setMessage(data.response)
    //     }
    //     fetchData()
    // }, [])

    return (
        <>
            <h3>JWT authenticated API fetch:</h3>
            {/* {<p>{message}</p>} */}
        </>
    )
}
