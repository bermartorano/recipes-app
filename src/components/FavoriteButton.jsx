import React, { useState } from 'react';
import PropTypes from 'prop-types';
import convertRecipeInfo from '../services/convertRecipeToSaveFunc';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteButton(props) {
  const verifyFavorite = (recipeId) => {
    const favRecipesLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favRecipesLS) {
      console.log(recipeId);
      const alreadyFav = favRecipesLS.some((rcp) => rcp.id === recipeId);
      return alreadyFav;
    }
  };

  const { recipe, mealOrDrink, recipeId } = props;
  const [favorited, setFavorited] = useState(verifyFavorite(recipeId));

  const deleteFromArray = (array, element) => {
    const result = [...array];
    const index = result.indexOf(element);
    result.splice(index, 1);
    return result;
  };

  const handleClick = (recipeToBeConverted, itIsDrinkOrMeal) => {
    console.log(recipeToBeConverted, itIsDrinkOrMeal);
    const recipeToSave = convertRecipeInfo(recipeToBeConverted, itIsDrinkOrMeal);
    console.log('recipeToSave: ', recipeToSave);
    delete recipeToSave.tags;
    delete recipeToSave.doneDate;
    const favRecipesLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favRecipesLS) {
      const alreadyFav = favRecipesLS.find((rcp) => rcp.id === recipeToSave.id);
      if (alreadyFav) {
        const newFav = deleteFromArray(favRecipesLS, alreadyFav);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFav));
        setFavorited(false);
      } else {
        const newDoneRecipes = [...favRecipesLS, recipeToSave];
        localStorage.setItem('favoriteRecipes', JSON.stringify(newDoneRecipes));
        setFavorited(true);
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([recipeToSave]));
      setFavorited(true);
    }
  };

  return (
    <button
      type="button"
      onClick={ () => handleClick(recipe, mealOrDrink) }
    >
      <img
        src={ favorited ? blackHeartIcon : whiteHeartIcon }
        alt="Favorite Button"
        data-testid="favorite-btn"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.shape(PropTypes.any.isRequired).isRequired,
  mealOrDrink: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
};

export default FavoriteButton;
