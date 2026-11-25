"use client"

import { useState, useCallback, memo } from "react";
import "./estilo.css";

export default function Home() {
   const [resultMovies, setResultMovies] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   // useCallback garante que a função handleSearch não seja recriada a cada renderização do Home
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
         
         {/* MovieForm memorizado: não será redesenhado quando resultMovies mudar */}
         <MovieForm onSearch={handleSearch} />
         
         {/* MovieTable recebe o estado e é redesenhada a cada busca */}
         <MovieTable movies={resultMovies} isLoading={isLoading} />
      </div>
   );
}

// memo impede re-renderização desnecessária do formulário
export const MovieForm = memo(function MovieForm({ onSearch }) {
   // Mantém o valor digitado no estado do próprio formulário sem ser zerado
   const [searchKey, setSearchKey] = useState("");
   const [submitting, setSubmitting] = useState(false);

   console.log("Renderizando MovieForm (só deve aparecer 1 vez!)");

   // onSubmit funciona tanto clicando no botão quanto apertando <Enter>
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
         {/* Botão desabilitado enquanto a requisição está em andamento */}
         <button type="submit" disabled={submitting}>
            {submitting ? "Pesquisando..." : "Pesquisar"}
         </button>
      </form>
   );
});

export function MovieTable({ movies, isLoading }) {
   console.log("Renderizando MovieTable");

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
                  <td>{m.Title}</td>
                  <td>{m.Year}</td>
                  <td>{m.Type}</td>
               </tr>
            ))}
         </tbody>
      </table>
   );
}