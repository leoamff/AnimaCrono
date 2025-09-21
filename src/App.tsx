import { BrowserRouter, useLocation } from 'react-router-dom'
import Header from './components/Header/header'
import Footer from './components/Footer/Footer'
import AppRoutes from './routes/AppRoutes'

function AppContent() {
  const location = useLocation()
  
  const paginasSemLayout = ['/login', '/cadastro']
  const esconderLayout = paginasSemLayout.includes(location.pathname)

  if (esconderLayout) {
    return <AppRoutes />
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      
      <main style={{ 
        flex: 1,
        paddingTop: '60px' 
      }}>
        <AppRoutes />
      </main>
      
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
