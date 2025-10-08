import './header.css';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import logo from '../../assets/logo.jpeg'; 

export default function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItens = useMemo(() => [
        { nome: "Início", rota: "/" },
        { nome: "Séries", rota: "/series" },
        { nome: "Filmes", rota: "/filmes" },
        { nome: "Minha Lista", rota: "/minha-lista" }
    ], []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        localStorage.setItem('animacrono_search', value);
        window.dispatchEvent(new CustomEvent('searchChanged', { detail: value }));
    };

    const toggleMobileMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const closeMobileMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="header-container"> 
                <div className="header-left">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="AnimaCrono Logo" className="header-logo-img"/>
                        </Link>
                        <span className="logo-name">ANIMACRONO</span>
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
                    
                    <button 
                        className="mobile-menu-btn"
                        onClick={toggleMobileMenu}
                        aria-label="Menu"
                    >
                        {isMenuOpen ? <IoCloseOutline size={28} /> : <IoMenuOutline size={28} />}
                    </button>
                </div>
            </div>
            
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