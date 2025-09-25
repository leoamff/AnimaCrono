import { FaMoneyBillWave } from "react-icons/fa";

type Movie = {
  title: string;
  tagline?: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  overview: string;
  status: string;
  budget: number;
  revenue: number;
};

type TecnicDetailsProps = {
  movie: Movie;
};

export default function TecnicDetails({ movie }: TecnicDetailsProps){
    return (
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
    )
}