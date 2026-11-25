import { MariaPrea, MensagemPersonalizada } from "./componentes";

export function AvisoRota() {
   return (
      <p><strong>Aviso:</strong> Este componente veio de app/novarota/page.js</p>
   )
}

export default function NovaRotaHome() {
   return (
      <div>
         <h1>Nova Rota, Nova Página</h1>
         <MariaPrea />

         
         <MensagemPersonalizada 
            titulo="Bem-vindo à Receita 14" 
            texto="Este texto foi passado por parâmetro para o componente!" 
         />
      </div>
   )
}