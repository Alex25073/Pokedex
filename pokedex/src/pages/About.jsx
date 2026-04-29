import { Link } from 'react-router-dom'
import styles from './About.module.css'

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.pokeballDecor}>⬤</div>
        <h1 className={styles.title}>About This Pokédex</h1>
        <p className={styles.lead}>
          A modern Pokédex built with React, Vite, and powered by the PokéAPI.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.icon}>⚡</div>
          <h3>Built with Vite</h3>
          <p>Lightning-fast development experience with Hot Module Replacement and optimised production builds.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>⚛️</div>
          <h3>React + React Router</h3>
          <p>Component-driven UI with client-side routing via React Router's Hash Router for GitHub Pages compatibility.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>🌐</div>
          <h3>PokéAPI</h3>
          <p>All Pokémon data — sprites, stats, types, abilities, and more — is fetched live from the free PokéAPI REST service.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>📱</div>
          <h3>Responsive Design</h3>
          <p>Fully responsive layout that looks great on mobile, tablet, and desktop screens.</p>
        </div>
      </div>

      <div className={styles.features}>
        <h2 className={styles.featuresTitle}>Features</h2>
        <ul className={styles.featureList}>
          <li>Browse all 1025+ Pokémon with smooth pagination</li>
          <li>View detailed stats, types, abilities, height & weight</li>
          <li>Navigate between Pokémon directly from the detail view</li>
          <li>Colour-coded cards based on primary Pokémon type</li>
          <li>Animated sprites with floating effect</li>
        </ul>
      </div>

      <div className={styles.cta}>
        <Link to="/" className={styles.ctaBtn}>
          Start Exploring →
        </Link>
      </div>
    </div>
  )
}
