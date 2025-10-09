import useAxios from '../../hooks/useAxios'; 
import './Filmes.css'; 
import Carousel from '../../components/Carousel/Carousel'
import MovieList from '../../components/MovieList/MovieList';
import type { movieInterface } from '../../components/movieInterface/movieInterface';

interface MovieListResponse {
    results: movieInterface[];
}

export default function Filmes() {
    const API_KEY = import.meta.env.VITE_API_KEY; 
    const GENRE_ID_ANIMATION = 16; 
    const MIN_VOTES = 500; 

    const today = new Date();
    const endDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; 

    // URL da api focadas em séries por décadas
    const linkMelhores80s = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${GENRE_ID_ANIMATION}&primary_release_date.gte=1980-01-01&primary_release_date.lte=1989-12-31&sort_by=vote_average.desc&vote_count.gte=${MIN_VOTES}`;
    const linkMelhores90s = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${GENRE_ID_ANIMATION}&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31&sort_by=vote_average.desc&vote_count.gte=${MIN_VOTES}`;
    const linkMelhores2000s = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${GENRE_ID_ANIMATION}&primary_release_date.gte=2000-01-01&primary_release_date.lte=2009-12-31&sort_by=vote_average.desc&vote_count.gte=${MIN_VOTES}`;
    const linkMelhores2020s = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${GENRE_ID_ANIMATION}&primary_release_date.gte=2020-01-01&primary_release_date.lte=${endDate}&sort_by=vote_average.desc&vote_count.gte=${MIN_VOTES}`;
    
    // Chamadas de API
    const { data: data80s, loading: loading80s, error: error80s} = useAxios<MovieListResponse>(linkMelhores80s, 'get', null);
    const { data: data90s, loading: loading90s, error: error90s } = useAxios<MovieListResponse>(linkMelhores90s, 'get', null);
    const { data: data2000s, loading: loading2000s, error: error2000s } = useAxios<MovieListResponse>(linkMelhores2000s, 'get', null);
    const { data: data2020s, loading: loading2020s, error: error2020s } = useAxios<MovieListResponse>(linkMelhores2020s, 'get', null);

    // Condição de Carregamento e Erro
    if (loading80s || loading90s || loading2000s || loading2020s) {
        return <div className="loading-state"><h2>Carregando Catálogo AnimaCrono...</h2></div>;
    }

    if (error80s || error90s || error2000s || error2020s) {
        return <div className="error-state">Erro ao carregar os dados de animações.</div>;
    }

    // Extração dos Dados
    const filmesAnos80 = data80s?.results || [];
    const filmesAnos90 = data90s?.results || [];
    const filmesAnos2000 = data2000s?.results || [];
    const filmesAnos2020 = data2020s?.results || [];

    //renderização
    return (
    <div className="filmes-page">
        <Carousel></Carousel>
        <div className="filmes-container">
            <MovieList 
                title="FILMES CLÁSSICOS DOS ANOS 80"
                movies={filmesAnos80}
                fallbackMessage="Nenhum filme dos anos 80 com alta avaliação encontrado."
                id="section-best-80s"
                contentType='movie'
            />
            <MovieList 
                title="GERAÇÃO 90: OS LENDÁRIOS"
                movies={filmesAnos90}
                fallbackMessage="Nenhum filme dos anos 90 com alta avaliação encontrado."
                id="section-best-90s"
                contentType='movie' 
            />
            <MovieList 
                title="2000s: CULTS E BONS"
                movies={filmesAnos2000}
                fallbackMessage="Nenhum filme dos anos 2000 com alta avaliação encontrado."
                id="section-best-2000s"
                contentType='movie'
            />
            <MovieList 
                title="OS RECENTES E FAVORITOS"
                movies={filmesAnos2020}
                fallbackMessage="Nenhum lançamento recente com alta avaliação encontrado."
                id="section-best-2020s"
                contentType='movie'
            />
        </div>
    </div>
    );
}