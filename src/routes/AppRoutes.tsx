import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Movie from '../pages/Movie/Movie'
import Login from '../pages/Login/Login'
import Cadastro from '../pages/Cadastro/Cadastro'
import Perfil from '../pages/Perfil/Perfil'
// Importar páginas aqui quando criar

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/movie/:id" element={<Movie />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/perfil" element={<Perfil />} />
      {/* Definir outras rotas aqui */}
    </Routes>
  )
}