import Image from 'next/image';
import Link from 'next/link';

// Geração Estática (SSG) pré-renderizando os filmes da busca inicial
export async function generateStaticParams() {
   const allMovies = await fetch('https://www.omdbapi.com/?apikey=f1cbc41e&s=lady').then((res) => res.json());
   
   if (!allMovies.Search) return [];

   return allMovies.Search.map((movie) => ({
      id: movie.imdbID,
   }));
}

export default async function MovieDetails({ params }) {
   const { id } = await params;
   const movie = await fetch(`https://www.omdbapi.com/?apikey=f1cbc41e&i=${id}`).then((res) => res.json());

   if (movie.Response === "False") {
      return (
         <div>
            <h1>Filme não encontrado</h1>
            <Link href="/movies">Voltar para pesquisa</Link>
         </div>
      );
   }

   return (
      <div style={{ padding: '15px', maxWidth: '700px' }}>
         <h1>{movie.Title} ({movie.Year})</h1>

         {/* Exibindo o pôster usando a marca <Image /> do Next.js */}
         {movie.Poster && movie.Poster !== "N/A" ? (
            <div style={{ margin: '15px 0' }}>
               <Image 
                  src={movie.Poster} 
                  alt={`Pôster de ${movie.Title}`} 
                  width={250} 
                  height={370} 
               />
            </div>
         ) : (
            <p>[Sem pôster disponível]</p>
         )}

         <p><strong>Diretor:</strong> {movie.Director}</p>
         <p><strong>Elenco:</strong> {movie.Actors}</p>
         <p><strong>Gênero:</strong> {movie.Genre}</p>
         <p><strong>Nota IMDb:</strong> {movie.imdbRating}</p>
         <p><strong>Sinopse:</strong> {movie.Plot}</p>

         <br />
         <Link href="/movies">← Voltar para a busca</Link>
      </div>
   );
}