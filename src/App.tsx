import { useEffect, useState } from 'react'
import styles from './App.module.css'
import Layout from './components/Layout'
import { subscribeToAuth } from './services/auth'
import { User } from 'firebase/auth'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NanniesPage from './pages/NanniesPage'
import FavoritesPage from './pages/FavoritesPage'
import { Toaster } from 'react-hot-toast'

function App() {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const unsubscribe = subscribeToAuth((currentUser: any) => {
      setUser(currentUser)
    })
    return unsubscribe
  }, [])

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Layout user={user} setUser={setUser} />}>
            <Route index element={<HomePage user={user} />} />
            <Route path="nannies" element={user ? <NanniesPage /> : <Navigate to="/" />} />
            <Route path="favorites" element={user ? <FavoritesPage /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
