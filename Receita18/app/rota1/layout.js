export default function Rota1Layout({ children }) {
   return (
      <div style={{ border: '2px solid #5cb85c', padding: '15px', borderRadius: '5px' }}>
         <p style={{ color: '#5cb85c', fontWeight: 'bold' }}>Cabeçalho exclusivo da Rota 1</p>
         {children}
      </div>
   )
}