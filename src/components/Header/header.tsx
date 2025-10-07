import './header.css';
import { Link } from 'react-router-dom';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import { useState } from 'react';

// 1. IMPORTAÇÃO DA IMAGEM DO LOGO
// Ajuste o caminho '../assets/logo.png' conforme a localização exata do seu arquivo
import logo from '../../assets/logo.jpeg'; 


export default function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItens = [
        { nome: "Início", rota: "/" },
        { nome: "Séries", rota: "/series" },
        { nome: "Filmes", rota: "/filmes" },
        { nome: "Minha Lista", rota: "/minha-lista" }
    ];

    // Salva no localStorage quando digita
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        localStorage.setItem('animacrono_search', value);
        
        // Dispara evento customizado para avisar outros componentes
        window.dispatchEvent(new CustomEvent('searchChanged', { detail: value }));
    };

    // Toggle do menu mobile
    const toggleMobileMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Fechar menu quando clicar em um link
    const closeMobileMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="header-container"> 
                <div className="header-left">
                    <div className="logo">
                        <Link to="/">
                            {/* 2. SUBSTITUIÇÃO AQUI: <h1> foi trocado por <img> */}
                            <img src={logo} alt="AnimaCrono Logo" className="header-logo-img"/>
                        </Link>
                    </div>
                    <nav className="desktop-nav">
                        <ul className="menu">
                        {menuItens.map((item, index) => (
                            <li key={index}>
                                <Link to={item.rota}>{item.nome}</Link>
                            </li>
                        ))}
                        </ul>
                    </nav>
                </div>
                
                <div className="header-right">
                    <div className="search-container">
                        <IoSearchOutline className="search-icon" size={20}/>
                        <input 
                            type="text" 
                            placeholder="Buscar filmes..." 
                            className="search-input"
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                    </div>
                    <Link to="/perfil"><BsPersonCircle size={32}/></Link>
                    
                    {/* Botão Hambúrguer */}
                    <button 
                        className="mobile-menu-btn"
                        onClick={toggleMobileMenu}
                        aria-label="Menu"
                    >
                        {isMenuOpen ? <IoCloseOutline size={28} /> : <IoMenuOutline size={28} />}
                    </button>
                </div>
            </div>
            
            {/* Menu Mobile */}
            {isMenuOpen && (
                <nav className="mobile-nav">
                    <ul className="mobile-menu">
                        {menuItens.map((item, index) => (
                            <li key={index}>
                                <Link to={item.rota} onClick={closeMobileMenu}>
                                    {item.nome}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    );
}