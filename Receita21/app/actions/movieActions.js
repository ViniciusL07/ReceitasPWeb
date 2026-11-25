'use server'

export async function searchMovies(formData) {
   const titleSearchKey = formData.get("titleSearchKey");
   const year = formData.get("year");
   const type = formData.get("type");

   if (!titleSearchKey || titleSearchKey.trim() === '') {
      return { Search: [] };
   }

   try {
      let url = `http://www.omdbapi.com/?apikey=f1cbc41e&s=${encodeURIComponent(titleSearchKey)}`;

      if (year && year.trim() !== '') {
         url += `&y=${encodeURIComponent(year)}`;
      }

      if (type && type.trim() !== '') {
         url += `&type=${encodeURIComponent(type)}`;
      }

      const httpRes = await fetch(url);
      const jsonRes = await httpRes.json();
      return jsonRes;
   } catch (err) {
      return { error: `Erro na requisição: ${err}` };
   }
}