import { FaFilm } from "react-icons/fa";

type ProductionCompany = {
  id: number;
  name: string;
  logo_path?: string | null;
};

type Movie = {
  production_companies: ProductionCompany[];
};

type ProducersProps = {
  movie: Movie;
};

export default function Producers({ movie }: ProducersProps){
    return (
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
    )
}