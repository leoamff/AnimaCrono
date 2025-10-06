import { FaUserAlt } from "react-icons/fa";

type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path?: string | null;
};

type Credits = {
  cast: Cast[];
};

type Movie = {
  credits?: Credits;
};

type CastProps = {
  movie: Movie;
};

export default function Cast({ movie }: CastProps) {
    return (
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
    )
}