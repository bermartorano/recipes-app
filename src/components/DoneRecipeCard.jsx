import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';

export default function DoneRecipeCard(props) {
  const {
    index,
    recipe: {
      alcoholicOrNot,
      category,
      doneDate,
      id,
      image,
      name,
      nationality,
      tags,
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
      <div>
        {tags.map((tag, i) => (
          <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{ tag }</p>))}
      </div>
      <ShareButton url={ `http://localhost:3000/${type}s/${id}` } index={ index } />
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape(PropTypes.isRequired).isRequired,
  index: PropTypes.number.isRequired,
};
