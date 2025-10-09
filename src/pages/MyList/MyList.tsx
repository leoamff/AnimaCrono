import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList"; // Ajuste o import

// Mesmo tipo da Home
interface Movie {
  // campos comuns de séries e filmes
    id: number;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
    popularity: number;
    status: string;
    
    //campos que possuem o mesmo sentido, mas os nomes varias pra filmes e séries
    
    // título princnipal (filme)
    title?: string; 
    
    // título principal (série)
    name?: string; 

    // data de lançamento (filmes)
    release_date?: string; 
    
    // data da primeira exibição (usada em séries)
    first_air_date?: string; 

    // campos específicos de filmes
    // estes campos não existem para séries, então são opcionais
    budget?: number;
    revenue?: number;
    runtime?: number;

    // campos específicos de séries
    number_of_episodes?: number;
    number_of_seasons?: number;
    
    //indica se é um filme ou série para o rotacionamento
    media_type?: 'movie' | 'tv'; 
}

export default function MyList() {
  const [filmes, setFilmes] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuarioRaw = localStorage.getItem('animacrono_current_user');
    const usuario = usuarioRaw ? JSON.parse(usuarioRaw) : [];
    const movieIds = usuario?.myList || [];
    console.log(usuario);

    const { VITE_API_KEY: API_KEY } = import.meta.env;

    if (!API_KEY || movieIds.length === 0) {
      setLoading(false);
      setFilmes([]);
      return;
    }

    Promise.all(
      movieIds.map((id: number) =>
        axios
          .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`)
          .then((res) => res.data)
      )
    )
      .then(setFilmes)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white text-xl">
        Carregando sua lista...
      </div>
    );

  return (
    <div className="bg-[#01020c] min-h-screen p-5 text-[#eeeeee]">
      <div className="[&_.movie-list-grid]:grid [&_.movie-list-grid]:grid-cols-[repeat(auto-fit,minmax(160px,180px))] [&_.movie-list-grid]:gap-4 [&_.movie-list-grid]:justify-center [&_.movie-list-grid]:max-w-6xl [&_.movie-list-grid]:mx-auto [&_.movie-card-link]:max-w-[180px]">
        <MovieList
          title="Minha Lista"
          movies={filmes}
          fallbackMessage="Sua lista está vazia."
          id="my-list"
          contentType="movie"
        />
      </div>
    </div>
  );
}
