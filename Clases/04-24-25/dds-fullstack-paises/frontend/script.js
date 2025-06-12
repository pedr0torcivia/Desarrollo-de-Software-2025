// frontend/script.js
document.addEventListener('DOMContentLoaded', () => {
    const countriesContainer = document.getElementById('countries-container');
    const loadingMessage = document.getElementById('loading-message');
  
    const API_URL = 'http://localhost:3000/api/countries';
  
    async function fetchCountries() {
      try {
        if (loadingMessage) loadingMessage.style.display = 'none';
  
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
        const countries = await response.json();
        countriesContainer.innerHTML = ''; // Limpiar contenedor
  
        renderCountries(countries);
      } catch (error) {
        console.error('Error al obtener los países:', error);
        countriesContainer.innerHTML = `<p class="text-danger">Error al cargar los países: ${error.message}</p>`;
      }
    }
  
    function renderCountries(countries) {
      if (!countries || countries.length === 0) {
        countriesContainer.innerHTML = '<p>No se encontraron países.</p>';
        return;
      }
  
      countries.forEach(country => {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col');
  
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'h-100', 'country-card');
  
        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.classList.add('card-body', 'text-center'); // Centrar contenido
  
        // Bandera
        const flagImg = document.createElement('img');
        flagImg.src = country.flag || 'placeholder.svg';
        flagImg.alt = `${country.name} flag`;
        flagImg.classList.add('country-flag', 'mb-3'); // Espaciado inferior
  
        // Nombre del país
        const nameElement = document.createElement('h5');
        nameElement.classList.add('card-title', 'mb-3');
        nameElement.textContent = country.name;
  
        // Población
        const populationElement = document.createElement('p');
        populationElement.classList.add('card-text');
        populationElement.textContent = `Población: ${country.population ? country.population.toLocaleString() : 'N/D'}`;
  
        // Moneda
        const currencyElement = document.createElement('p');
        currencyElement.classList.add('card-text');
        currencyElement.textContent = `Moneda: ${country.currency || 'N/D'}`;
  
        // Agregar elementos al cuerpo de la tarjeta
        cardBodyDiv.appendChild(flagImg);
        cardBodyDiv.appendChild(nameElement);
        cardBodyDiv.appendChild(populationElement);
        cardBodyDiv.appendChild(currencyElement);
  
        // Agregar cuerpo de la tarjeta al contenedor
        cardDiv.appendChild(cardBodyDiv);
        colDiv.appendChild(cardDiv);
        countriesContainer.appendChild(colDiv);
      });
    }
  
    fetchCountries();
  });
