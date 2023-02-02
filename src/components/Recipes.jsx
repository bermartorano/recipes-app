import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { RecipesContext } from '../context/RecipesProvider';
import RecipeCard from './RecipeCard';

import { infoFoodRequest } from '../services/foodAPI';
import { infoDrinkRequest } from '../services/drinkAPI';

function Recipes({ pageSubject }) {
  const { recipes, setRecipes } = useContext(RecipesContext);

  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [categoryFilterOn, setCategoryFilterOn] = useState(false);
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

    if (categoryFilterOn) {
      initialRecipes();
      setCategoryFilterOn(false);
    } else {
      setCategoryFilterOn(true);
      switch (pageSubject) {
      case 'Meal': {
        const recipesByCategory = await infoFoodRequest({
          key: 'categoryFilter', search: value });
        setRecipes(recipesByCategory);
      }
        break;

      case 'Drink': {
        const recipesByCategory = await infoDrinkRequest({
          key: 'categoryFilter', search: value });
        console.log(recipesByCategory);
        setRecipes(recipesByCategory);
      }
        break;
      default:
      }
    }
  };

  const handleClearFilters = async () => {
    initialRecipes();
  };

  const handleCardClick = (id) => {
    const pageTitle = `${pageSubject.toLowerCase()}s`;
    history.push(`/${pageTitle}/${id}`);
  };

  return (
    <div>
      <div>
        {categories.slice(0, maxCategoriesToRender).map((cat, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${cat.strCategory}-category-filter` }
            onClick={ handleCategoryClick }
            value={ cat.strCategory }
          >
            {`${cat.strCategory}`}
          </button>
        ))}
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ handleClearFilters }
        >
          All
        </button>
      </div>
      {recipesToRender.map((rec, index) => (
        <div
          role="presentation"
          className="card-recipe"
          key={ index }
          onClick={ () => handleCardClick(rec[`id${pageSubject}`]) }
          onKeyDown={ () => handleCardClick(rec[`id${pageSubject}`]) }
        >
          <RecipeCard
            index={ index }
            recipeName={ rec[`str${pageSubject}`] }
            imgSrc={ rec[`str${pageSubject}Thumb`] }
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
