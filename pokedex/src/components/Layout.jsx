import { Outlet, NavLink } from 'react-router-dom'
import styles from './Layout.module.css'

export default function Layout() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.pokeball}>⬤</span>
          <span className={styles.logoText}>Pokédex</span>
        </NavLink>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            Pokédex
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            About
          </NavLink>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>Data from <a href="https://pokeapi.co" target="_blank" rel="noreferrer">PokéAPI</a> · Pokémon © Nintendo</p>
      </footer>
    </div>
  )
}
