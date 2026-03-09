import { useEffect, useMemo, useState } from 'react'
import fetchNannies from '../services/nannies'
import { Nanny } from '../types/nanny'
import NannyCard from '../components/NannyCard/NannyCard'
import styles from '../styles/NanniesPage.module.css'

const NanniesPage = () => {
  const [nannies, setNannies] = useState<Nanny[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(3)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const data = await fetchNannies()
      console.log('Fetched data:', data)
      setNannies(data)
      setIsLoading(false)
    }
    getData()
  }, [])

  const [filter, setFilter] = useState('A to Z')
  const filterOptions = [
    'A to Z',
    'Z to A',
    'Less than 10$',
    'Greater than 10$',
    'Popular',
    'Not popular',
    'Show all',
  ]
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

        <div className={styles.dropdownWrapper}>
          <button
            type="button"
            className={styles.selectForm}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {filter}
          </button>

          {isDropdownOpen && (
            <ul className={styles.selectPointsList}>
              {filterOptions.map((option) => (
                <li
                  key={option}
                  className={styles.selectPointItem}
                  onClick={() => {
                    setFilter(option)
                    setIsDropdownOpen(false)
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
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
