import { useEffect, useMemo, useState } from 'react'
import fetchNannies from '../services/nannies'
import { Nanny } from '../types/nanny'
import NannyCard from '../components/NannyCard/NannyCard'
import styles from '../styles/NanniesPage.module.css'
import { useId } from 'react'

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

  const selectId = useId()
  const [filter, setFilter] = useState('A to Z')
  const sortNannies = useMemo(() => {
    switch (filter) {
      case 'A to Z':
        return [...nannies].sort((a, b) => a.name.localeCompare(b.name))

      case 'Z to A':
        return [...nannies].sort((a, b) => b.name.localeCompare(a.name))

      case 'Less than 10$':
        return [...nannies].filter((nanny) => nanny.price_per_hour <= 10)

      case 'Greater than 10$':
        return [...nannies].filter((nanny) => nanny.price_per_hour > 10)

      case 'Popular':
        return [...nannies].sort((a, b) => b.rating - a.rating)

      case 'Not popular':
        return [...nannies].sort((a, b) => a.rating - b.rating)

      default:
        return nannies
    }
  }, [nannies, filter])

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <p className={styles.filtersText}>Filters</p>

        <select
          className={styles.selectForm}
          id={selectId}
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option className={styles.selectPoints} value="A to Z">
            A to Z
          </option>
          <option className={styles.selectPoints} value="Z to A">
            Z to A
          </option>
          <option className={styles.selectPoints} value="Less than 10$">
            Less than 10$
          </option>
          <option className={styles.selectPoints} value="Greater than 10$">
            Greater than 10$
          </option>
          <option className={styles.selectPoints} value="Popular">
            Popular
          </option>
          <option className={styles.selectPoints} value="Not popular">
            Not popular
          </option>
          <option className={styles.selectPoints} value="Show all">
            Show all
          </option>
        </select>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className={styles.nanniesList}>
          {sortNannies.slice(0, visibleCount).map((nanny) => {
            return <NannyCard key={`${nanny.name}-${nanny.birthday}`} nanny={nanny} />
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
