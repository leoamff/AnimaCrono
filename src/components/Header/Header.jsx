import React, { useState } from "react";
import './Header.css';
import { IoSearchOutline, IoMenuOutline } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";

export default function Header() {
    const menuItens = ["Início", "Séries", "Filmes", "Minha Lista"];
    const [menuAberto, setMenuAberto] = useState(false);
  
    const trocarMenu = () => {
        setMenuAberto(!menuAberto);
    };

    const fecharMenu = () => {
        setMenuAberto(false);
    };

    return (
        <header className="header">
        <div className="header-container"> 
            <div className="header-left">
            <div className="logo">
                <h1>AnimaCrono</h1>
            </div>
            <nav className="desktop-nav">
                <ul className="menu">
                {menuItens.map((item, index) => (
                    <li key={index}>
                    <a href={`#${item.toLowerCase().replace(' ', '-')}`}>{item}</a>
                    </li>
                ))}
                </ul>
            </nav>
            </div>

            <div className="header-right">
            <button 
                className="mobile-btn"
                onClick={trocarMenu}
            >
                <IoMenuOutline size={24} />
            </button>
            
            <a href="#"><IoSearchOutline size={20} /></a>
            <a href="#"><BsPersonCircle size={20} /></a>
            </div>
        </div>
        
        {menuAberto && (
            <div className="mobile-dropdown">
            {menuItens.map((item, index) => (
                <a 
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={fecharMenu}
                >
                {item}
                </a>
            ))}
            </div>
        )}
        </header>
    );
}