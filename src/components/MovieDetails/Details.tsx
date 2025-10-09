import { FaCalendarAlt, FaClock, FaStar, FaUserAlt } from "react-icons/fa";
import Buttons from "../ButtonsMovie/Buttons";

type Genre = {
  id: number;
  name: string;
};

// Interface de filmes e séries (apesar do nome Movie)
type Movie = {
  id: number;
  // Deixa 'title' e 'name' como opcionais para que o sistema não quebre com a troca de conteúdo
  title?: string; 
  name?: string; 
  tagline?: string;
  genres: Genre[];
  // filmes usam 'release_date', séries usam 'first_air_date'
  release_date?: string; 
  first_air_date?: string;
  // filmes usam 'runtime', séries usam 'episode_run_time' (array)
  runtime?: number; 
  episode_run_time?: number[];
  vote_average: number;
};

type DetailsProps = {
  id: number;
  setShowTrailer: React.Dispatch<React.SetStateAction<boolean>>;
  trailer: {
    key: string;
    name: string;
    site: string;
    type: string;
  };
  movie: Movie; // usa a interface
  director: { name: string } | undefined;
};

export default function Details({ setShowTrailer, trailer, movie, director, id }: DetailsProps) {
  
  const displayTitle = movie.title || movie.name;
  const displayDate = movie.release_date || movie.first_air_date;
  
  // calcula a duração: Se for filme, usa runtime; se for série, usa a primeira duração do episódio
  const displayRuntime = movie.runtime 
    ? `${movie.runtime} min` 
    : (movie.episode_run_time && movie.episode_run_time.length > 0) 
    ? `${movie.episode_run_time[0]} min`
    : null; // se não houver dados, não exibe

  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      <div className="relative z-10 flex flex-col items-center text-center gap-6 p-8 md:p-16 w-full max-w-5xl mx-auto">
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-2">{displayTitle}</h1>
        
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
          
          {displayDate && (
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-blue-300" /> {displayDate}
            </span>
          )}
          
          {displayRuntime && (
            <span className="flex items-center gap-1">
              <FaClock className="text-blue-300" /> {displayRuntime}
            </span>
          )}
          
          <span className="flex items-center gap-1">
            <FaStar className="text-yellow-400" /> {movie.vote_average}
          </span>
          
          {director && (
            <span className="flex items-center gap-1">
              <FaUserAlt className="text-blue-300" /> Diretor: {director.name}
            </span>
          )}
        </div>
        <Buttons setShowTrailer={setShowTrailer} trailer={trailer} idMovie={id}/>
      </div>
    </>
  );
}