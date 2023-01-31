import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { infoFoodRequest } from '../services/foodAPI';
import { infoDrinkRequest } from '../services/drinkAPI';
import { RecipesContext } from '../context/RecipesProvider';

export default function SearchBar(props) {
  const { titleToFetch } = props;
  const { recipes, setRecipes } = useContext(RecipesContext);
  const [searchInfo, setSearchInfo] = useState({
    searchBarInput: '',
    searchFilter: '',
  });
  const history = useHistory();

  const handleChange = ({ target: { value, name } }) => {
    setSearchInfo({ ...searchInfo, [name]: value });
  };

  useEffect(() => {
    const sliceLimit = -1;
    const pageName = `${titleToFetch.toLowerCase()}`;
    const titleToFetchWithoutLastCharacter = titleToFetch.slice(0, sliceLimit);
    const { [pageName]: recipesKey } = recipes;
    const [recipe] = recipesKey;
    if (recipesKey.length === 1) {
      history.push(`/${pageName}/${recipe[`id${titleToFetchWithoutLastCharacter}`]}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes]);

  const handleClick = async () => {
    const { searchBarInput, searchFilter } = searchInfo;

    if (searchFilter === 'firstLetter' && searchBarInput.length > 1) {
      // eslint-disable-next-line no-alert
      alert('Your search must have only 1 (one) character');
    }

    switch (titleToFetch) {
    case 'Meals': {
      const mealsFetched = await infoFoodRequest({
        key: searchFilter,
        search: searchBarInput,
      });

      if (!mealsFetched.meals) {
        // eslint-disable-next-line no-alert
        alert('Sorry, we haven\'t found any recipes for these filters.');
        break;
      }
      setRecipes(mealsFetched);
    }
      break;

    case 'Drinks': {
      const drinksFetched = await infoDrinkRequest({
        key: searchFilter,
        search: searchBarInput,
      });

      if (!drinksFetched.drinks) {
        // eslint-disable-next-line no-alert
        alert('Sorry, we haven\'t found any recipes for these filters.');
        break;
      }
      setRecipes(drinksFetched);
    }

      break;
    default:
      break;
    }
  };

  return (
    <div>
      <input
        type="text"
        name="searchBarInput"
        data-testid="search-input"
        value={ searchInfo.searchBarInput }
        onChange={ handleChange }
      />
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleClick }
      >
        procurar
      </button>
      <label htmlFor="radio-select-search">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          value="ingredient"
          name="searchFilter"
          onClick={ handleChange }
        />
        <p>Ingrediente</p>
        <input
          type="radio"
          data-testid="name-search-radio"
          value="name"
          name="searchFilter"
          onClick={ handleChange }
        />
        <p>Nome</p>
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          value="firstLetter"
          name="searchFilter"
          onClick={ handleChange }
        />
        <p>Primeira Letra</p>
      </label>
    </div>
  );
}

SearchBar.propTypes = {
  titleToFetch: PropTypes.string.isRequired,
};
