import React, { useState, useEffect } from 'react';
import RecipeDetails from './RecipeDetails';

const SearchRecipesWithCategories = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Stanje za pretraženi pojam
  const [searchResults, setSearchResults] = useState([]); // Stanje za rezultate pretraživanja
  const [recipesData, setRecipesData] = useState([]); // Stanje za podatke recepata
  const [selectedCategory, setSelectedCategory] = useState(null); // Stanje za odabranu kategoriju
  const [showNoResults, setShowNoResults] = useState(false); // Stanje za prikazivanje poruke "Nema rezultata"
  const [categoryStyles, setCategoryStyles] = useState({ // Stanje za stilove kategorija
    Kategorija1: false,
    Kategorija2: false,
    // Dodajte više kategorija ovdje sa njihovim zadanim stilovima
  });

  useEffect(() => {
    // Simulacija dohvaćanja podataka s API endpointa
    const fetchData = async () => {
      try {
        // Zamijenite ovaj URL s vašim stvarnim API endpointom za recepte
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
        const jsonData = await response.json();
        //setRecipesData(jsonData.meals || []); // Postavljanje podataka iz API-ja u stanje (koristi jsonData.meals ili prazno polje ako nema jela)
        setRecipesData([
          // Sample search results (replace this with actual search data)
          {
            id: 1,
            title: 'Recipe 1',
            description: 'Description of Recipe 1',
            image: 'image_url_1.jpg',
            creator: 'John Doe',
            categories: ['Category1', 'Category2'],
            likes: 20,
            saves: 10,
            comments: 5,
            // Add other necessary properties
          },
          {
            id: 2,
            title: 'Recipe 2',
            description: 'Description of Recipe 2',
            image: 'image_url_2.jpg',
            creator: 'Jane Smith',
            categories: ['Category2', 'Category3'],
            likes: 30,
            saves: 15,
            comments: 8,
            // Add other necessary properties
          },
          // Add more search results as needed
        ]);
      } catch (error) {
        console.error('Greška prilikom dohvaćanja podataka:', error);
      }
    };

    fetchData();
  }, []);



  const handleInputChange = (event) => {
    setShowNoResults(false); // Sakrij poruku "Nema rezultata" kad se promijeni unos
    setSearchTerm(event.target.value); // Postavljanje unesenog pojma u stanje
    if (event.target.value === '') {
      setSearchResults([]); // Ako je polje za unos prazno, postavi rezultate pretraživanja na prazan niz i prekini
      return;
    }

    const results = recipesData.filter((recipe) =>
      //(recipe.strMeal.toLowerCase().includes(event.target.value.toLowerCase()) || // Filtriranje prema unesenom tekstu
      //recipe.strInstructions.toLowerCase().includes(event.target.value.toLowerCase())) &&
      //(selectedCategory ? recipe.strCategory.toLowerCase() === selectedCategory.toLowerCase() : true) // Filtriranje po odabranoj kategoriji
      (recipe.title.toLowerCase().includes(event.target.value.toLowerCase()) || // Filtriranje prema unesenom tekstu
      recipe.description.toLowerCase().includes(event.target.value.toLowerCase())) &&
      //(selectedCategory ? recipe.categories.toLowerCase() === selectedCategory.toLowerCase() : true) // Filtriranje po odabranoj kategoriji
      (!selectedCategory || recipe.categories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase()))
      );

    setSearchResults(results); // Postavljanje filtriranih rezultata u stanje
    if (results.length === 0) {
      setShowNoResults(true); // Prikaži poruku "Nema rezultata" ako nema rezultata pretrage
    }
  };

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Ako je već odabrana kategorija, poništi odabir
      setCategoryStyles({ ...categoryStyles, [category]: false }); // Postavljanje stila na false za odabranu kategoriju
    } else {
      setSelectedCategory(category); // Postavljanje odabrane kategorije
      setCategoryStyles({ ...categoryStyles, [category]: true }); // Postavljanje stila na true za odabranu kategoriju
    }
  };

  return (
    <div>
      <div>
        {/* Gumbi ili linkovi za kategorije */}
        <button
          style={{ backgroundColor: categoryStyles.Kategorija1 ? 'blue' : 'initial' }}
          onClick={() => handleCategoryClick('Kategorija1')}
        >
          Kategorija 1
        </button>
        <button
          style={{ backgroundColor: categoryStyles.Kategorija2 ? 'blue' : 'initial' }}
          onClick={() => handleCategoryClick('Kategorija2')}
        >
          Kategorija 2
        </button>
        {/* Dodajte više gumba ili linkova za druge kategorije */}
      </div>
      <div>
        <input
          type="text"
          placeholder="Pretraži recepte..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        {showNoResults && <p>Nema rezultata</p>} {/* Poruka "Nema rezultata" */}
      </div>
      <div>
        {/* Rendering RecipeDetails component with searchResults */}
        <RecipeDetails recipes={searchResults} />
      </div>
    </div>
  );
};

export default SearchRecipesWithCategories;
