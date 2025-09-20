import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Movie from '../pages/Movie/Movie'
// Importar páginas aqui quando criar

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        {/* Definir outras rotas aqui */}
      </Routes>
    </BrowserRouter>
  )
}