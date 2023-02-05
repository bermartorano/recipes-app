import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { RecipesContext } from '../context/RecipesProvider';
import RecipeCard from './RecipeCard';

import { infoFoodRequest } from '../services/foodAPI';
import { infoDrinkRequest } from '../services/drinkAPI';

function Recipes({ pageSubject }) {
  const { recipes, setRecipes } = useContext(RecipesContext);
  const [switchSelected, setSwitchButton] = useState('all');

  const [categories, setCategories] = useState([]);

  const recipesKeyText = `${pageSubject.toLowerCase()}s`;
  const { [recipesKeyText]: recipesKey } = recipes;
  const maxRecipesToRender = 12;
  const maxCategoriesToRender = 5;
  const recipesToRender = recipesKey.slice(0, maxRecipesToRender);

  const initialRecipes = async () => {
    switch (pageSubject) {
    case 'Meal': {
      const initialMealsFetched = await infoFoodRequest({ key: 'name', search: '' });
      const categoriesFetch = await infoFoodRequest({ key: 'categories', search: '' });
      const categoriesArray = [...categoriesFetch.meals];
      setCategories(categoriesArray);
      setRecipes({ ...recipes, meals: [...initialMealsFetched.meals] });
      break;
    }

    case 'Drink': {
      const inicialDrinksFetched = await infoDrinkRequest({ key: 'name', search: '' });
      const categoriesFetch = await infoDrinkRequest({ key: 'categories', search: '' });
      const categoriesArray = [...categoriesFetch.drinks];
      setCategories(categoriesArray);
      setRecipes({ ...recipes, drinks: [...inicialDrinksFetched.drinks] });
    }
      break;
    default:
    }
  };

  useEffect(() => {
    initialRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryClick = async ({ target }) => {
    const { value } = target;

    if (switchSelected === value) {
      setSwitchButton('all');
      initialRecipes();
    } else {
      setSwitchButton(value);
    }

    switch (pageSubject) {
    case 'Meal': {
      const recipesByCategory = await infoFoodRequest({
        key: 'categoryFilter', search: value });
      return setRecipes({ ...recipes, meals: [...recipesByCategory.meals] });
    }

    case 'Drink': {
      const recipesByCategory = await infoDrinkRequest({
        key: 'categoryFilter', search: value });
      return setRecipes({ ...recipes, drinks: [...recipesByCategory.drinks] });
    }
    default:
    }
  };

  function handleClearFilters() {
    setSwitchButton('all');
    initialRecipes();
  }

  return (
    <div>
      <div>
        {categories.slice(0, maxCategoriesToRender).map(({ strCategory }, index) => (
          <label htmlFor={ `switch-${index}` } key={ index }>
            <input
              type="checkbox"
              id={ `switch-${index}` }
              data-testid={ `${strCategory}-category-filter` }
              onChange={ handleCategoryClick }
              value={ strCategory }
              checked={ switchSelected === strCategory }
            />
            {`${strCategory}`}
          </label>
        ))}
        <label htmlFor="all-categories-recipes">
          <input
            type="checkbox"
            data-testid="All-category-filter"
            onClick={ handleClearFilters }
            value="all"
            name="all-categories-recipes"
            onChange={ handleClearFilters }
            checked={ switchSelected === 'all' }
          />
          All
        </label>
      </div>
      {recipesToRender.map((rec, index) => (
        <div
          className="card-recipe"
          key={ index }
        >
          <RecipeCard
            index={ index }
            recipeName={ rec[`str${pageSubject}`] }
            imgSrc={ rec[`str${pageSubject}Thumb`] }
            url={ `/${recipesKeyText}/${rec[`id${pageSubject}`]}` }
          />
        </div>
      ))}
    </div>
  );
}

export default Recipes;

Recipes.propTypes = {
  pageSubject: PropTypes.string.isRequired,
};
