import { useEffect, useState } from 'react'
import styles from './App.module.css'
import Layout from './components/Layout'
import { subscribeToAuth } from './services/auth'
import { User } from 'firebase/auth'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NanniesPage from './pages/NanniesPage'
import FavoritesPage from './pages/FavoritesPage'

function App() {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const unsubscribe = subscribeToAuth((currentUser: any) => {
      setUser(currentUser)
    })
    return unsubscribe
  }, [])

  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Layout user={user} />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="nannies" element={user ? <NanniesPage /> : <Navigate to="/" />} />

        <Route path="favorites" element={user ? <FavoritesPage /> : <Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
