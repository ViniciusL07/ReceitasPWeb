import Link from 'next/link';

export default function NovaRotaLayout({ children }) {
   return (
      <div style={{ border: '2px solid #0275d8', padding: '15px', borderRadius: '5px' }}>
         <div style={{ marginBottom: '10px', color: '#0275d8' }}>
            <strong>Submenu Nova Rota: </strong>
            <Link href="/novarota">Principal da Nova Rota</Link> |{" "}
            <Link href="/novarota/subrota">Ir para Subrota</Link>
         </div>
         <hr />

         {/* Conteúdo das páginas dentro de /novarota */}
         {children}
      </div>
   )
}