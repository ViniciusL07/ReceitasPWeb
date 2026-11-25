export default async function MoviesPage({ searchParams }) {
   const { 
      titleSearchKey = 'bagdad', 
      year = '', 
      type = '' 
   } = await searchParams;

   // Monta a URL da API acrescentando os parâmetros opcionais se forem informados
   let url = `http://www.omdbapi.com/?apikey=f1cbc41e&s=${titleSearchKey}`;
   
   if (year) {
      url += `&y=${year}`;
   }
   
   if (type) {
      url += `&type=${type}`;
   }

   const res = await fetch(url);
   const data = await res.json();

   return (
      <div>
         <h1>Pesquisa de Filmes</h1>
         <p>
            <strong>Filtros atuais:</strong> Título: "{titleSearchKey}" 
            {year && ` | Ano: ${year}`} 
            {type && ` | Tipo: ${type}`}
         </p>

         {/* Verifica se a API encontrou resultados (data.Search existe) */}
         {data.Search ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
               {data.Search.map((m) => (
                  <div key={m.imdbID} style={{ border: '1px solid #ccc', padding: '10px', width: '200px', borderRadius: '5px' }}>
                     {/* Exibe o pôster do filme */}
                     {m.Poster !== "N/A" ? (
                        <img src={m.Poster} alt={m.Title} width="180" />
                     ) : (
                        <div style={{ width: '180px', height: '260px', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           Sem pôster
                        </div>
                     )}
                     <h3>{m.Title}</h3>
                     <p>Ano: {m.Year} ({m.Type})</p>
                  </div>
               ))}
            </div>
         ) : (
            <p>Nenhum resultado encontrado para essa pesquisa.</p>
         )}
      </div>
   )
}