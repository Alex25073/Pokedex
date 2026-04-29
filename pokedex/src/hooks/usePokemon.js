import { useState, useEffect } from 'react'

const LIMIT = 20

export function usePokemonList(page) {
  const [pokemon, setPokemon] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    const offset = page * LIMIT
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        setTotal(data.count)
        // Fetch details for sprites
        return Promise.all(
          data.results.map(p => fetch(p.url).then(r => r.json()))
        )
      })
      .then(details => {
        setPokemon(details)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [page])

  return { pokemon, total, loading, error, totalPages: Math.ceil(1025 / LIMIT) }
}

export function usePokemon(id) {
  const [data, setData] = useState(null)
  const [species, setSpecies] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    setData(null)
    setSpecies(null)

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then(pokemon => {
        setData(pokemon)
        return fetch(pokemon.species.url)
      })
      .then(res => res.json())
      .then(speciesData => {
        setSpecies(speciesData)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  return { data, species, loading, error }
}
