import MovieForm from "../movieSearch/page";

export default function MoviesLayout({ children }) {
   return (
      <div>
         <h2>Busca de Filmes</h2>
         {/* Reaproveita o componente do formulário sem copiar/colar e sem recarregá-lo */}
         <MovieForm />
         <hr />
         {/* Apenas esta parte abaixo é atualizada a cada pesquisa */}
         {children}
      </div>
   )
}