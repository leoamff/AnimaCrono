import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cadastro.css';
import logo from '../../assets/logo.jpeg';

export default function Cadastro() {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); 
    setError(null);
    setSuccess(null);

    if (!nome || !email || !password || !confirmPassword) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    const usuariosExistentes = JSON.parse(localStorage.getItem('animacrono_users') || '[]');
    const emailExiste = usuariosExistentes.find((user: any) => user.email === email);
    
    if (emailExiste) {
      setError('Este e-mail já está cadastrado.');
      return;
    }

    const novoUsuario = {
      id: Date.now(), 
      nome,
      email,
      password 
    };

    usuariosExistentes.push(novoUsuario);
    localStorage.setItem('animacrono_users', JSON.stringify(usuariosExistentes));

    setSuccess('Cadastro realizado com sucesso! Redirecionando...');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <div className="cadastro-header">
          <img src={logo} alt="AnimaCrono Logo" className="cadastro-logo" />
          <h2>Cadastro</h2>
        </div>
        <form className="cadastro-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          
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
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="cadastro-button">Cadastrar</button>
        </form>
        <div className="cadastro-footer">
          <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
        </div>
      </div>
    </div>
  );
}