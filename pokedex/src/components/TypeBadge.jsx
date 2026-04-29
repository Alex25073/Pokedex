import styles from './TypeBadge.module.css'

const TYPE_COLORS = {
  fire: '#FF6B35',
  water: '#4895EF',
  grass: '#52B788',
  electric: '#F7B731',
  psychic: '#E83E8C',
  ice: '#74C0FC',
  dragon: '#6F42C1',
  dark: '#343A40',
  fairy: '#FF8FAB',
  normal: '#6C757D',
  fighting: '#D62828',
  poison: '#9775FA',
  ground: '#C9A84C',
  flying: '#74C0FC',
  bug: '#74B816',
  rock: '#9D8B70',
  ghost: '#6741D9',
  steel: '#868E96',
}

export default function TypeBadge({ type }) {
  const color = TYPE_COLORS[type] || '#6C757D'
  return (
    <span
      className={styles.badge}
      style={{ background: color }}
    >
      {type}
    </span>
  )
}
