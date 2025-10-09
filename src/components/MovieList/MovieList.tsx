import MovieCard from '../MovieCard/MovieCard'; 
import type { movieInterface } from '../movieInterface/movieInterface';
import './MovieList.css'


// --- 1. INTERFACES E TIPOS ---
interface MovieListProps {
    title: string;
    movies: movieInterface[]; 
    fallbackMessage: string;
    id: string;
    contentType: 'movie' | 'tv'; // diferencia serie de filme
}

// --- 2. COMPONENTE LISTA DE FILMES ---
const MovieList = ({ title, movies, fallbackMessage, id, contentType }: MovieListProps) => (
    <div id={id} className="movie-list-section">
        <h2 className="movie-list-title">
            {title}
        </h2>
        
        <div className="movie-list-grid">
            {movies.length > 0 ? (
                // Limita a exibição dos filmes a 20
                movies.slice(0, 20).map((movie) => ( 
                    <MovieCard key={movie.id} movie={movie} contentType={contentType} /> // Repassando a prop de tipo de conteúdo para o MovieCard
                ))
            ) : (
                <p className="movie-list-fallback">{fallbackMessage}</p>
            )}
        </div>
    </div>
);

export default MovieList;