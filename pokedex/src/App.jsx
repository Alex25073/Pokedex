import { createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Pokedex from './pages/Pokedex.jsx'
import PokemonDetail from './pages/PokemonDetail.jsx'
import About from './pages/About.jsx'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Pokedex /> },
      { path: 'pokemon/:id', element: <PokemonDetail /> },
      { path: 'about', element: <About /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
