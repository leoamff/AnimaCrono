import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import './Carousel.css'

// Interface local para a estrutura de cada slide do carrossel
interface Slide {
    id: number; 
    title: string; 
    linkTo: string; 
    imageUrl: string;
}

// --- COMPONENTE CARROSSEL ---
const Carousel = () => {
    
    // BACKDROPS de Animação com URLs fornecidas
    const slides: Slide[] = [
        { id: 1, title: 'O Rei Leão (1994)', linkTo: '/movie/8587', imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8aIvm8OaJISOpVTt7rMIh7X35G5.jpg' }, 
        { id: 2, title: 'Como Treinar o Seu Dragão', linkTo: '/movie/10191', imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/vdvEClt3J8sFWxyMo0Jm7JpouEo.jpg' },
        { id: 3, title: 'Shrek (2001)', linkTo: '/movie/806', imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg' },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    const current = slides[currentSlide];

    // Verifica o carregamento da imagem
    const checkImageLoad = (url: string) => {
        setIsLoading(true);
        const img = new Image();
        img.src = url;
        
        const timeout = setTimeout(() => {
            setIsLoading(false); 
        }, 5000); 

        img.onload = () => {
            clearTimeout(timeout);
            setIsLoading(false); 
        }; 
        
        img.onerror = () => {
             clearTimeout(timeout);
             setIsLoading(false); 
        };
    };

    useEffect(() => {
        checkImageLoad(current.imageUrl);
    }, [current.imageUrl]);

    // Carregamento
    if (isLoading) {
         return (
             <div className="carousel-container loading-state">
                 <div className="slide-content">
                    <h2>Carregando Imagens...</h2>
                 </div>
                 <button onClick={prevSlide} className="nav-button prev">&#10094;</button>
                 <button onClick={nextSlide} className="nav-button next">&#10095;</button>
                 <div className="dot-indicators">
                    {slides.map((_, index) => (
                        <span key={index} className={`dot-indicator ${index === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(index)} />
                    ))}
                </div>
             </div>
         )
    }

    return (
        <div className="carousel-container">
            
            {/* Imagem do fundo */}
            <img 
                key={current.id} 
                src={current.imageUrl} 
                alt={current.title} 
                className="carousel-image" 
            />

            {/* Conteúdo sobre a imagem */}
            <div className="slide-content">
                <h2>{current.title}</h2>
            </div>

            <button onClick={prevSlide} className="nav-button prev">&#10094;</button>
            <button onClick={nextSlide} className="nav-button next">&#10095;</button>
            
            <div className="dot-indicators">
                {slides.map((_, index) => (
                    <span 
                        key={index} 
                        className={`dot-indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;