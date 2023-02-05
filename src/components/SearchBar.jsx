import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { RecipesContext } from '../context/RecipesProvider';
import { fetchRecipe, pageChecker, pageReferences } from '../services/helperCorrectPage';

export default function SearchBar() {
  const { recipes, setRecipes } = useContext(RecipesContext);
  const [searchInfo, setSearchInfo] = useState({
    searchBarInput: '',
    searchFilter: '',
  });

  const history = useHistory();

  const { page, id } = pageReferences(pageChecker(history.location.pathname)[0]);

  const handleChange = ({ target: { value, name } }) => {
    setSearchInfo({ ...searchInfo, [name]: value });
  };

  useEffect(() => {
    if (recipes[page].length === 1) {
      console.log(recipes[page]);
      history.push(`/${page}/${recipes[page][0][id]}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes]);

  const handleClick = async () => {
    const { searchBarInput, searchFilter } = searchInfo;

    if (searchFilter === 'firstLetter' && searchBarInput.length > 1) {
      // eslint-disable-next-line no-alert
      return alert('Your search must have only 1 (one) character');
    }

    const recipeFetch = await fetchRecipe(page)({
      key: searchFilter,
      search: searchBarInput });

    if (!recipeFetch) {
      // eslint-disable-next-line no-alert
      return alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setRecipes({ ...recipes, [page]: [...recipeFetch] });
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
