import React from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavButtonForFavPage({ recipeId, index, setInitialRecipes }) {
  const deleteFromArray = (array, element) => {
    const result = [...array];
    const indexToDelete = result.indexOf(element);
    result.splice(indexToDelete, 1);
    return result;
  };

  const handleclick = () => {
    const favRecipesLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const recipeToDelete = favRecipesLS.find((rcp) => rcp.id === recipeId);
    const newFavRecipes = deleteFromArray(favRecipesLS, recipeToDelete);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavRecipes));
    setInitialRecipes(newFavRecipes);
  };

  return (
    <button
      type="button"
      onClick={ handleclick }
      data-testid="favorite-btn"
    >
      <img
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ blackHeartIcon }
        alt="Favorite Button"
      />
    </button>
  );
}

FavButtonForFavPage.propTypes = {
  recipeId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  setInitialRecipes: PropTypes.func.isRequired,
};
