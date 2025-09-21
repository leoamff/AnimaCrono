import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/header';

interface Usuario {
  id: string | number;
  nome: string;
  email: string;
}

export default function Perfil() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLogado = localStorage.getItem('animacrono_current_user');
    
    if (usuarioLogado) {
      setUsuario(JSON.parse(usuarioLogado));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('animacrono_current_user');
    navigate('/login');
  };

  if (!usuario) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <Header />    
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Bem-vindo ao AnimaCrono, {usuario.nome}!</h1>
        <div style={{ 
          background: '#f5f5f5', 
          padding: '20px', 
          borderRadius: '10px', 
          marginBottom: '20px' 
        }}>
          <h3>Seus dados:</h3>
          <p><strong>Nome:</strong> {usuario.nome}</p>
          <p><strong>E-mail:</strong> {usuario.email}</p>
          <p><strong>ID:</strong> {usuario.id}</p>
        </div>
        
        <button 
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Sair
        </button>
      </div>
    </div>
  )
}
