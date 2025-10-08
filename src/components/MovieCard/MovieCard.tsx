import { Link } from 'react-router-dom'; 
import type { movieInterface } from '../movieInterface/movieInterface';
import './MovieCard.css'

interface MovieCardProps {
    movie: movieInterface;
    contentType: 'movie' | 'tv'; 
}

// Componente
const MovieCard = ({ movie, contentType }: MovieCardProps) => (
    <Link 
        key={movie.id}
        // contentType verifica se o tipo é tv ou movie e garante o rotacionamento correto
        to={`/${contentType}/${movie.id}`}
        className="movie-card-link"
    >
        {movie.poster_path && (
            <img 
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="movie-poster"
            />
        )}
        <p className="movie-title">
            {/* varia entre title ou name a depender se for filme ou série,
            isso acontece porque a API distingue a nomeclatura do nome do conteúdo a depender do tipo de material [filme ou série]*/}
            {movie.title || movie.name}
        </p>
    </Link>
);

export default MovieCard;