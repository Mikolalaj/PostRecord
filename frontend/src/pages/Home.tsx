import { useState, useEffect } from 'react'

type Props = {}

export default function Home({}: Props) {
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const { message } = await response.json()
            setMessage(message)
        }
        fetchData()
    }, [])

    return (
        <>
            <h3>JWT authenticated API fetch:</h3>
            {<p>{message}</p>}
        </>
    )
}
