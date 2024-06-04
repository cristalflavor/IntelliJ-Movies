const API_SERVER = "https://api.themoviedb.org/3";
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDllMjAzNzcxMjhjNGFmZGE2MTQ4M2JiMDM3ZmZlNiIsInN1YiI6IjY2MWY1Mjc2N2FlY2M2MDE3YzZjYTJhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YVRd2kyTn_H8ZiI8qkcsQxPcgIio_J1YhztBtqO8T9A";

// Función para obtener el parámetro de la URL
const getUrlParameter = (name) => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

// Función para manejar la búsqueda de películas
const handleSearch = async (event) => {
    event.preventDefault();
    const query = document.getElementById("buscar").value.trim();
    if (!query) return;
  
    const response = await fetch(
      `${API_SERVER}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    const movies = data.results;
    
    // Filtramos las películas que coinciden exactamente con el nombre buscado
    const exactMatches = movies.filter(movie => movie.title.toLowerCase() === query.toLowerCase());
  
    const resultadosContainer = document.getElementById("resultados-busqueda");
    resultadosContainer.innerHTML = "";
    const peliculasContainer = createElement("div", "peliculas");
}  

// Obtener el ID de la película desde la URL
const movieId = getUrlParameter('id');

const cargarMovieDetalles = async (movieId) => {
    try {
        const response = await fetch(`${API_SERVER}/movie/${movieId}`, {
            headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Aquí obtendrás los detalles específicos de la película

        // Actualiza el DOM con los detalles de la película
        document.getElementById('detalle-titulo').innerHTML = data.title;
        document.getElementById('detalle-sinopsis').innerHTML = data.overview;
        document.getElementById('img-poster').src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
        document.getElementById('detalle-fecha-genero').innerHTML = `${data.release_date} • ${data.genres.map(genre => genre.name).join(', ')} • ${data.runtime} min`;
        // Cambiar dinámicamente el fondo de la sección .detalle
        const detalleSection = document.querySelector('.detalle');
        detalleSection.style.backgroundImage = `linear-gradient(to right top, #6d6969a7, #6d6969a7), url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`;

        // Actualiza la información de la tabla
        document.getElementById('detalle-estado').innerHTML = data.status === 'Released' ? 'Estrenada' : data.status;
        document.getElementById('detalle-lenguaje').innerHTML = data.original_language === 'en' ? 'Inglés' : data.original_language;
        document.getElementById('detalle-presupuesto').innerHTML = `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.budget)}`;
        document.getElementById('detalle-ganancias').innerHTML = `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.revenue)}`;

        // Renderizar enlace al sitio web si está disponible
        if (data.homepage) {
            const redesContainer = document.querySelector('.redes ul');
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = data.homepage;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            const img = document.createElement('img');
            img.src = "../assets/img/homepage.svg";
            img.alt = "logo-homepage";
            a.appendChild(img);
            li.appendChild(a);
            redesContainer.appendChild(li);
        }

        // Cargar los créditos (directores)
        const creditosResponse = await fetch(`${API_SERVER}/movie/${movieId}/credits`, {
            headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (!creditosResponse.ok) {
            throw new Error(`HTTP error! status: ${creditosResponse.status}`);
        }

        const creditosData = await creditosResponse.json();
        const directores = creditosData.crew.filter(person => person.job === 'Director');
        const creditosContainer = document.getElementById('detalle-creditos');
        creditosContainer.innerHTML = '';
        directores.forEach(director => {
            const directorDiv = document.createElement('div');
            const directorName = document.createElement('h3');
            directorName.textContent = director.name;
            const directorRole = document.createElement('p');
            directorRole.textContent = 'Director';
            directorDiv.appendChild(directorName);
            directorDiv.appendChild(directorRole);
            creditosContainer.appendChild(directorDiv);
        });

    } catch (error) {
        console.error("Error fetching movie details:", error);
    }
};
// Función para cargar los videos del tráiler
const cargarVideosTrailer = async (movieId) => {
    try {
      const response = await fetch(`${API_SERVER}/movie/${movieId}/videos`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data); // Aquí obtendrás los videos asociados con la película
  
      // Filtrar para obtener el tráiler
      const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailer) {
        document.getElementById('detalle-trailer').src = `https://www.youtube.com/embed/${trailer.key}`;
      } else {
        console.log('No se encontró un tráiler en YouTube.');
      }
  
    } catch (error) {
      console.error("Error fetching movie trailer:", error);
    }
  };


  
  const cargarRedesSociales = async (movieId) => {
    try {
      const response = await fetch(`${API_SERVER}/movie/${movieId}/external_ids`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data); 
  
      // Actualizar el HTML con los enlaces a las redes sociales
      const redesContainer = document.querySelector('.redes ul');
      redesContainer.innerHTML = ''; // Limpiar contenido previo
      const redes = {
        Facebook: data.facebook_id,
        Twitter: data.twitter_id,
        Instagram: data.instagram_id,
        Website: data.homepage
      };
      Object.entries(redes).forEach(([red, id]) => {
        if (id && red !== 'Website') {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = id.startsWith('http') ? id : `https://${red.toLowerCase()}.com/${id}`;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          const img = document.createElement('img');
          img.src = `../assets/img/${red.toLowerCase()}.svg`;
          img.alt = `logo-${red.toLowerCase()}`;
          a.appendChild(img);
          li.appendChild(a);
          redesContainer.appendChild(li);
        } else if (id && red === 'Website') {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = id;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          const icono = document.createElement('i');
          icono.className = "bi bi-link-45deg";
          a.appendChild(icono);
          li.appendChild(a);
          redesContainer.appendChild(li);
        }
      });
  
    } catch (error) {
      console.error("Error fetching movie social networks:", error);
    }
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    const movieId = getUrlParameter('id');
    if (movieId) {
        cargarRedesSociales(movieId);
        cargarMovieDetalles(movieId);
        cargarVideosTrailer(movieId);
    }
});