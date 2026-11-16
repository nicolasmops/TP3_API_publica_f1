
async function personajes() {
  const resultado = await fetch('https://api.tvmaze.com/shows/172/cast', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  const respuesta = await resultado.json()
  
    const characters = respuesta.map(entry => ({
      character: entry.character.name,
      actor: entry.person.name,
      image: entry.character.image?.medium
    }));
    console.log(characters);
}
   async function episodios(){
  const resultado = await fetch('https://api.tvmaze.com/shows/172/episodes')
  const respuesta = await resultado.json()
    const episodes = respuesta.map(entry => ({
      episode: entry.name,
      season: entry.season,
      chapter: entry.number,
      descripcion: entry.summary,
      rating: entry.rating.average,
      imagen: entry.image.medium,
    }));
    console.log(episodes);
   }
   personajes()
   episodios()
