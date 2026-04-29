import { useNavigate } from 'react-router-dom'
import TypeBadge from './TypeBadge.jsx'
import styles from './PokemonCard.module.css'

const TYPE_BG = {
  fire: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
  water: 'linear-gradient(135deg, #4895EF 0%, #3A7BD5 100%)',
  grass: 'linear-gradient(135deg, #52B788 0%, #40916C 100%)',
  electric: 'linear-gradient(135deg, #F7B731 0%, #F9C74F 100%)',
  psychic: 'linear-gradient(135deg, #E83E8C 0%, #C2185B 100%)',
  ice: 'linear-gradient(135deg, #74C0FC 0%, #4FC3F7 100%)',
  dragon: 'linear-gradient(135deg, #6F42C1 0%, #5E35B1 100%)',
  dark: 'linear-gradient(135deg, #343A40 0%, #212529 100%)',
  fairy: 'linear-gradient(135deg, #FF8FAB 0%, #FF4D6D 100%)',
  normal: 'linear-gradient(135deg, #6C757D 0%, #495057 100%)',
  fighting: 'linear-gradient(135deg, #D62828 0%, #A00000 100%)',
  poison: 'linear-gradient(135deg, #9775FA 0%, #7950F2 100%)',
  ground: 'linear-gradient(135deg, #C9A84C 0%, #A07D2E 100%)',
  flying: 'linear-gradient(135deg, #74C0FC 0%, #4895EF 100%)',
  bug: 'linear-gradient(135deg, #74B816 0%, #5C940D 100%)',
  rock: 'linear-gradient(135deg, #9D8B70 0%, #7D6B50 100%)',
  ghost: 'linear-gradient(135deg, #6741D9 0%, #4C2C9E 100%)',
  steel: 'linear-gradient(135deg, #868E96 0%, #6C757D 100%)',
}

export default function PokemonCard({ pokemon }) {
  const navigate = useNavigate()
  const primaryType = pokemon.types[0]?.type.name || 'normal'
  const bg = TYPE_BG[primaryType] || TYPE_BG.normal
  const id = pokemon.id
  const sprite =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default

  return (
    <div
      className={styles.card}
      style={{ background: bg }}
      onClick={() => navigate(`/pokemon/${id}`)}
    >
      <div className={styles.number}>#{String(id).padStart(3, '0')}</div>
      <div className={styles.imgWrap}>
        {sprite && (
          <img
            src={sprite}
            alt={pokemon.name}
            className={styles.img}
            loading="lazy"
          />
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{pokemon.name}</h3>
        <div className={styles.types}>
          {pokemon.types.map(t => (
            <TypeBadge key={t.type.name} type={t.type.name} />
          ))}
        </div>
      </div>
    </div>
  )
}
