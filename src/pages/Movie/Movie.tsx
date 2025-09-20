import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { FaPlay, FaInfoCircle, FaStar, FaCalendarAlt, FaClock, FaUserAlt, FaMoneyBillWave, FaFilm, FaTimes } from "react-icons/fa";

type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    genres: { id: number; name: string }[];
    runtime: number;
    tagline: string;
    budget: number;
    revenue: number;
    status: string;
    production_companies: { id: number; name: string; logo_path: string | null }[];
    credits?: {
        cast: { id: number; name: string; character: string; profile_path: string | null }[];
        crew: { id: number; name: string; job: string }[];
    };
    videos?: {
        results: { key: string; name: string; site: string; type: string }[];
    };
};

export default function Movie() {
    const { id: idParam } = useParams();
    const id = Number(idParam);
    const isValidId = !!idParam && !isNaN(id);

    const link = isValidId
        ? `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=credits,videos,images,recommendations,reviews&language=pt-BR`
        : "";

    const { data: movie, loading, error } = useAxios<Movie>(link, "get", null);

    const [showTrailer, setShowTrailer] = useState(false);

    if (!isValidId) return <div className="text-red-500">ID do filme inválido.</div>;
    if (loading) return <div className="flex justify-center items-center h-96">Carregando...</div>;
    if (error) return <div className="text-red-500">Erro: {String(error)}</div>;
    if (!movie) return <div>Nenhum filme encontrado</div>;

    const trailer = movie.videos?.results?.find(
        (v) => v.site === "YouTube" && v.type === "Trailer"
    );
    const director = movie.credits?.crew?.find((c) => c.job === "Director");

    return (
        <div className="min-h-screen w-full bg-black flex flex-col">
            {/* Banner Netflix */}
            <div
                className="relative h-[70vw] max-h-[700px] min-h-[350px] w-full bg-center bg-cover flex items-end"
                style={{
                    backgroundImage: movie.backdrop_path
                        ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                        : movie.poster_path
                        ? `url(https://image.tmdb.org/t/p/original${movie.poster_path})`
                        : "none",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <div className="relative z-10 flex flex-col items-center text-center gap-6 p-8 md:p-16 w-full max-w-5xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-2">{movie.title}</h1>
                    {movie.tagline && (
                        <p className="italic text-lg text-gray-200 mb-2">{movie.tagline}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-3 justify-center">
                        {movie.genres.map((genre) => (
                            <span
                                key={genre.id}
                                className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-6 text-gray-200 mb-4 text-base justify-center">
                        <span className="flex items-center gap-1">
                            <FaCalendarAlt className="text-blue-300" /> {movie.release_date}
                        </span>
                        <span className="flex items-center gap-1">
                            <FaClock className="text-blue-300" /> {movie.runtime} min
                        </span>
                        <span className="flex items-center gap-1">
                            <FaStar className="text-yellow-400" /> {movie.vote_average}
                        </span>
                        {director && (
                            <span className="flex items-center gap-1">
                                <FaUserAlt className="text-blue-300" /> Diretor: {director.name}
                            </span>
                        )}
                    </div>
                    <div className="flex gap-4 mt-2 justify-center">
                        <button
                            className="flex items-center gap-2 bg-white text-black font-bold px-8 py-3 rounded hover:bg-gray-200 transition text-lg shadow"
                        >
                            <FaPlay /> Assistir
                        </button>
                        {trailer && (
                            <button
                                onClick={() => setShowTrailer(true)}
                                className="flex items-center gap-2 bg-gray-700/80 text-white font-bold px-8 py-3 rounded hover:bg-gray-600 transition text-lg shadow"
                            >
                                <FaInfoCircle /> Trailer
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal do Trailer */}
            {showTrailer && trailer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
                    <div className="relative w-full max-w-3xl mx-auto p-4">
                        <button
                            onClick={() => setShowTrailer(false)}
                            className="absolute top-2 right-2 text-white text-3xl font-bold bg-black/60 rounded-full w-12 h-12 flex items-center justify-center hover:bg-red-600 transition"
                            aria-label="Fechar"
                        >
                            <FaTimes />
                        </button>
                        <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg border-4 border-white/10">
                            <iframe
                                title="Trailer"
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                                allowFullScreen
                                className="rounded-lg w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Conteúdo principal centralizado */}
            <div className="flex-1 w-full flex justify-center items-center mt-15">
                <div className="max-w-5xl w-full -mt-24 relative z-20 px-2">
                    <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/90 rounded-xl shadow-2xl p-6 md:p-12 border border-gray-700 flex flex-col items-center text-center">
                        {/* Sinopse */}
                        <h2 className="font-semibold mb-2 text-2xl text-white">Sinopse</h2>
                        <p className="mb-8 text-gray-200 leading-relaxed text-lg">{movie.overview}</p>

                        {/* Detalhes técnicos */}
                        <div className="flex flex-wrap gap-8 mb-8 justify-center">
                            <div className="flex flex-col gap-1 items-center">
                                <span className="text-gray-400 text-xs">Status</span>
                                <span className="font-semibold text-white">{movie.status}</span>
                            </div>
                            <div className="flex flex-col gap-1 items-center">
                                <span className="text-gray-400 text-xs">Orçamento</span>
                                <span className="font-semibold flex items-center gap-1 text-white">
                                    <FaMoneyBillWave className="text-green-500" />
                                    {movie.budget.toLocaleString("pt-BR", { style: "currency", currency: "USD" })}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1 items-center">
                                <span className="text-gray-400 text-xs">Receita</span>
                                <span className="font-semibold flex items-center gap-1 text-white">
                                    <FaMoneyBillWave className="text-green-700" />
                                    {movie.revenue.toLocaleString("pt-BR", { style: "currency", currency: "USD" })}
                                </span>
                            </div>
                        </div>

                        {/* Produtoras */}
                        {movie.production_companies && movie.production_companies.length > 0 && (
                            <div className="mb-10 w-full">
                                <h2 className="font-semibold mb-2 text-xl text-white flex items-center gap-2 justify-center">
                                    <FaFilm className="text-blue-500" /> Produtoras
                                </h2>
                                <div className="flex flex-wrap gap-4 justify-center">
                                    {movie.production_companies.map((company) => (
                                        <div key={company.id} className="flex items-center gap-2 bg-gray-700/60 rounded-lg px-3 py-2 shadow-sm">
                                            {company.logo_path && (
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                                                    alt={company.name}
                                                    className="h-6 object-contain"
                                                />
                                            )}
                                            <span className="text-sm font-medium text-white">{company.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Elenco - estilo Netflix, horizontal scroll */}
                        <div className="w-full">
                            <h2 className="font-semibold mb-4 text-xl text-white flex items-center gap-2 justify-center">
                                <FaUserAlt className="text-blue-500" /> Elenco principal
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center">
                                {movie.credits?.cast && Array.isArray(movie.credits.cast) && movie.credits.cast.slice(0, 12).map((actor) => (
                                    <div key={actor.id} className="flex flex-col items-center bg-gray-800 rounded-lg p-3 shadow border border-gray-700">
                                        <img
                                            src={
                                                actor.profile_path
                                                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                                    : "https://via.placeholder.com/80x120?text=No+Image"
                                            }
                                            alt={actor.name}
                                            className="w-20 h-28 object-cover rounded mb-2 border border-gray-700"
                                        />
                                        <span className="text-xs font-semibold text-white text-center">{actor.name}</span>
                                        <span className="text-xs text-gray-400 text-center">{actor.character}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}