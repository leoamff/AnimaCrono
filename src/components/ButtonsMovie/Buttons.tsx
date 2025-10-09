import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import MyList from '../MyList/MyList';

type ButtonsProps = {
    idMovie: number;
  setShowTrailer: React.Dispatch<React.SetStateAction<boolean>>;
  trailer: {
    key: string;
    name: string;
    site: string;
    type: string;
  };
};

export default function Buttons({ setShowTrailer, trailer, idMovie }: ButtonsProps) {
    return (
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
            <MyList id={idMovie} />
        </div>
    )
}