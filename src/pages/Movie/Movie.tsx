import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Modal from "../../components/ModalTrailer/Modal";
import Details from "../../components/MovieDetails/Details";
import Content from "../../components/PrincipalContent/Content";

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
        <div className="min-h-screen w-full bg-black flex flex-col pb-10">
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
            
                <Details setShowTrailer={setShowTrailer} trailer={trailer!} movie={movie} director={director} />
            </div>

            {/* Modal do Trailer */}
            {showTrailer && trailer && (
                <Modal setShowTrailer={setShowTrailer} trailer={trailer} />
            )}

            {/* Conteúdo principal centralizado */}
            <Content movie={movie}/>
        </div>
    );
}