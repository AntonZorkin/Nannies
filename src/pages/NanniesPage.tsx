import { useEffect, useState } from 'react'
import fetchNannies from '../services/nannies'
import { Nanny } from '../types/nanny'

const NanniesPage = () => {
  const [nannies, setNannies] = useState<Nanny[]>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const getData = async () => {
      const data = await fetchNannies()
      setNannies(data)
      setIsLoading(false)
    }
    getData()
  }, [])

  return (
    <>
      {' '}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {nannies.map((nannie) => {
            return <li key={nannie.name}>{nannie.name}</li>
          })}
        </ul>
      )}
    </>
  )
}

export default NanniesPage
