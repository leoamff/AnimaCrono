import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <div className="footer-logo-container">
                        <h2 className="footer-logo">AnimaCrono</h2>
                    </div>
                    <p className="footer-description">
                        Sua plataforma completa para descobrir, explorar e gerenciar seus filmes e séries favoritos.
                    </p>
                    <div className="social-links">
                        <a href="https://github.com/leoamff/AnimaCrono" aria-label="GitHub"><FaGithub /></a>
                        <a href="#" aria-label="Twitter"><FaTwitter /></a>
                        <a href="#" aria-label="Instagram"><FaInstagram /></a>
                    </div>
                </div>

                <div className="footer-section">
                    <h3 className="footer-title">Links Rápidos</h3>
                    <ul className="footer-links">
                        <li><Link to="/home">Início</Link></li>
                        <li><Link to="/perfil">Meu Perfil</Link></li>
                        <li><Link to="/minha-lista">Minha lista</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="footer-title">Desenvolvedores</h3>
                    <ul className="footer-links">
                      
                        <li><a href="https://www.linkedin.com/in/andrezza-coelho">Andrezza Coelho</a></li>
                        <li><a href="#">Gabriela</a></li>
                        <li><a href="#">Jeniffer</a></li>
                        <li><a href="https://www.linkedin.com/in/jcjulio20060">Julio César</a></li>
                        <li><a href="https://www.linkedin.com/in/leoamff">Leonardo Amyntas</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="footer-title">Contato</h3>
                    <div className="contact-info">
                        <div className="contact-item">
                            <FaEnvelope />
                            <span>contato@animacrono.com</span>
                        </div>
                        <div className="contact-item">
                            <FaPhone />
                            <span>+55 (81) 99999-9999</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-container">
                    <p>&copy; 2025 AnimaCrono. Todos os direitos reservados.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Política de Privacidade</a>
                        <a href="#">Termos de Uso</a>
                        <a href="#">Suporte</a>
                    </div>
                </div>
            </div>
        </footer>
    );  
}