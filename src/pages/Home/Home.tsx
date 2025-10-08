import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback, useMemo } from 'react'; 
import useAxios from '../../hooks/useAxios'; 
import './Home.css'; 

interface Movie { id: number; title: string; poster_path: string; }
interface MovieListResponse { results: Movie[]; }

const Carousel = () => {
    const slides = useMemo(() => ([
        { id: 1, title: '101 Dálmatas II', linkTo: '/movie/8587', imageUrl: 'https://image.tmdb.org/t/p/original/k9tMAeSgaFASNedoxvyzMnTcilV.jpg' }, 
        { id: 2, title: 'Vida de Inseto', linkTo: '/movie/10191', imageUrl: 'https://image.tmdb.org/t/p/original/vvlbdBCuLt7nkQG7anNE6xHNbAO.jpg' },
        { id: 3, title: 'Aladdin', linkTo: '/movie/806', imageUrl: 'https://image.tmdb.org/t/p/original/qYB8MwE6AgLFe5ruBUmPA0RWRPY.jpg' },
    ]), []);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]); 

    const current = slides[currentSlide];

    useEffect(() => {
        setIsLoading(true);
        const img = new Image();
        img.src = current.imageUrl;
        img.onload = () => setIsLoading(false); 
        img.onerror = () => setIsLoading(false);
    }, [current.imageUrl]);

    useEffect(() => {
        const intervalId = setInterval(nextSlide, 2000); 
        return () => clearInterval(intervalId);
    }, [nextSlide]); 

    if (isLoading) {
         return (
             <div className="carousel-container loading-state">
                 <div className="slide-content"><h2>CARREGANDO IMAGEM...</h2></div>
                 <div className="dot-indicators">
                    {slides.map((_, index) => (
                        <span 
                            key={index} 
                            className={`dot-indicator ${index === currentSlide ? 'active' : ''}`} 
                            onClick={() => setCurrentSlide(index)} 
                        />
                    ))}
                </div>
             </div>
         )
    }

    return (
        <div className="carousel-container">
            <Link to={current.linkTo} className="carousel-link">
                <img 
                    src={current.imageUrl} 
                    alt={current.title} 
                    className="carousel-image" 
                />
            </Link>

            <div className="slide-content">
                <h2 className="carousel-title">{current.title}</h2>
            </div>
            
            
            <div className="dot-indicators">
                {slides.map((_, index) => (
                    <span 
                        key={index} 
                        className={`dot-indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

const MovieCard = ({ movie }: { movie: Movie }) => (
    <Link 
        to={`/movie/${movie.id}`}
        className="movie-card-link"
    >
        {movie.poster_path && (
            <img 
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
                alt={movie.title}
                className="movie-poster"
                loading="lazy" 
            />
        )}
        <p className="movie-title">
            {movie.title}
        </p>
    </Link>
);

interface MovieListProps { title: string; movies: Movie[]; fallbackMessage: string; id: string; }

const MovieList = ({ title, movies, fallbackMessage, id }: MovieListProps) => (
    <div id={id} className="movie-list-section">
        <h2 className="movie-list-title">{title}</h2>
        
        <div className="movie-list-grid">
            {movies.length > 0 ? (
                movies.slice(0, 20).map((movie) => ( 
                    <MovieCard key={movie.id} movie={movie} />
                ))
            ) : (
                <p className="movie-list-fallback">{fallbackMessage}</p>
            )}
        </div>
    </div>
);


export default function Home() {
    
    const { VITE_API_KEY: API_KEY } = import.meta.env; 
    const GENRE_ID_ANIMATION = 16;
    const ENDPOINT_BASE = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${GENRE_ID_ANIMATION}&sort_by=popularity.desc`;

    const today = new Date();
    const endDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; 

    const apiLinks = useMemo(() => ({
        link80s: `${ENDPOINT_BASE}&primary_release_date.gte=1980-01-01&primary_release_date.lte=1989-12-31`,
        link90s: `${ENDPOINT_BASE}&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31`,
        link2000s: `${ENDPOINT_BASE}&primary_release_date.gte=2000-01-01&primary_release_date.lte=2009-12-31`,
        link2020s: `${ENDPOINT_BASE}&primary_release_date.gte=2020-01-01&primary_release_date.lte=${endDate}`,
    }), [endDate, ENDPOINT_BASE]);


    const { data: data80s, loading: loading80s, error: error80s} = useAxios<MovieListResponse>(apiLinks.link80s, 'get', null);
    const { data: data90s, loading: loading90s, error: error90s } = useAxios<MovieListResponse>(apiLinks.link90s, 'get', null);
    const { data: data2000s, loading: loading2000s, error: error2000s } = useAxios<MovieListResponse>(apiLinks.link2000s, 'get', null);
    const { data: data2020s, loading: loading2020s, error: error2020s } = useAxios<MovieListResponse>(apiLinks.link2020s, 'get', null);

    const isLoading = loading80s || loading90s || loading2000s || loading2020s;
    const hasError = error80s || error90s || error2000s || error2020s;

    if (isLoading) {
        return <div className="loading-state"><h2>Carregando catálogos de animação...</h2></div>;
    }

    if (hasError) {
        return <div className="error-state">Erro ao carregar dados.</div>;
    }

    const filmesAnos80 = data80s?.results || [];
    const filmesAnos90 = data90s?.results || [];
    const filmesAnos2000 = data2000s?.results || [];
    const filmesAnos2020 = data2020s?.results || [];

    return (
        <div className="home-container">
            <Carousel />

            <MovieList 
                title="NOSTALGIA SUPREMA ANOS 80" movies={filmesAnos80}
                fallbackMessage="Nenhum clássico dos anos 80 foi encontrado." id="section-80s" 
            />
            <MovieList 
                title="DESENHOS ANOS 90" movies={filmesAnos90}
                fallbackMessage="Nenhum filme dos anos 90 encontrado." id="section-90s" 
            />
            <MovieList 
                title="NOSTALGIA DO ANO 2000" movies={filmesAnos2000}
                fallbackMessage="Nenhum filme dos anos 2000 encontrado." id="section-2000s" 
            />
            <MovieList 
                title="A NOVA GERAÇÃO ANOS 2020" movies={filmesAnos2020}
                fallbackMessage="Nenhum filme dos anos 2020 encontrado." id="section-2020s" 
            />
            
            <hr className="divider" />
        </div>
    );
}