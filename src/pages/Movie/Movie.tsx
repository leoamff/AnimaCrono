import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Modal from "../../components/ModalTrailer/Modal";
import Details from "../../components/MovieDetails/Details";
import Content from "../../components/PrincipalContent/Content";

type Movie = {
    id: number;
    // campos de filmes
    title?: string;
    release_date?: string;
    runtime?: number;
    budget?: number;
    revenue?: number;
    
    // campos de séries
    name?: string;
    first_air_date?: string; 
    episode_run_time?: number[];
    
    // Campos Comuns
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    genres: { id: number; name: string }[];
    tagline: string;
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

// interface para injetar a lógica de troca de filmes e séries
interface MoviePageProps {
    contentType: 'movie' | 'tv';
}

export default function Movie({ contentType }: MoviePageProps) {
    const { id: idParam } = useParams();
    const id = Number(idParam);
    const isValidId = !!idParam && !isNaN(id);

    // url dinamica diferencia entre série e filme
    const link = isValidId
        ? `https://api.themoviedb.org/3/${contentType}/${id}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=credits,videos,images,recommendations,reviews&language=pt-BR`
        : "";

    const { data: mediaData, loading, error } = useAxios<Movie>(link, "get", null);

    const [showTrailer, setShowTrailer] = useState(false);

    if (!isValidId) return <div className="text-red-500">ID do conteúdo inválido.</div>;
    if (loading) return <div className="flex justify-center items-center h-96">Carregando...</div>;
    if (error) return <div className="text-red-500">Erro: {String(error)}</div>;
    if (!mediaData) return <div>Nenhum conteúdo encontrado</div>;

    const trailer = mediaData.videos?.results?.find(
        (v) => v.site === "YouTube" && v.type === "Trailer"
    );
    const director = mediaData.credits?.crew?.find((c) => c.job === "Director");

    return (
        <div className="min-h-screen w-full bg-black flex flex-col pb-10">
            <div
                className="relative h-[70vw] max-h-[700px] min-h-[350px] w-full h-full bg-center bg-cover flex items-end pb-10"
                style={{
                    backgroundImage: mediaData.backdrop_path
                        ? `url(https://image.tmdb.org/t/p/original${mediaData.backdrop_path})`
                        : mediaData.poster_path
                        ? `url(https://image.tmdb.org/t/p/original${mediaData.poster_path})`
                        : "none",
                }}
            >
                <Details setShowTrailer={setShowTrailer} trailer={trailer!} movie={mediaData} director={director} />
            </div>
            {showTrailer && trailer && (
                <Modal setShowTrailer={setShowTrailer} trailer={trailer} />
            )}
            <Content movie={mediaData}/>
        </div>
    );
}