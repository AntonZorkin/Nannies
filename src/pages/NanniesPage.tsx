import { useEffect, useState } from 'react'
import fetchNannies from '../services/nannies'
import { Nanny } from '../types/nanny'
import NannyCard from '../components/NannyCard/NannyCard'
import styles from '../styles/NanniesPage.module.css'
import FilterNannies from '../components/FilterNannies/FilterNannies'
import useSortedNannies from '../utils/sortNannies'
import { User } from 'firebase/auth'
import { useSearchParams } from 'react-router-dom'

const NanniesPage = ({ user }: { user: User | null }) => {
  const [nannies, setNannies] = useState<Nanny[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const getData = async () => {
      const data = await fetchNannies()
      setNannies(data)
      setIsLoading(false)
    }
    getData()
  }, [])

  const [searchParams, setSearchParams] = useSearchParams()
  const filter = searchParams.get('sort') || 'A to Z'
  const handleFilterChange = (newFilter: string) => {
    setSearchParams({ sort: newFilter })
  }

  const sortNannies = useSortedNannies({ nannies, filter })

  return (
    <div className={styles.container}>
      <FilterNannies currentFilter={filter} onFilterChange={handleFilterChange} />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className={styles.nanniesList}>
          {sortNannies.slice(0, visibleCount).map((nanny) => {
            return <NannyCard key={`${nanny.name}-${nanny.birthday}`} nanny={nanny} user={user} />
          })}
        </ul>
      )}
      {visibleCount < sortNannies.length && (
        <button
          className={styles.loadMoreBtn}
          type="button"
          onClick={() => setVisibleCount(visibleCount + 3)}
        >
          Load more
        </button>
      )}
    </div>
  )
}

export default NanniesPage
