import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Movie from '../pages/Movie/Movie' 
import Login from '../pages/Login/Login'
import Cadastro from '../pages/Cadastro/Cadastro'
import Perfil from '../pages/Perfil/Perfil'
import Filmes from '../pages/Filmes/Filmes'
import Series from '../pages/Series/Series'
import MyList from '../pages/MyList/MyList'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      {/* rota para filmes injetando contentType="movie" */}
      <Route path="/movie/:id" element={<Movie contentType="movie" />} /> 
      {/* rota para séries injetando contentType="tv" */}
      <Route path='/tv/:id' element={<Movie contentType="tv" />} /> 
      
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path='/filmes' element={<Filmes/>} />
      <Route path='/series' element={<Series/>} />
      <Route path='/mylist' element={<MyList/>} />
      {/* Definir outras rotas aqui */}
    </Routes>
  )
}