import { AvisoRota } from "../page";
import { MensagemPersonalizada } from "../componentes";

export default function SubRotaPage() {
   return (
      <div>
         <h1>Página dentro do subdiretório</h1>
         
         
         <AvisoRota />

         
         <MensagemPersonalizada 
            titulo="Subdiretório funcionando" 
            texto="Você está acessando /novarota/subrota" 
         />
      </div>
   )
}