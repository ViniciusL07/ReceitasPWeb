import Link from 'next/link';

export default function Home() {
   return (
      <div>
         <h1>Viva Santana!</h1>
         <Link href="/novarota">Ir para Nova Rota (com Link do Next)</Link> <br/><br/>
         <a href="/novarota">Ir para Nova Rota (jeito antigo com tag a)</a>
      </div>
   )
}