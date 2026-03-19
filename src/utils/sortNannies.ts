import { useMemo } from 'react'
import { Nanny } from '../types/nanny'

interface UseSortedNanniesProps {
  nannies: Nanny[]
  filter: string
}

const useSortedNannies = ({ nannies, filter }: UseSortedNanniesProps) => {
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
  return sortNannies
}

export default useSortedNannies
