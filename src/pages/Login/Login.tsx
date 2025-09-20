import { Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <img src="/logo.png" alt="AnimaCrono Logo" className="login-logo" />
          <h2>Login</h2>
        </div>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              required
            />
          </div>
          <button type="submit" className="login-button"><Link to="/home">Entrar</Link></button>
        </form>
        <div className="login-footer">
          <p>Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
        </div>
      </div>
    </div>
  );
}