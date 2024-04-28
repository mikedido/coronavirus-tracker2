import { useEffect, useState } from "react"


export const useFetch = (url) => {
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {

        async function fetchData() {
            try {
                let response = await fetch(url)
                if (response.ok) {
                    let data = await response.json()
                    setData(data)
                } else {
                    const { errorMessage } = await response.json()
                    setError(true)
                    throw new Error(errorMessage)
                }
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

    }, [url])

    return {isLoading, data, error}
}