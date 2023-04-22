import { useState, useEffect } from 'react'
import axios from 'axios'

function useTest(url) {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(url)
                setData(response.data)
            } catch (error) {
                setIsError(true)
                setError(error)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [url])
    
    return { data, isLoading, isError, error }
}

export default useTest