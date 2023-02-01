import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ index, recipeName, imgSrc }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ imgSrc }
        alt="Ilustração da receita"
      />
      <p data-testid={ `${index}-card-name` }>
        {recipeName}
      </p>
    </div>
  );
}

export default RecipeCard;

RecipeCard.propTypes = {
  recipeName: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
