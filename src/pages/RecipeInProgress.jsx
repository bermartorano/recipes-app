import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { infoDrinkRequest } from '../services/drinkAPI';
import { infoFoodRequest } from '../services/foodAPI';

function RecipeInProgress({ match: { url, params: { id } } }) {
  const [recipeInProgressInfo, setRecipeInProgressInfo] = useState({});
  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredCheck, setIngredCheck] = useState({});
  const actualPage = (url.includes('meals')) ? 'Meal' : 'Drink';

  const fetchRecipe = async () => {
    switch (actualPage) {
    case 'Meal': {
      const recipe = await infoFoodRequest({ key: 'recipeId', search: id });
      setRecipeInProgressInfo(recipe.meals[0]);
    }
      break;

    case 'Drink': {
      const recipe = await infoDrinkRequest({ key: 'recipeId', search: id });
      setRecipeInProgressInfo(recipe.drinks[0]);
    }
      break;

    default:
      break;
    }
  };

  useEffect(() => {
    fetchRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIngredientsAndMeasures = () => {
    const recipeKeys = Object.keys(recipeInProgressInfo);
    const recipeIngredients = recipeKeys.filter((key) => {
      const ingredientKey = key.includes('strIngredient');
      const itIsNull = recipeInProgressInfo[key] === null;
      const itIsEmpty = recipeInProgressInfo[key] === '';
      const result = ingredientKey && !itIsNull && !itIsEmpty;
      return result;
    });
    const recipeIngAndMeasures = recipeIngredients.map((ingred, index) => {
      const measureIndex = index + 1;
      const actualMeasure = recipeInProgressInfo[`strMeasure${measureIndex}`];
      const result = [recipeInProgressInfo[ingred], actualMeasure];
      return result;
    });
    setIngredientsList(recipeIngAndMeasures);
  };

  useEffect(() => {
    getIngredientsAndMeasures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeInProgressInfo]);

  useEffect(() => {
    const initialCheckState = ingredientsList.reduce((acc, ingAndMeasure) => {
      console.log(ingAndMeasure);
      const result = { ...acc, [ingAndMeasure[0]]: false };
      return result;
    }, {});
    setIngredCheck(initialCheckState);
  }, [ingredientsList]);

  const handleCheckClick = ({ target: { name } }) => {
    setIngredCheck({ ...ingredCheck, [name]: !ingredCheck[name] });
  };

  return (
    <div>
      <img
        src={ recipeInProgressInfo[`str${actualPage}Thumb`] }
        alt="recipe"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{ recipeInProgressInfo[`str${actualPage}`] }</p>
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
      <p data-testid="recipe-category">
        { recipeInProgressInfo.strCategory }
      </p>
      {ingredientsList.map((ingAndMeasure, index) => (
        <div key={ index }>
          <label
            htmlFor={ `ingrdt-checkbox-${index}` }
            data-testid={ `${index}-ingredient-step` }
            className={ ingredCheck[ingAndMeasure[0]] ? 'checkbox-done' : null }
          >
            <p>
              {`${ingAndMeasure[0]} - ${ingAndMeasure[1]} `}
            </p>
            <input
              name={ ingAndMeasure[0] }
              type="checkbox"
              onClick={ handleCheckClick }
            />
          </label>
        </div>
      ))}
      <p data-testid="instructions">
        {recipeInProgressInfo.strInstructions}
      </p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape(PropTypes.any.isRequired).isRequired,
};

export default RecipeInProgress;
