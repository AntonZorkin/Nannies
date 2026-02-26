import { useEffect, useState } from 'react'
import styles from './App.module.css'
import Layout from './components/Layout'
import { subscribeToAuth } from './services/auth'
import { User } from 'firebase/auth'

function App() {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const unsubscribe = subscribeToAuth((currentUser: any) => {
      if (currentUser !== null) {
        setUser(currentUser)
      } else {
        setUser(null)
      }
    })
    return unsubscribe
  }, [])

  return (
    <div className={styles.container}>
      <Layout user={user} />
    </div>
  )
}

export default App
