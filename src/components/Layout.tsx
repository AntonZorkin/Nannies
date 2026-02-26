import Header from './Header/Header'
import { Outlet } from 'react-router-dom'
import { LayoutProps } from '../types/auth'

export default function Layout({ user }: LayoutProps) {
  return (
    <>
      <Header user={user} />
      <Outlet />
    </>
  )
}
