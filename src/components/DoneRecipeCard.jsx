import React from 'react';
import PropTypes from 'prop-types';
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

  return (
    <div>
      <img src={ image } alt="Recipe" data-testid={ `${index}-horizontal-image` } />
      <p data-testid={ `${index}-horizontal-top-text` }>{ category }</p>
      <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      <ShareButton url={ `http://localhost:3000/${type}s/${id}` } index={ index } />
      <div>
        {tags.map((tag, i) => (
          <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{ tag }</p>))}
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape(PropTypes.isRequired).isRequired,
  index: PropTypes.number.isRequired,
};
