import { FaMoneyBillWave } from "react-icons/fa";
import type { movieInterface } from '../../components/movieInterface/movieInterface'; 

//interface importada de movieInterface
type TecnicDetailsProps = {
  movie: movieInterface; 
};

// formata a moeda de acordo com o câmbio
const formatCurrency = (amount: number | undefined) => { // Aceita undefined para o caso de séries
    // Garante que o valor zero, nulo ou indefinido seja tratado
    if (!amount || amount <= 0) return null; 
    
    // para séries, budget e revenue serão 0 ou undefined,
    // então esta função retornará null, o que é o comportamento desejado.
    return amount.toLocaleString("pt-BR", { style: "currency", currency: "USD" });
};

export default function TecnicDetails({ movie }: TecnicDetailsProps){
    
    // O budget e revenue são opcionais por conta de séries (ver em movieInterface.tsx),
    //  mas o || 0 garante que a função formatCurrency receba um número.
    const displayBudget = formatCurrency(movie.budget || 0);
    const displayRevenue = formatCurrency(movie.revenue || 0);

    return (
        <div className="flex flex-wrap gap-8 mb-8 justify-center">
            
            <div className="flex flex-col gap-1 items-center">
                <span className="text-gray-400 text-xs">Status</span>
                <span className="font-semibold text-white">{movie.status}</span>
            </div>

            {/* o orçamento aparece SOMENTE se displayBudget não for nulo (ou seja, se for um FILME com valor > 0) */}
            {displayBudget && (
                <div className="flex flex-col gap-1 items-center">
                    <span className="text-gray-400 text-xs">Orçamento</span>
                    <span className="font-semibold flex items-center gap-1 text-white">
                        <FaMoneyBillWave className="text-green-500" />
                        {displayBudget}
                    </span>
                </div>
            )}
            
            {/* receita do filme aparece SOMENTE se displayRevenue não for nulo (ou seja, se for um FILME com valor > 0) */}
            {displayRevenue && (
                <div className="flex flex-col gap-1 items-center">
                    <span className="text-gray-400 text-xs">Receita</span>
                    <span className="font-semibold flex items-center gap-1 text-white">
                        <FaMoneyBillWave className="text-green-700" />
                        {displayRevenue}
                    </span>
                </div>
            )}
        </div>
    )
}