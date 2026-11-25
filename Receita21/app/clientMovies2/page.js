"use client"

import { searchMovies } from "../actions/movieActions";
import Form from "next/form";
import Link from "next/link";
import { useState } from "react";
import "../clientMovies1/estilo.css";

export default function Home() {
   const [data, setData] = useState({});
   const [isLoading, setIsLoading] = useState(false);

   async function handleAction(formData) {
      setIsLoading(true);
      const res = await searchMovies(formData);
      setData(res);
      setIsLoading(false);
   }

   return (
      <div className="container-client">
         <h1>Busca com Server Actions (Receita 20)</h1>
         <MovieForm actionHandler={handleAction} isLoading={isLoading} />
         
         {isLoading && <p>Buscando filmes no servidor...</p>}
         {data.Error && <p>Aviso: {data.Error}</p>}
         {!isLoading && data.Search && <MovieTable movies={data.Search} />}
      </div>
   );
}

export function MovieForm({ actionHandler, isLoading }) {
   return (
      <Form action={actionHandler} className="form-pesquisa">
         <label htmlFor="idTitleSearchKey">Título:</label>
         <input id="idTitleSearchKey" name="titleSearchKey" placeholder="Ex: Batman" required />

         <label htmlFor="idYear">Ano:</label>
         <input id="idYear" name="year" placeholder="Ex: 2022" style={{ width: '90px' }} />

         <label htmlFor="idType">Tipo:</label>
         <select id="idType" name="type" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="">Todos</option>
            <option value="movie">Filme</option>
            <option value="series">Série</option>
            <option value="episode">Episódio</option>
         </select>

         <button type="submit" disabled={isLoading}>
            {isLoading ? "Pesquisando..." : "Pesquisar"}
         </button>
      </Form>
   );
}

export function MovieTable({ movies }) {
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