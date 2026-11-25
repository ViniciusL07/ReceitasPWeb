"use client"

import { useState, useCallback, memo } from "react";
import "../clientMovies1/estilo.css";

export default function ClientMoviesApiPage() {
   const [resultMovies, setResultMovies] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [fonteApi, setFonteApi] = useState("/api/searchMovies"); // Permite alternar entre a API OMDb e a Base Própria

   const handleSearch = useCallback(async (titleSearchKey, apiSelecionada) => {
      setIsLoading(true);
      try {
         // Faz requisição para a nossa própria API no servidor (sem expor apikey!)
         const httpRes = await fetch(`${apiSelecionada}?titleSearchKey=${encodeURIComponent(titleSearchKey)}`);
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
         <h1>Busca via API Própria (Receita 19)</h1>

         <div style={{ marginBottom: '15px' }}>
            <label><strong>Escolha a API: </strong></label>
            <select value={fonteApi} onChange={(e) => setFonteApi(e.target.value)} style={{ padding: '6px' }}>
               <option value="/api/searchMovies">Minha API Proxy (OMDb escondido)</option>
               <option value="/api/meusFilmes">Minha API com Base Própria (Desafio)</option>
            </select>
         </div>

         <MovieForm onSearch={handleSearch} fonteApi={fonteApi} />
         <MovieTable movies={resultMovies} isLoading={isLoading} />
      </div>
   );
}

export const MovieForm = memo(function MovieForm({ onSearch, fonteApi }) {
   const [searchKey, setSearchKey] = useState("");
   const [submitting, setSubmitting] = useState(false);

   async function handleSubmit(e) {
      e.preventDefault();
      setSubmitting(true);
      await onSearch(searchKey, fonteApi);
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
            placeholder="Digite o título (ou deixe vazio na Base Própria)..."
         />
         <button type="submit" disabled={submitting}>
            {submitting ? "Pesquisando..." : "Pesquisar"}
         </button>
      </form>
   );
});

export function MovieTable({ movies, isLoading }) {
   if (isLoading) {
      return <p>Carregando dados da API...</p>;
   }

   if (movies.length === 0) {
      return <p>Nenhum filme encontrado.</p>;
   }

   return (
      <table className="tabela-filmes">
         <thead>
            <tr>
               <th>Pôster / Info</th>
               <th>Título</th>
               <th>Ano</th>
               <th>Tipo</th>
            </tr>
         </thead>
         <tbody>
            {movies.map((m) => (
               <tr key={m.imdbID}>
                  <td>
                     {m.Poster && m.Poster !== "N/A" ? (
                        <img src={m.Poster} alt={m.Title} width="50" />
                     ) : (
                        m.Genre || "Base Local"
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