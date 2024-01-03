import { useEffect, useState } from 'react'
import { BASE_URL, token } from '../utils/config'
import { toast } from 'react-toastify'

const UseFetchData = (url) => {
    console.log(token)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${BASE_URL}/users/profile/me`, {
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