import './header.css';
import { Link } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import logo from '../../assets/logo.jpeg'; 

export default function Header() {
    const menuItens = [
        { nome: "Início", rota: "/" },
        { nome: "Séries", rota: "/series" },
        { nome: "Filmes", rota: "/filmes" },
        { nome: "Minha Lista", rota: "/minha-lista" }
    ];

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
                        />
                    </div>
                    <Link to="/perfil"><BsPersonCircle size={32}/></Link>
                </div>
            </div>
        </header>
    );
}