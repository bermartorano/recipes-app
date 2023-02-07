import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';
import FavButtonForFavPage from './FavButtonForFavPage';

export default function FavRecipeCard(props) {
  const {
    index,
    setInitialRecipes,
    recipe: {
      alcoholicOrNot,
      category,
      doneDate,
      id,
      image,
      name,
      nationality,
      type,
    },
  } = props;
  const url = `/${type}s/${id}`;

  return (
    <div>
      <Link to={ url }>
        <img
          src={ image }
          alt="Recipe"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { type === 'meal'
          ? `${nationality} - ${category}` : `${alcoholicOrNot} - ${category}`}
      </p>
      <Link to={ url }>
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      <ShareButton url={ `http://localhost:3000/${type}s/${id}` } index={ index } />
      <FavButtonForFavPage
        recipeId={ id }
        index={ index }
        setInitialRecipes={ setInitialRecipes }
      />
    </div>
  );
}

FavRecipeCard.propTypes = {
  recipe: PropTypes.shape(PropTypes.isRequired).isRequired,
  index: PropTypes.number.isRequired,
  setInitialRecipes: PropTypes.func.isRequired,
};
