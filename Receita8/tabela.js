// Função para criar e inserir tabelas em qualquer div
const carregarTabela = (
   dados = [], 
   elementId = "tabelaDiv", 
   headers = [], 
   properties = []
) => {
   const div = document.getElementById(elementId);

   if (!dados || dados.length === 0) {
      div.innerHTML = "<p>Nenhum dado encontrado.</p>";
      return;
   }

   // Se os cabeçalhos não forem informados, pega as chaves do primeiro objeto
   const colunas = properties.length > 0 ? properties : Object.keys(dados[0]);
   const titulos = headers.length > 0 ? headers : colunas;

   // Monta os cabeçalhos <th>
   const cabecalhosHtml = titulos.map(titulo => `<th>${titulo}</th>`).join("");

   // Monta as linhas <tr>
   const linhasHtml = dados.map(item => {
      const celulas = colunas.map(col => {
         let valor = item[col];
         
         // Se for objeto aninhado (ex: address, company), converte para texto legível
         if (typeof valor === 'object' && valor !== null) {
            valor = Object.values(valor).filter(v => typeof v !== 'object').join(", ");
         }
         
         return `<td>${valor !== undefined ? valor : ""}</td>`;
      }).join("");

      return `<tr>${celulas}</tr>`;
   });

   // Monta a estrutura completa da tabela
   const tabelaCompleta = `
      <table class="tabela-generica">
         <thead>
            <tr>${cabecalhosHtml}</tr>
         </thead>
         <tbody>
            ${linhasHtml.join("\n")}
         </tbody>
      </table>
   `;

   div.innerHTML = tabelaCompleta;
};