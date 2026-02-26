import Header from './Header/Header'
import { Outlet } from 'react-router-dom'
import { LayoutProps } from '../types/auth'
import styles from '../App.module.css'

export default function Layout({ user }: LayoutProps) {
  return (
    <div className={user ? styles.layoutPrivat : styles.layoutPublic}>
      <Header user={user} />
      <Outlet />
    </div>
  )
}
