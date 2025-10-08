import Cast from "../Cast/Cast";
import Producers from "../Producers/Producers";
import TecnicDetails from "../TecnicDetailsOfMovie/TecnicDetails";

type Genre = {
  id: number;
  name: string;
};

type ProductionCompany = {
  id: number;
  name: string;
  logo_path?: string | null;
};

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
  title: string;
  tagline?: string;
  genres: Genre[];
  release_date: string;
  runtime: number;
  vote_average: number;
  overview: string;
  status: string;
  budget: number;
  revenue: number;
  production_companies: ProductionCompany[];
  credits?: Credits;
};

type ContentProps = {
  movie: Movie;
};

export default function Content({ movie }: ContentProps) {
  return (
    <div className="flex-1 w-full flex justify-center items-center mt-15">
      <div className="max-w-5xl w-full -mt-24 relative z-20 px-2">
        <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/90 rounded-xl shadow-2xl p-6 md:p-12 border border-gray-700 flex flex-col items-center text-center">
          {/* Sinopse */}
          <h2 className="font-semibold mb-2 text-2xl text-white">Sinopse</h2>
          <p className="mb-8 text-gray-200 leading-relaxed text-lg">{movie.overview}</p>

          {/* Detalhes técnicos */}
          <TecnicDetails movie={movie}/>

          {/* Produtoras */}
          {movie.production_companies && movie.production_companies.length > 0 && (
            <Producers movie={movie}/>
          )}

          {/* Elenco - estilo Netflix, horizontal scroll */}
          <Cast movie={movie}/>
        </div>
      </div>
    </div>
  );
}