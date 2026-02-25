import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.headerWrap}>
      <NavLink to="/" className={styles.title}>
        Nanny.Services
      </NavLink>
      <div className={styles.deskNav}>
        <nav className={styles.navigation}>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/nannies">Nannies</NavLink>
          <NavLink to="/favorites" className={styles.favorites}>
            Favorites
          </NavLink>
        </nav>
        <div className={styles.publicBtn}>
          <button>Log In</button>
          <button>Registration</button>
        </div>

        <div className={styles.privatBtn}>
          <svg width="32" height="32" style={{ background: 'white' }}>
            <use href="/public/sprite.svg#icon-person" />
          </svg>
          <button>Log out</button>
        </div>
      </div>

      <button aria-label="Open menu" className={styles.burger}>
        <svg width="24" height="24">
          <use href="/public/sprite.svg#icon-burger" />
        </svg>
      </button>
    </header>
  )
}
