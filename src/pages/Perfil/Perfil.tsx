import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/header';
import './Perfil.css';

interface Usuario {
  id: string | number;
  nome: string;
  email: string;
}

export default function Perfil() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLogado = localStorage.getItem('animacrono_current_user');
    
    try {
      if (usuarioLogado) {
        setUsuario(JSON.parse(usuarioLogado) as Usuario); 
      } else {
        navigate('/login');
      }
    } catch (e) {
      console.error("Erro ao carregar dados do usuário:", e);
      navigate('/login'); 
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('animacrono_current_user');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="perfil-page">
        <Header />
        <div className="perfil-container" style={{ textAlign: 'center' }}>Carregando...</div>
      </div>
    );
  }

  if (!usuario) {
    return null;
  }

  return (
    <div className="perfil-page">
      <Header />    
      <div className="perfil-container">
        <h1>Bem-vindo ao AnimaCrono, {usuario.nome}!</h1>
        
        <div className="dados-usuario">
          <h3>Seus dados:</h3>
          <p><strong>Nome:</strong> {usuario.nome}</p>
          <p><strong>E-mail:</strong> {usuario.email}</p>
          <p><strong>ID:</strong> {usuario.id}</p>
        </div>
        
        <button 
          onClick={handleLogout}
          className="btn-logout"
        >
          Sair
        </button>
      </div>
    </div>
  )
}