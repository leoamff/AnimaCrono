import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
// Importar páginas aqui quando criar

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="app">

        <div className="main-content" style={{ paddingTop: '60px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            {/* Definir outras rotas aqui */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}