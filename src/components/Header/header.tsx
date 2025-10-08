import './header.css';
import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import logo from '../../assets/logo.jpeg'; 

export default function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const savedSearch = localStorage.getItem('animacrono_search') || '';
        setSearchTerm(savedSearch);

        const handleClearSearch = () => {
            const currentSearch = localStorage.getItem('animacrono_search') || '';
            setSearchTerm(currentSearch);
        };

        window.addEventListener('searchCleared', handleClearSearch);
        
        return () => {
            window.removeEventListener('searchCleared', handleClearSearch);
        };
    }, []);
    
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

    const clearSearch = () => {
        setSearchTerm('');
        localStorage.removeItem('animacrono_search');
        window.dispatchEvent(new CustomEvent('searchChanged', { detail: '' }));
        window.dispatchEvent(new CustomEvent('searchCleared'));
    };

    const handleNavClick = () => {
        clearSearch();
        closeMobileMenu();
    };

    return (
        <header className="header">
            <div className="header-container"> 
                <div className="header-left">
                    <div className="logo">
                        <Link to="/" onClick={clearSearch}>
                            <img src={logo} alt="AnimaCrono Logo" className="header-logo-img"/>
                        </Link>
                        <span className="logo-name">ANIMACRONO</span>
                    </div>
                    <nav className="desktop-nav">
                        <ul className="menu">
                        {menuItens.map((item, index) => (
                            <li key={index}>
                                <Link to={item.rota} onClick={handleNavClick}>{item.nome}</Link>
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
                    <Link to="/perfil" onClick={clearSearch}><BsPersonCircle size={32}/></Link>
                    
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
                                <Link to={item.rota} onClick={handleNavClick}>
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