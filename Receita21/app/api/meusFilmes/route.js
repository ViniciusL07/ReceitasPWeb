const baseDeDadosFilmes = [
   { imdbID: "db01", Title: "O Auto da Compadecida", Year: "2000", Type: "movie", Genre: "Comédia/Drama" },
   { imdbID: "db02", Title: "Cidade de Deus", Year: "2002", Type: "movie", Genre: "Drama/Crime" },
   { imdbID: "db03", Title: "Tropa de Elite", Year: "2007", Type: "movie", Genre: "Ação/Policial" },
   { imdbID: "db04", Title: "Bacurau", Year: "2019", Type: "movie", Genre: "Ficção/Suspense" },
   { imdbID: "db05", Title: "Central do Brasil", Year: "1998", Type: "movie", Genre: "Drama" },
   { imdbID: "db06", Title: "O Homem que Copiava", Year: "2003", Type: "movie", Genre: "Comédia/Romance" }
];

export async function GET(request) {
   const searchParams = request.nextUrl.searchParams;
   const titleSearchKey = (searchParams.get("titleSearchKey") || "").toLowerCase();

   // Filtra os filmes da base própria cujo título contém o texto pesquisado
   const resultados = baseDeDadosFilmes.filter((filme) =>
      filme.Title.toLowerCase().includes(titleSearchKey)
   );

   return Response.json({
      Search: resultados,
      totalResults: String(resultados.length),
      Response: resultados.length > 0 ? "True" : "False"
   });
}