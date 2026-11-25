"use client"

import { useState, useCallback, memo } from "react";
import Link from "next/link";
import "./estilo.css";

export default function Home() {
   const [resultMovies, setResultMovies] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   const handleSearch = useCallback(async (titleSearchKey) => {
      if (!titleSearchKey.trim()) return;

      setIsLoading(true);
      try {
         const httpRes = await fetch(`http://www.omdbapi.com/?apikey=f1cbc41e&s=${titleSearchKey}`);
         const jsonRes = await httpRes.json();
         setResultMovies(jsonRes.Search || []);
      } catch (err) {
         console.error("Erro na busca:", err);
         setResultMovies([]);
      } finally {
         setIsLoading(false);
      }
   }, []);

   return (
      <div className="container-client">
         <h1>Busca de Filmes (Client Component)</h1>
         <MovieForm onSearch={handleSearch} />
         <MovieTable movies={resultMovies} isLoading={isLoading} />
      </div>
   );
}

export const MovieForm = memo(function MovieForm({ onSearch }) {
   const [searchKey, setSearchKey] = useState("");
   const [submitting, setSubmitting] = useState(false);

   async function handleSubmit(e) {
      e.preventDefault();
      setSubmitting(true);
      await onSearch(searchKey);
      setSubmitting(false);
   }

   return (
      <form onSubmit={handleSubmit} className="form-pesquisa">
         <label htmlFor="idTitleSearchKey">Título: </label>
         <input
            id="idTitleSearchKey"
            name="titleSearchKey"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Digite o nome do filme e aperte Enter..."
         />
         <button type="submit" disabled={submitting}>
            {submitting ? "Pesquisando..." : "Pesquisar"}
         </button>
      </form>
   );
});

export function MovieTable({ movies, isLoading }) {
   if (isLoading) {
      return <p>Carregando filmes...</p>;
   }

   if (movies.length === 0) {
      return <p>Nenhum filme exibido. Faça uma pesquisa acima.</p>;
   }

   return (
      <table className="tabela-filmes">
         <thead>
            <tr>
               <th>Pôster</th>
               <th>Título</th>
               <th>Ano</th>
               <th>Tipo</th>
            </tr>
         </thead>
         <tbody>
            {movies.map((m) => (
               <tr key={m.imdbID}>
                  <td>
                     {m.Poster !== "N/A" ? (
                        <img src={m.Poster} alt={m.Title} width="50" />
                     ) : (
                        "Sem foto"
                     )}
                  </td>
                  <td>
                     <Link href={`/movie/${m.imdbID}`}>{m.Title}</Link>
                  </td>
                  <td>{m.Year}</td>
                  <td>{m.Type}</td>
               </tr>
            ))}
         </tbody>
      </table>
   );
}