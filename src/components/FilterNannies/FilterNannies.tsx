import { useState } from 'react'
import styles from './FilterNannies.module.css'

interface FilterNanniesProps {
  currentFilter: string
  // eslint-disable-next-line no-unused-vars
  onFilterChange: (option: string) => void
}

const FilterNannies = ({ currentFilter, onFilterChange }: FilterNanniesProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const filterOptions = [
    'A to Z',
    'Z to A',
    'Less than 10$',
    'Greater than 10$',
    'Popular',
    'Not popular',
    'Show all',
  ]
  return (
    <div className={styles.filters}>
      <p className={styles.filtersText}>Filters</p>

      <div className={styles.dropdownWrapper}>
        <button
          type="button"
          className={styles.selectForm}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {currentFilter}
        </button>

        {isDropdownOpen && (
          <ul className={styles.selectPointsList}>
            {filterOptions.map((option) => (
              <li
                key={option}
                className={styles.selectPointItem}
                onClick={() => {
                  onFilterChange(option)
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
  )
}

export default FilterNannies
