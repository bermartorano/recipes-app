import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { RecipesContext } from '../context/RecipesProvider';
import RecipeCard from './RecipeCard';

import { infoFoodRequest } from '../services/foodAPI';
import { infoDrinkRequest } from '../services/drinkAPI';

function Recipes({ pageSubject }) {
  const { recipes, setRecipes } = useContext(RecipesContext);

  async function initialRecipes() {
    switch (pageSubject) {
    case 'Meal': {
      const { meals } = await infoFoodRequest({ key: 'name', search: '' });
      setRecipes({ ...recipes, meals });
      break;
    }

    case 'Drink': {
      const { drinks } = await infoDrinkRequest({ key: 'name', search: '' });
      setRecipes({ ...recipes, drinks });
    }
      break;
    default:
    }
  }

  useEffect(() => {
    initialRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const maxRecipesToRender = 12;
  const { [`${pageSubject.toLowerCase()}s`]: recipesKey } = recipes;
  const recipesToRender = recipesKey.slice(0, maxRecipesToRender);

  return (
    <div>
      {recipesToRender.map((recipe, index) => (
        <RecipeCard
          key={ index }
          index={ index }
          recipeName={ recipe[`str${pageSubject}`] }
          imgSrc={ recipe[`str${pageSubject}Thumb`] }
        />
      ))}
    </div>
  );
}

export default Recipes;

Recipes.propTypes = {
  pageSubject: PropTypes.string.isRequired,
};
