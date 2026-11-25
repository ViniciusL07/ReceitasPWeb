import Form from "next/form";

export default function MovieForm() {
   return (
      <Form action="/movies" style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
         <label htmlFor="idTitleSearchKey">Título: </label>
         <input id="idTitleSearchKey" name="titleSearchKey" placeholder="Ex: Batman" style={{ marginRight: '10px' }} />

         {/* Exercício 1: Segundo campo de pesquisa (Ano) */}
         <label htmlFor="idYear">Ano: </label>
         <input id="idYear" name="year" placeholder="Ex: 2022" style={{ marginRight: '10px', width: '80px' }} />

         <button type="submit">Pesquisar</button>
      </Form>
   )
}