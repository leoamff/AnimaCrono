import './header.css';
import { Link } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import { useState } from 'react';

export default function Header() {
    const [searchTerm, setSearchTerm] = useState('');

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

    return (
        <header className="header">
            <div className="header-container"> 
                <div className="header-left">
                    <div className="logo">
                        <Link to="/">
                            <h1>AnimaCrono</h1>
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
                </div>
            </div>
        </header>
    );
}