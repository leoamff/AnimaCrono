export interface movieInterface {
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