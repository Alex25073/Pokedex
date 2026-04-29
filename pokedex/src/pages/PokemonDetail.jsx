import { useParams, useNavigate } from 'react-router-dom'
import { usePokemon } from '../hooks/usePokemon.js'
import TypeBadge from '../components/TypeBadge.jsx'
import styles from './PokemonDetail.module.css'

const STAT_COLORS = {
  hp: '#FF6B6B',
  attack: '#FF6B35',
  defense: '#F7B731',
  'special-attack': '#4895EF',
  'special-defense': '#52B788',
  speed: '#FF8FAB',
}

const STAT_LABELS = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SP.ATK',
  'special-defense': 'SP.DEF',
  speed: 'SPD',
}

function StatBar({ name, value }) {
  const color = STAT_COLORS[name] || '#adb5bd'
  const label = STAT_LABELS[name] || name
  const pct = Math.min((value / 255) * 100, 100)
  return (
    <div className={styles.statRow}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
      <div className={styles.statBarTrack}>
        <div
          className={styles.statBarFill}
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  )
}

export default function PokemonDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, species, loading, error } = usePokemon(id)

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Loading Pokémon data…</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className={styles.error}>
        <p>⚠️ Could not find this Pokémon.</p>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>← Go Back</button>
      </div>
    )
  }

  const sprite =
    data.sprites?.other?.['official-artwork']?.front_default ||
    data.sprites?.front_default

  const description = species?.flavor_text_entries
    ?.find(e => e.language.name === 'en')
    ?.flavor_text?.replace(/\f|\n/g, ' ') || ''

  const genus = species?.genera?.find(g => g.language.name === 'en')?.genus || ''

  const prevId = data.id > 1 ? data.id - 1 : null
  const nextId = data.id < 1025 ? data.id + 1 : null

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.card}>
        {/* Left: image + name */}
        <div className={styles.left}>
          <div className={styles.idBadge}>#{String(data.id).padStart(3, '0')}</div>
          {sprite && (
            <img src={sprite} alt={data.name} className={styles.sprite} />
          )}
          <h1 className={styles.name}>{data.name}</h1>
          {genus && <p className={styles.genus}>{genus}</p>}
          <div className={styles.types}>
            {data.types.map(t => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>
          {description && (
            <p className={styles.description}>{description}</p>
          )}
        </div>

        {/* Right: stats + info */}
        <div className={styles.right}>
          {/* Physical */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Profile</h2>
            <div className={styles.profileGrid}>
              <div className={styles.profileItem}>
                <span className={styles.profileLabel}>Height</span>
                <span className={styles.profileValue}>{(data.height / 10).toFixed(1)} m</span>
              </div>
              <div className={styles.profileItem}>
                <span className={styles.profileLabel}>Weight</span>
                <span className={styles.profileValue}>{(data.weight / 10).toFixed(1)} kg</span>
              </div>
              <div className={styles.profileItem}>
                <span className={styles.profileLabel}>Base EXP</span>
                <span className={styles.profileValue}>{data.base_experience ?? '—'}</span>
              </div>
              <div className={styles.profileItem}>
                <span className={styles.profileLabel}>Generation</span>
                <span className={styles.profileValue}>
                  {species?.generation?.name?.replace('generation-', '').toUpperCase() ?? '—'}
                </span>
              </div>
            </div>
          </div>

          {/* Abilities */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Abilities</h2>
            <div className={styles.abilities}>
              {data.abilities.map(a => (
                <span key={a.ability.name} className={`${styles.ability} ${a.is_hidden ? styles.hidden : ''}`}>
                  {a.ability.name.replace(/-/g, ' ')}
                  {a.is_hidden && <span className={styles.hiddenTag}>hidden</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Base Stats</h2>
            <div className={styles.stats}>
              {data.stats.map(s => (
                <StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat} />
              ))}
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalValue}>
                  {data.stats.reduce((sum, s) => sum + s.base_stat, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation between pokemon */}
      <div className={styles.navRow}>
        {prevId ? (
          <button className={styles.navBtn} onClick={() => navigate(`/pokemon/${prevId}`)}>
            ← #{String(prevId).padStart(3, '0')}
          </button>
        ) : <div />}
        {nextId ? (
          <button className={styles.navBtn} onClick={() => navigate(`/pokemon/${nextId}`)}>
            #{String(nextId).padStart(3, '0')} →
          </button>
        ) : <div />}
      </div>
    </div>
  )
}
