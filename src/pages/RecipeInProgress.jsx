import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import convertRecipeInfo from '../services/convertRecipeToSaveFunc';
import { fetchRecipe, pageChecker, pageReferences } from '../services/helperCorrectPage';

import { FavoriteButton, ShareButton } from '../services/componentsExport';

function RecipeInProgress({ match: { url, params: { id } } }) {
  const [recipeInProgressInfo, setRecipeInProgressInfo] = useState({});
  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredCheck, setIngredCheck] = useState({});
  const [allChecked, setAllChecked] = useState(false);
  const history = useHistory();
  const actualPage = (url.includes('meals')) ? 'Meal' : 'Drink';

  const { page, thumb } = pageReferences(pageChecker(url)[0]);

  const requestRecipes = async () => {
    const recipe = await fetchRecipe(page)({ key: 'recipeId', search: id });
    setRecipeInProgressInfo(recipe[0]);
  };

  useEffect(() => {
    requestRecipes();
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

  const getInicialCheckState = () => {
    const initialCheckState = ingredientsList.reduce((acc, ingAndMeasure) => {
      const result = { ...acc, [ingAndMeasure[0]]: false };
      return result;
    }, {});
    setIngredCheck(initialCheckState);
  };

  useEffect(() => {
    const ingCheckLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (ingCheckLS) {
      setIngredCheck(ingCheckLS);
    } else {
      getInicialCheckState();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientsList]);

  const handleCheckClick = ({ target: { name } }) => {
    const newIngredCheck = { ...ingredCheck, [name]: !ingredCheck[name] };
    setIngredCheck(newIngredCheck);
    localStorage.setItem('inProgressRecipes', JSON.stringify(newIngredCheck));
  };

  useEffect(() => {
    const allTrue = Object.values(ingredCheck).every((boolean) => boolean);
    setAllChecked(allTrue);
  }, [ingredCheck]);

  const handleFinishClick = () => {
    const recipeToSave = convertRecipeInfo(recipeInProgressInfo, actualPage);
    const doneRecipesLS = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesLS) {
      const newDoneRecipes = [...doneRecipesLS, recipeToSave];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
      history.push('/done-recipes');
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([recipeToSave]));
      history.push('/done-recipes');
    }
  };

  return (
    <div>
      <img
        src={ recipeInProgressInfo[thumb] }
        alt="recipe"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{ recipeInProgressInfo[page] }</p>
      <ShareButton url={ `http://localhost:3000/${page}/${id}` } />
      <FavoriteButton
        recipe={ recipeInProgressInfo }
        recipeId={ id }
        mealOrDrink={ actualPage }
      />
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
              checked={ ingredCheck[ingAndMeasure[0]] }
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
        disabled={ !allChecked }
        onClick={ handleFinishClick }
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
