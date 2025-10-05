import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/logo.jpeg';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); 
    setError(null); 

    if (email === 'animacrono@uninassau.com' && password === 'senha123') {
      localStorage.setItem('animacrono_current_user', JSON.stringify({
        id: 'admin',
        nome: 'Administrador',
        email: 'animacrono@uninassau.com'
      }));
      navigate('/home');
      return;
    }

    const usuariosCadastrados = JSON.parse(localStorage.getItem('animacrono_users') || '[]');
    const usuarioEncontrado = usuariosCadastrados.find((user: any) => 
      user.email === email && user.password === password
    );

    if (usuarioEncontrado) {
      localStorage.setItem('animacrono_current_user', JSON.stringify({
        id: usuarioEncontrado.id,
        nome: usuarioEncontrado.nome,
        email: usuarioEncontrado.email
      }));
      navigate('/home');
    } else {
      setError('E-mail ou senha incorretos.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <img src={logo} alt="AnimaCrono Logo" className="login-logo" />
          <h2>Login</h2>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <button type="submit" className="login-button">Entrar</button>
        </form>
        <div className="login-footer">
          <p>Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
        </div>
      </div>
    </div>
  );
}