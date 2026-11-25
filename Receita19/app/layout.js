import Link from 'next/link';

export const metadata = {
   title: 'Programação Web - Next.js',
   description: 'Aplicação desenvolvida nas receitas de Next.js',
}

export default function RootLayout({ children }) {
   console.log("montando layout");
   return (
      <html lang="pt-br">
         <body>
            {/* Menu global exibido em todas as páginas */}
            <div style={{ backgroundColor: '#f0f0f0', padding: '10px', marginBottom: '20px' }}>
               <strong>Menu Principal: </strong>
               <Link href="/">Início</Link> |{" "}
               <Link href="/novarota">Nova Rota</Link> |{" "}
               <Link href="/rota1">Rota 1</Link> |{" "}
               <Link href="/rota2">Rota 2</Link> |{" "}
               <Link href="/movies">Filmes</Link> |{" "}
               <Link href="/movieSearch">Formulário</Link> |{" "}
               <Link href="/clientMovies1">Client Movies</Link> |{" "}
               <Link href="/clientMovies2">API Própria</Link>
            </div>

            {/* Aqui entra o conteúdo de cada página */}
            {children}
         </body>
      </html>
   )
}