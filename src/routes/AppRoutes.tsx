import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Cadastro from '../pages/Cadastro/Cadastro'
// Importar páginas aqui quando criar

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          {/* Definir outras rotas aqui */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}