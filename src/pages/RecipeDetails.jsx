import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { infoDrinkRequest } from '../services/drinkAPI';
import { infoFoodRequest } from '../services/foodAPI';

export default function RecipeDetails({ match: { url, params: { id } } }) {
  const actualPage = (url.includes('meals')) ? 'Meal' : 'Drink';

  const [recipeInfo, setRecipeInfo] = useState({});

  const fetchRecipe = async () => {
    const optionsToFetch = {
      Meal: async () => {
        const { meals } = await infoFoodRequest({ key: 'recipeId', search: id });
        setRecipeInfo(meals[0]);
      },
      Drink: async () => {
        const { drinks } = await infoDrinkRequest({ key: 'recipeId', search: id });
        setRecipeInfo(drinks[0]);
      },
    };
    optionsToFetch[actualPage]();
  };

  useEffect(() => {
    fetchRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { strCategory, strInstructions, strYoutube } = recipeInfo;

  const ingredientes = Object.entries(recipeInfo)
    .reduce((arrayOfElements, [key, value], index) => (
      (key.startsWith('strIngredient') && !!value)
        ? [...arrayOfElements, (
          <li
            key={ `strIngredient-${index}` }
            data-testid={ `${arrayOfElements.length}-ingredient-name-and-measure` }
          >
            { `${value} - ${recipeInfo[`strMeasure${arrayOfElements.length + 1}`]}` }
          </li>)]
        : arrayOfElements), []);

  return (
    <main>
      <h3 data-testid="recipe-title">{ recipeInfo[`str${actualPage}`] }</h3>
      {
        (actualPage === 'Drink' && recipeInfo.strAlcoholic === 'Alcoholic')
          ? (
            <p
              data-testid="recipe-category"
            >
              { `${strCategory} - ${recipeInfo.strAlcoholic}` }
            </p>
          )
          : <p data-testid="recipe-category">{ strCategory }</p>
      }
      <img
        src={ recipeInfo[`str${actualPage}Thumb`] }
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
