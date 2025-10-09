import useAxios from '../../hooks/useAxios';
import MovieList from '../../components/MovieList/MovieList';
import type { movieInterface } from '../../components/movieInterface/movieInterface';
import Carousel from '../../components/Carousel/Carousel'
import './Series.css'; 

interface SeriesListResponse {
    results: movieInterface[];
}

export default function Series() {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const GENRE_ID_ANIMATION = 16;
    const MIN_VOTES = 500;
    const today = new Date();
    const endDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // Filtragem feita por qualidade, votos e décadas
    const linkMelhores80s = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=pt-BR&with_genres=${GENRE_ID_ANIMATION}&first_air_date.gte=1980-01-01&first_air_date.lte=1989-12-31&sort_by=vote_average.desc&vote_count.gte=${MIN_VOTES}`;
    const linkMelhores90s = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=pt-BR&with_genres=${GENRE_ID_ANIMATION}&first_air_date.gte=1990-01-01&first_air_date.lte=1999-12-31&sort_by=vote_average.desc&vote_count.gte=${MIN_VOTES}`;
    const linkMelhores2000s = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=pt-BR&with_genres=${GENRE_ID_ANIMATION}&first_air_date.gte=2000-01-01&first_air_date.lte=2009-12-31&sort_by=vote_average.desc&vote_count.gte=${MIN_VOTES}`;
    const linkMelhores2020s = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=pt-BR&with_genres=${GENRE_ID_ANIMATION}&first_air_date.gte=2020-01-01&first_air_date.lte=${endDate}&sort_by=vote_average.desc&vote_count.gte=${MIN_VOTES}`;

    const { data: data80s, loading: loading80s, error: error80s } = useAxios<SeriesListResponse>(linkMelhores80s, 'get', null);
    const { data: data90s, loading: loading90s, error: error90s } = useAxios<SeriesListResponse>(linkMelhores90s, 'get', null);
    const { data: data2000s, loading: loading2000s, error: error2000s } = useAxios<SeriesListResponse>(linkMelhores2000s, 'get', null);
    const { data: data2020s, loading: loading2020s, error: error2020s } = useAxios<SeriesListResponse>(linkMelhores2020s, 'get', null);

    // Condições de Carregamento
    if ( loading80s || loading90s || loading2000s || loading2020s) {
        return <div className="loading-state"><h2>Carregando Catálogo AnimaCrono: Séries...</h2></div>;
    }

    if ( error80s || error90s || error2000s || error2020s) {
        return <div className="error-state">Erro ao carregar dados de séries.</div>;
    }

    // Extrai os dados
    const seriesAnos80 = data80s?.results || [];
    const seriesAnos90 = data90s?.results || [];
    const seriesAnos2000 = data2000s?.results || [];
    const seriesAnos2020 = data2020s?.results || [];

    // Renderização
    return (
        <div className="series-page">
            <Carousel></Carousel>
            <div className="series-container">

                <MovieList
                    title="OLD BUT GOLD: SÉRIES DOS ANOS 80 QUE MARCARAM"
                    movies={seriesAnos80}
                    fallbackMessage="Nenhuma série dos anos 80 com alta avaliação encontrada."
                    id="section-series-80s"
                    contentType='tv' // PROP necessária pra fazer o rotacionamento pra página de série, invés de filme
                />
                <MovieList
                    title="ANOS 90: SÉRIES QUE DEIXARAM SEU NOME"
                    movies={seriesAnos90}
                    fallbackMessage="Nenhuma série dos anos 90 com alta avaliação encontrada."
                    id="section-series-90s"
                    contentType='tv'
                />
                <MovieList
                    title="2000s: SÉRIES DOS ANOS 2000 QUE JÁ SE TORNARAM CLÁSSICOS"
                    movies={seriesAnos2000}
                    fallbackMessage="Nenhuma série dos anos 2000 com alta avaliação encontrada."
                    id="section-series-2000s"
                    contentType='tv'
                />
                 <MovieList
                    title="ATUAIS QUE TODOS AMAM"
                    movies={seriesAnos2020}
                    fallbackMessage="Nenhuma série recente com alta avaliação encontrada."
                    id="section-series-2020s"
                    contentType='tv'
                />
            </div>
        </div>
    );
}