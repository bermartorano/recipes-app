import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { RecipesContext } from '../context/RecipesProvider';

import { fetchRecipe, pageChecker, pageReferences } from '../services/helperCorrectPage';

export default function RecipeDetails({ match: { url, params: { id } } }) {
  const actualPage = pageChecker(url);

  const [recipe, setRecipe] = useState({});

  const { page, thumb, title } = pageReferences(actualPage[0]);

  const { recipes: { [page]: recipesArray } } = useContext(RecipesContext);

  useEffect(() => {
    async function fetchReturn() {
      const recipeToRender = await fetchRecipe(page)({
        key: 'recipeId', search: id });
      setRecipe(recipeToRender[0]);
    }

    if (recipesArray.length === 1) {
      setRecipe(recipesArray[0]);
    } else {
      fetchReturn();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { strCategory, strInstructions, strYoutube } = recipe;

  const ingredientes = Object.entries(recipe)
    .reduce((arrayOfElements, [key, value], index) => (
      (key.startsWith('strIngredient') && !!value)
        ? [...arrayOfElements, (
          <li
            key={ `strIngredient-${index}` }
            data-testid={ `${arrayOfElements.length}-ingredient-name-and-measure` }
          >
            { `${value} - ${recipe[`strMeasure${arrayOfElements.length + 1}`]}` }
          </li>)]
        : arrayOfElements), []);

  return (
    <main>
      <h3 data-testid="recipe-title">{ recipe[title] }</h3>
      {
        (page === 'drinks' && recipe.strAlcoholic === 'Alcoholic')
          ? (
            <p
              data-testid="recipe-category"
            >
              { `${strCategory} - ${recipe.strAlcoholic}` }
            </p>
          )
          : <p data-testid="recipe-category">{ strCategory }</p>
      }
      <img
        src={ recipe[thumb] }
        alt="Recipe"
        data-testid="recipe-photo"
      />
      <p data-testid="instructions">{ strInstructions }</p>
      <ol>
        { ingredientes }
      </ol>
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ (strYoutube) ? strYoutube.replace('/watch?v=', '/embed/') : null }
        title="How to do it recipe in video"
        allow="
          accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture;
          web-share"
      />
    </main>
  );
}

// .filter(([key, value]) => (key.startsWith('strIngredient') && !!value))
// .map((eachIngredient, index) => (
//   <li
//     key={ `strIngredient-${index}` }
//   >
//     { eachIngredient[1] }
//   </li>));

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string }),
  }),
}.isRequired;
