import { FaTimes } from 'react-icons/fa'

type ModalProps = {
  setShowTrailer: React.Dispatch<React.SetStateAction<boolean>>;
  trailer: {
    key: string;
    name: string;
    site: string;
    type: string;
  };
};

export default function Modal({ setShowTrailer, trailer }: ModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <div className="relative w-full max-w-3xl mx-auto p-4">
                <button
                    onClick={() => setShowTrailer(false)}
                    className="absolute top-2 right-2 text-white text-3xl font-bold bg-black/60 rounded-full w-12 h-12 flex items-center justify-center hover:bg-red-600 transition"
                    aria-label="Fechar"
                >
                    <FaTimes />
                </button>
                <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg border-4 border-white/10">
                    <iframe
                        title="Trailer"
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                        allowFullScreen
                        className="rounded-lg w-full h-full"
                    />
                </div>
            </div>
        </div>
    )
}