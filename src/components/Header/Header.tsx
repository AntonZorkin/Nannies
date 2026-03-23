import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { LayoutProps as HeaderProps } from '../../types/auth'
import { useEffect, useState } from 'react'
import Modal from '../Modal/Modal'
import { logout } from '../../services/auth'

export default function Header({ user, setUser }: HeaderProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [barIsOpen, setBarIsOpen] = useState(false)
  function openBar() {
    setBarIsOpen(!barIsOpen)
  }
  useEffect(() => {
    if (barIsOpen) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [barIsOpen])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isRegister, setIsRegister] = useState(false)

  const handleOpenSignUp = () => {
    setBarIsOpen(false)
    setIsRegister(true)
    setModalIsOpen(true)
  }
  const handleOpenLogIn = () => {
    setBarIsOpen(false)
    setIsRegister(false)
    setModalIsOpen(true)
  }
  const handleLogOut = async () => {
    try {
      await logout()
      localStorage.removeItem('user')
      setUser(null)
      setBarIsOpen(false)
      navigate('/')
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error details:', error)
      }
    }
  }

  return (
    <header
      className={styles.headerWrap + ' ' + (pathname !== '/' ? styles.privat : styles.public)}
    >
      <NavLink to="/" className={styles.title} aria-label="Nanny Services Home Page">
        Nanny.Services
      </NavLink>
      <div className={styles.deskNav + ' ' + (user ? styles.privat : styles.public)}>
        <nav className={styles.navigation}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/nannies"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Nannies
          </NavLink>
          {user && (
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Favorites
            </NavLink>
          )}
        </nav>
        {!user && (
          <div className={styles.publicBtns}>
            <button className={styles.logInBtn} onClick={handleOpenLogIn}>
              Log In
            </button>
            <button className={styles.registrationBtn} onClick={handleOpenSignUp}>
              Registration
            </button>
          </div>
        )}

        {user && (
          <div className={styles.privatBtns}>
            <div className={styles.userNameWrap}>
              <svg
                className={styles.iconWrap}
                width="16"
                height="16"
                style={{ background: 'white' }}
              >
                <use href="/sprite.svg#icon-person" />
              </svg>
              <p className={styles.userName}>{user?.displayName}</p>
            </div>

            <button className={styles.logOutnBtn} onClick={handleLogOut}>
              Log out
            </button>
          </div>
        )}
      </div>

      <button aria-label="Open menu" className={styles.burger} onClick={openBar}>
        <svg>
          <use href="/sprite.svg#icon-burger" />
        </svg>
      </button>
      {barIsOpen && (
        <div className={styles.barIsOpenWrap}>
          <button aria-label="Close menu" onClick={openBar} className={styles.closeBtn}>
            &times;
          </button>
          <nav className={styles.barNavigation}>
            <NavLink to="/" end className={styles.barNavLinks} onClick={openBar}>
              Home
            </NavLink>
            <NavLink to="/nannies" className={styles.barNavLinks} onClick={openBar}>
              Nannies
            </NavLink>
            {user && (
              <NavLink to="/favorites" className={styles.barNavLinks} onClick={openBar}>
                Favorites
              </NavLink>
            )}
          </nav>
          {!user && (
            <div className={styles.barPublicBtns}>
              <button className={styles.logInBtn} onClick={handleOpenLogIn}>
                Log In
              </button>
              <button className={styles.registrationBtn} onClick={handleOpenSignUp}>
                Registration
              </button>
            </div>
          )}
          {user && (
            <div className={styles.privatBtns}>
              <button className={styles.logOutnBtn} onClick={handleLogOut}>
                Log out
              </button>
            </div>
          )}
        </div>
      )}
      {modalIsOpen && (
        <Modal openModal={() => setModalIsOpen(false)} isRegister={isRegister} setUser={setUser} />
      )}
    </header>
  )
}
