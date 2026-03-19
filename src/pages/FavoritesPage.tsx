import { useEffect, useState } from 'react'
import fetchNannies from '../services/nannies'
import styles from '../styles/NanniesPage.module.css'
import { Nanny } from '../types/nanny'
import NannyCard from '../components/NannyCard/NannyCard'
import FilterNannies from '../components/FilterNannies/FilterNannies'
import useSortedNannies from '../utils/sortNannies'
import { User } from 'firebase/auth'

const FavoritesPage = ({ user }: { user: User | null }) => {
  const [nannies, setNannies] = useState<Nanny[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(3)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('favorite')
    setFavorites(saved ? JSON.parse(saved) : [])
    const getData = async () => {
      const data = await fetchNannies()
      setNannies(data)
      setIsLoading(false)
    }
    getData()
  }, [])
  const [filter, setFilter] = useState('A to Z')

  const sortNannies = useSortedNannies({ nannies, filter })

  const refreshFavorites = () => {
    const saved = localStorage.getItem('favorite')
    setFavorites(saved ? JSON.parse(saved) : [])
  }

  return (
    <div className={styles.container}>
      <FilterNannies currentFilter={filter} onFilterChange={setFilter} />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {sortNannies.filter((n) => favorites.includes(n.id)).length === 0 && (
            <p>You haven't added any nannies to your favorites yet.</p>
          )}
          <ul className={styles.nanniesList}>
            {sortNannies
              .filter((nanny) => favorites.includes(nanny.id))
              .slice(0, visibleCount)
              .map((nanny) => {
                return (
                  <NannyCard
                    key={`${nanny.name}-${nanny.birthday}`}
                    nanny={nanny}
                    user={user}
                    onFavoriteToggle={refreshFavorites}
                  />
                )
              })}
          </ul>
        </>
      )}
      {/* {!isLoading&&favorites.includes(nanny.id)).length===0&&<p>You haven't added any nannies to your favorites yet.</p>}  */}
      {visibleCount < sortNannies.filter((nanny) => favorites.includes(nanny.id)).length && (
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

export default FavoritesPage
