import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <NavLink to="/">Nanny.Services</NavLink>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/nannies">Nannies</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </nav>
      <button>Log In</button>
      <button>Registration</button>
    </header>
  )
}
