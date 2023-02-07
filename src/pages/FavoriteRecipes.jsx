import React, { useEffect, useState } from 'react';
import { Header, FavRecipeCard } from '../services/componentsExport';

function FavoriteRecipes() {
  const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let initialFavRecipes = [];
  if (favRecipes) initialFavRecipes = favRecipes;
  const [initialRecipes, setInitialRecipes] = useState(initialFavRecipes);
  const [recipesToRender, setRecipesToRender] = useState(initialFavRecipes);
  const [filterButton, setFilterButton] = useState('clear');

  const handleFilterClick = ({ target: { name } }) => {
    setFilterButton(name);
  };

  const filtering = (filter) => {
    const recipesFiltered = {
      clear: initialRecipes,
      meal: initialRecipes.filter((recipe) => recipe.type === 'meal'),
      drink: initialRecipes.filter((recipe) => recipe.type === 'drink'),
    };
    return recipesFiltered[filter];
  };

  useEffect(() => {
    setRecipesToRender(filtering(filterButton));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterButton]);

  useEffect(() => {
    setRecipesToRender(initialRecipes);
  }, [initialRecipes]);

  return (
    <>
      <Header title="Favorite Recipes" hasSearchIcon={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        name="clear"
        onClick={ handleFilterClick }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        name="meal"
        onClick={ handleFilterClick }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="drink"
        onClick={ handleFilterClick }
      >
        Drinks
      </button>
      { favRecipes && recipesToRender.map((rcp, index) => (
        <FavRecipeCard
          key={ rcp.id }
          recipe={ rcp }
          index={ index }
          setInitialRecipes={ setInitialRecipes }
        />))}
    </>
  );
}

export default FavoriteRecipes;
