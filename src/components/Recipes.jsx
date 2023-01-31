import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RecipesContext } from '../context/RecipesProvider';
import RecipeCard from './RecipeCard';
import { infoFoodRequest } from '../services/foodAPI';
import { infoDrinkRequest } from '../services/drinkAPI';

function Recipes(props) {
  const { pageSubject } = props;
  const { recipes, setRecipes } = useContext(RecipesContext);
  const recipesKeyText = `${pageSubject.toLowerCase()}s`;
  const { [recipesKeyText]: recipesKey } = recipes;
  const maxRecipesToRender = 12;
  const recipesToRender = recipesKey.slice(0, maxRecipesToRender);

  useEffect(() => {
    const initialRecipes = async () => {
      switch (pageSubject) {
      case 'Meal': {
        const inicialMealsFetched = await infoFoodRequest({ key: 'name', search: '' });
        setRecipes(inicialMealsFetched);
        break;
      }

      case 'Drink': {
        const inicialDrinksFetched = await infoDrinkRequest({ key: 'name', search: '' });
        setRecipes(inicialDrinksFetched);
      }
        break;
      default:
      }
    };
    initialRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {recipesToRender.map((rec, index) => (
        <RecipeCard
          key={ index }
          index={ index }
          recipeName={ rec[`str${pageSubject}`] }
          imgSrc={ rec[`str${pageSubject}Thumb`] }
        />
      ))}
    </div>
  );
}

export default Recipes;

Recipes.propTypes = {
  pageSubject: PropTypes.string.isRequired,
};
