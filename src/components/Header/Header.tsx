import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import { LayoutProps as HeaderProps } from '../../types/auth'
import { useEffect, useState } from 'react'

export default function Header({ user }: HeaderProps) {
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
  return (
    <header className={styles.headerWrap + ' ' + (user ? styles.privat : styles.public)}>
      <NavLink to="/" className={styles.title}>
        Nanny.Services
      </NavLink>
      <div className={styles.deskNav + ' ' + (user ? styles.privat : styles.public)}>
        <nav className={styles.navigation}>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/nannies">Nannies</NavLink>
          {user && <NavLink to="/favorites">Favorites</NavLink>}
        </nav>
        {!user && (
          <div className={styles.publicBtns}>
            <button className={styles.logInBtn}>Log In</button>
            <button className={styles.registrationBtn}>Registration</button>
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
                <use href="/public/sprite.svg#icon-person" />
              </svg>
              <p className={styles.userName}>{'user.name'}</p>
            </div>

            <button className={styles.logOutnBtn}>Log out</button>
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
              <button className={styles.logInBtn}>Log In</button>
              <button className={styles.registrationBtn}>Registration</button>
            </div>
          )}
          {user && (
            <div className={styles.privatBtns}>
              <button className={styles.logOutnBtn}>Log out</button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
