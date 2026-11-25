export function Cabecalho() {
   return (
      <div>
         <h2>Menu principal da aplicação</h2>
         <hr />
      </div>
   )
}

export function Rodape() {
   return (
      <div>
         <hr />
         <p>Desenvolvido na Receita 13</p>
      </div>
   )
}

export default function Home() {
   return (
      <div>
         <Cabecalho />
         <div>
            <h1>Viva Santana!</h1>
         </div>
         <Rodape />
      </div>
   )
}