
import React from 'react';

const RecipeDetails = ({ recipes }) => {
  return (
    <div>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-box">
            <div className="recipe-item">
              <h2>{recipe.strMeal}</h2>
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
              <p>Description: {recipe.description}</p>
              <p>Created by: {recipe.creator}</p>
              <p>Categories: {recipe.categories}</p>
              <p>Likes: {recipe.likes}</p>
              <p>Saves: {recipe.saves}</p>
              <p>Comments: {recipe.comments}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetails;