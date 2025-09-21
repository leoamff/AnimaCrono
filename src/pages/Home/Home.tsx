import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container" style={{ padding: '20px' }}>
      <h1>Bem-vindo ao AnimaCrono!</h1>
      <p>Conteúdo da página principal</p>
      
      <div style={{ marginTop: '30px' }}>
        <Link 
          to="/movie/550"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#e50914',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px',
            transition: 'all 0.3s ease',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f40612';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(229, 9, 20, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#e50914';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          🎬 Ver Filme de Exemplo
        </Link>
      </div>
    </div>
  )
}
