import React, { useEffect, useState } from 'react';
import { infoDrinkRequest } from '../services/drinkAPI';
import { infoFoodRequest } from '../services/foodAPI';

export default function RecipeDetails({ match: { url, params: { id } } }) {
  const [recipeInfo, setRecipeInfo] = useState({});

  const fetchRecipe = async () => {
    if (url.includes('meals')) {
      const data = await infoFoodRequest({ key: 'recipeId', search: id });
      const { meals } = await data.json();
      setRecipeInfo(meals[0]);
    }
    if (url.includes('drinks')) {
      const data = await infoDrinkRequest({ key: 'recipeId', search: id });
      const { drinks } = await data.json();
      setRecipeInfo(drinks[0]);
    }
  };

  useEffect(() => {
    fetchRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p>{ recipeInfo.title }</p>
    </div>
  );
}

RecipeDetails.propTypes = {}.isRequired;
