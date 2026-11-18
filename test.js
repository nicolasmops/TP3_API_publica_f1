const contenedorP = document.querySelector(".contenedor")
const contenedorE = document.querySelector(".episodes")
const filtroTemporadas = document.getElementById("season")
const filtroEpisodios = document.getElementById("episode")

async function personajes() {
  const resultado = await fetch('https://api.tvmaze.com/shows/172/cast');
  const respuesta = await resultado.json();

  const characters = respuesta.map(entry => ({
    character: entry.character.name,
    actor: entry.person.name,
    image: entry.character.image?.medium
  }));
  characters.forEach(personaje => {
    contenedorP.innerHTML += `
      <div class="personaje-card">
        <img class="imagen" src="${personaje.image}">
        <div class="personaje">${personaje.character}</div>
        <div class="actor">${personaje.actor}</div>
      </div>
    `
  })
}

function actualizarFiltros(episodes) {
  // Cuenta los episodios de cada temporada: { 1: 12, 2: 16, ... }
  const episodiosPorTemporada = {};

  episodes.forEach(ep => {
    episodiosPorTemporada[ep.season] = (episodiosPorTemporada[ep.season] || 0) + 1;
  });

  const temporadas = Object.keys(episodiosPorTemporada)
    .map(Number)
    .sort((a, b) => a - b);

  // Primer select: una opción por temporada
  filtroTemporadas.innerHTML = '<option value="">Todas las temporadas</option>';
  temporadas.forEach(t => {
    filtroTemporadas.innerHTML += `<option value="${t}" class="option">Temporada ${t}</option>`;
  });

  // Segundo select: episodios de la temporada elegida
  function cargarEpisodios() {
    const temporada = filtroTemporadas.value;
    filtroEpisodios.innerHTML = '<option value="">Todos los episodios</option>';

    if (!temporada) return;

    const cantidad = episodiosPorTemporada[temporada];
    for (let i = 1; i <= cantidad; i++) {
      filtroEpisodios.innerHTML += `<option value="${i}" class="option">Episodio ${i}</option>`;
    }
  }

  filtroTemporadas.addEventListener('change', cargarEpisodios);
  cargarEpisodios();
}

function mostrarEpisodios(lista) {
  contenedorE.innerHTML = "";

  if (lista.length === 0) {
    contenedorE.innerHTML = "<p>No hay episodios para mostrar.</p>";
    return;
  }

  lista.forEach(episodio => {
    contenedorE.innerHTML += `
      <article class="card">
        <h2 class="nombre">${episodio.episode}</h2>
        <img src="${episodio.imagen}">
        <p class="temporada"> Temporada: ${episodio.season}</p>
        <p class="capitulo"> Capitulo: ${episodio.chapter}</p>
        <p class="rating"> Rating: ${episodio.rating}</p>
        <p class="descripción">${episodio.descripcion}</p>
      </article>
    `
  })
}

// Completa el segundo select según la temporada elegida
function cargarEpisodios() {
  const temporada = filtroTemporadas.value;
  filtroEpisodios.innerHTML = '<option value="">Todos los episodios</option>';

  if (!temporada) return;

  const cantidad = episodiosPorTemporada[temporada];
  for (let i = 1; i <= cantidad; i++) {
    filtroEpisodios.innerHTML += `<option value="${i}" class="option">Episodio ${i}</option>`;
  }
}

// Filtra según lo que haya en los dos selects
function filtrarEpisodios() {
  const temporada = filtroTemporadas.value;
  const capitulo = filtroEpisodios.value;

  const filtrados = todosLosEpisodios.filter(ep => {
    const coincideTemporada = !temporada || ep.season === Number(temporada);
    const coincideCapitulo = !capitulo || ep.chapter === Number(capitulo);
    return coincideTemporada && coincideCapitulo;
  });

  mostrarEpisodios(filtrados);
}

function actualizarFiltros() {
  episodiosPorTemporada = {};

  todosLosEpisodios.forEach(ep => {
    episodiosPorTemporada[ep.season] = (episodiosPorTemporada[ep.season] || 0) + 1;
  });

  const temporadas = Object.keys(episodiosPorTemporada)
    .map(Number)
    .sort((a, b) => a - b);

  filtroTemporadas.innerHTML = '<option value="">Todas las temporadas</option>';
  temporadas.forEach(t => {
    filtroTemporadas.innerHTML += `<option value="${t}" class="option">Temporada ${t}</option>`;
  });

  cargarEpisodios();
}

// Listeners (se agregan una sola vez)
filtroTemporadas.addEventListener('change', () => {
  cargarEpisodios();   // actualiza el segundo select
  filtrarEpisodios();  // y filtra las tarjetas
});
filtroEpisodios.addEventListener('change', filtrarEpisodios);

async function episodios() {
  const resultado = await fetch('https://api.tvmaze.com/shows/172/episodes');
  const respuesta = await resultado.json();

  todosLosEpisodios = respuesta.map(entry => ({
    episode: entry.name,
    season: entry.season,
    chapter: entry.number,
    descripcion: entry.summary,
    rating: entry.rating?.average,
    imagen: entry.image?.medium
  }));

  mostrarEpisodios(todosLosEpisodios);
  actualizarFiltros();
}

personajes();
episodios();