import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import { LayoutProps as HeaderProps } from '../../types/auth'

export default function Header({ user }: HeaderProps) {
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
          {user && (
            <NavLink to="/favorites" className={styles.favorites}>
              Favorites
            </NavLink>
          )}
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

      <button aria-label="Open menu" className={styles.burger}>
        <svg>
          <use href="/public/sprite.svg#icon-burger" />
        </svg>
      </button>
    </header>
  )
}
