import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard(props) {
  const { index, recipeName, imgSrc, url } = props;

  return (
    <Link to={ url }>
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
    </Link>
  );
}

export default RecipeCard;

RecipeCard.propTypes = {
  recipeName: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  url: PropTypes.string,
}.isRequired;
