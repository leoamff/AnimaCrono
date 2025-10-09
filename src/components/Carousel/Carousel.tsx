import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback, useMemo } from 'react'; 
import './Carousel.css'

// --- COMPONENTE CARROSSEL ---
const Carousel = () => {
    
    // BACKDROPS de Animação - IGUAIS AO DA HOME
    const slides = useMemo(() => ([
        { id: 1, title: '101 Dálmatas II', linkTo: '/movie/8587', imageUrl: 'https://image.tmdb.org/t/p/original/k9tMAeSgaFASNedoxvyzMnTcilV.jpg' }, 
        { id: 2, title: 'Vida de Inseto', linkTo: '/movie/10191', imageUrl: 'https://image.tmdb.org/t/p/original/vvlbdBCuLt7nkQG7anNE6xHNbAO.jpg' },
        { id: 3, title: 'Aladdin', linkTo: '/movie/806', imageUrl: 'https://image.tmdb.org/t/p/original/qYB8MwE6AgLFe5ruBUmPA0RWRPY.jpg' },
    ]), []);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]); 

    const current = slides[currentSlide];

    useEffect(() => {
        setIsLoading(true);
        const img = new Image();
        img.src = current.imageUrl;
        img.onload = () => setIsLoading(false); 
        img.onerror = () => setIsLoading(false);
    }, [current.imageUrl]);

    useEffect(() => {
        const intervalId = setInterval(nextSlide, 2000); 
        return () => clearInterval(intervalId);
    }, [nextSlide]);

    if (isLoading) {
        return (
            <div className="carousel-container loading-state">
                <div className="slide-content"><h2>CARREGANDO IMAGEM...</h2></div>
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
        )
    }

    return (
        <div className="carousel-container">
            <Link to={current.linkTo} className="carousel-link">
                <img 
                    src={current.imageUrl} 
                    alt={current.title} 
                    className="carousel-image" 
                />
            </Link>

            <div className="slide-content">
                <h2 className="carousel-title">{current.title}</h2>
            </div>
            
            
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