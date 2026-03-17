import { ref, get } from 'firebase/database'
import { db } from '../firebase'
import { Nanny } from '../types/nanny'

const fetchNannies = async (): Promise<Nanny[]> => {
  const nanniesRef = ref(db, 'public')
  const snapshot = await get(nanniesRef)
  if (snapshot.exists()) {
    const data = snapshot.val()
    return Object.entries(data).map(([key, value]: [string, any]) => ({
      ...value,
      id: value.id || key,
    }))
  }
  return []
}

export default fetchNannies
