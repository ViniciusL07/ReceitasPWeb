export default function Rota2Layout({ children }) {
   return (
      <div style={{ border: '2px solid #f0ad4e', padding: '15px', borderRadius: '5px' }}>
         <p style={{ color: '#f0ad4e', fontWeight: 'bold' }}>Cabeçalho exclusivo da Rota 2</p>
         {children}
      </div>
   )
}