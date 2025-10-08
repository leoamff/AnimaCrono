import { FaCalendarAlt, FaClock, FaStar, FaUserAlt } from "react-icons/fa";
import Buttons from "../ButtonsMovie/Buttons";

type Genre = {
  id: number;
  name: string;
};

type Movie = {
  title: string;
  tagline?: string;
  genres: Genre[];
  release_date: string;
  runtime: number;
  vote_average: number;
};

type DetailsProps = {
  setShowTrailer: React.Dispatch<React.SetStateAction<boolean>>;
  trailer: {
    key: string;
    name: string;
    site: string;
    type: string;
  };
  movie: Movie;
  director: { name: string } | undefined;
};

export default function Details({ setShowTrailer, trailer, movie, director }: DetailsProps) {
  return (
    <>
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
        <Buttons setShowTrailer={setShowTrailer} trailer={trailer} />
      </div>
    </>
  );
}