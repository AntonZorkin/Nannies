import { User } from 'firebase/auth'

export interface LayoutProps {
  user: User | null
  // eslint-disable-next-line no-unused-vars
  setUser: (user: User | null) => void
}
