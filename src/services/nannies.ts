import { ref, get } from 'firebase/database'
import { db } from '../firebase'
import { Nanny } from '../types/nanny'

const fetchNannies = async (): Promise<Nanny[]> => {
  const nanniesRef = ref(db, 'public/nannies')
  const snapshot = await get(nanniesRef)
  if (snapshot.exists()) {
    const data = snapshot.val()
    return Array.isArray(data) ? data : Object.values(data)
  }
  return []
}

export default fetchNannies
