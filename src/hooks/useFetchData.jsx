import { useEffect, useState } from 'react'
import { token } from '../utils/config'

const UseFetchData = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
    
                const result = await res.json()

                console.log(result)
    
                if(result.success === 'false') {
                    throw new Error(result.message)
                } else{
                    setData(result.data)
                    setLoading(false)
                }
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
                setError(null)
            }
        }

         fetchData()
    }, [url])
  return (
    data, loading, error
  )
}

export default UseFetchData