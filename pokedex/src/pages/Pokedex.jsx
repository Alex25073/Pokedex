import { useState } from 'react'
import { usePokemonList } from '../hooks/usePokemon.js'
import PokemonCard from '../components/PokemonCard.jsx'
import styles from './Pokedex.module.css'

export default function Pokedex() {
  const [page, setPage] = useState(0)
  const { pokemon, loading, error, totalPages } = usePokemonList(page)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Pokédex</h1>
        <p className={styles.subtitle}>
          Browse all Pokémon from the original 151 to the latest generations
        </p>
      </div>

      {error && (
        <div className={styles.error}>
          ⚠️ Failed to load Pokémon: {error}
        </div>
      )}

      {loading ? (
        <div className={styles.loadingGrid}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {pokemon.map(p => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}

      <div className={styles.pagination}>
        <button
          className={styles.pageBtn}
          onClick={() => setPage(p => p - 1)}
          disabled={page === 0 || loading}
        >
          ← Previous
        </button>
        <div className={styles.pageInfo}>
          <span className={styles.pageNum}>Page {page + 1}</span>
          <span className={styles.pageTotal}>of {totalPages}</span>
        </div>
        <button
          className={styles.pageBtn}
          onClick={() => setPage(p => p + 1)}
          disabled={page >= totalPages - 1 || loading}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
