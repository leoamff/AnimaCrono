import './header.css';
import { Link } from 'react-router-dom';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import { useState, useEffect } from 'react';
import logo from '../../assets/logo.jpeg'; 


export default function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Carrega o termo de pesquisa salvo no localStorage
    useEffect(() => {
        const savedSearch = localStorage.getItem('animacrono_search') || '';
        setSearchTerm(savedSearch);

        // Escuta eventos de limpeza de pesquisa vindos de outros componentes
        const handleClearSearch = () => {
            const currentSearch = localStorage.getItem('animacrono_search') || '';
            setSearchTerm(currentSearch);
        };

        window.addEventListener('searchCleared', handleClearSearch);
        
        return () => {
            window.removeEventListener('searchCleared', handleClearSearch);
        };
    }, []);

    const menuItens = [
        { nome: "Início", rota: "/" },
        { nome: "Séries", rota: "/series" },
        { nome: "Filmes", rota: "/filmes" },
        { nome: "Minha Lista", rota: "/mylist" },
        { nome: "Perfil", rota: "/perfil" }
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

    // Limpar pesquisa quando navegar
    const clearSearch = () => {
        setSearchTerm('');
        localStorage.removeItem('animacrono_search');
        
        // Dispara eventos para atualizar outros componentes
        window.dispatchEvent(new CustomEvent('searchChanged', { detail: '' }));
        window.dispatchEvent(new CustomEvent('searchCleared'));
    };

    // Função combinada para links de navegação
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