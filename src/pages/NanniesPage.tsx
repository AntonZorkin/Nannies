import { useEffect, useState } from 'react'
import fetchNannies from '../services/nannies'
import { Nanny } from '../types/nanny'
import NannyCard from '../components/NannyCard/NannyCard'
import styles from '../styles/NanniesPage.module.css'

const NanniesPage = () => {
  const [nannies, setNannies] = useState<Nanny[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const getData = async () => {
      const data = await fetchNannies()
      console.log('Fetched data:', data)
      setNannies(data)
      setIsLoading(false)
    }
    getData()
  }, [])

  return (
    <>
      <div className={styles.filters}>
        <p className={styles.filtersText}>Filters</p>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {nannies.slice(0, visibleCount).map((nanny) => {
            return <NannyCard key={nanny.name} nanny={nanny} />
          })}
        </ul>
      )}
      {visibleCount < nannies.length && (
        <button
          className={styles.loadMoreBtn}
          type="button"
          onClick={() => setVisibleCount(visibleCount + 3)}
        >
          Load more
        </button>
      )}
    </>
  )
}

export default NanniesPage
