import { Cabecalho, Rodape } from "../page";

export default function Rota2() {
   return (
      <div>
         <Cabecalho />
         <div>
            <h1>Página da Rota 2</h1>
            <p>Você acessou http://localhost:3000/rota2</p>
         </div>
         <Rodape />
      </div>
   )
}