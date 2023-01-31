import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RecipesContext } from '../context/RecipesProvider';
import RecipeCard from './RecipeCard';
import { infoFoodRequest } from '../services/foodAPI';
import { infoDrinkRequest } from '../services/drinkAPI';

function Recipes(props) {
  const { pageSubject } = props;
  const { recipes, setRecipes } = useContext(RecipesContext);
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
      setRecipes(initialMealsFetched);
      break;
    }

    case 'Drink': {
      const inicialDrinksFetched = await infoDrinkRequest({ key: 'name', search: '' });
      const categoriesFetch = await infoDrinkRequest({ key: 'categories', search: '' });
      const categoriesArray = [...categoriesFetch.drinks];
      setCategories(categoriesArray);
      setRecipes(inicialDrinksFetched);
    }
      break;
    default:
    }
  };

  useEffect(() => {
    initialRecipes();
  }, []);

  const handleCategoryClick = async ({ target }) => {
    const { innerText } = target;

    if (categoryFilterOn) {
      initialRecipes();
      setCategoryFilterOn(false);
    } else {
      setCategoryFilterOn(true);
      switch (pageSubject) {
      case 'Meal': {
        const recipesByCategory = await infoFoodRequest({
          key: 'categoryFilter', search: innerText });
        setRecipes(recipesByCategory);
      }
        break;

      case 'Drink': {
        const recipesByCategory = await infoDrinkRequest({
          key: 'categoryFilter', search: innerText });
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

  return (
    <div>
      <div>
        {categories.slice(0, maxCategoriesToRender).map((cat, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${cat.strCategory}-category-filter` }
            onClick={ handleCategoryClick }
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
        <RecipeCard
          key={ index }
          index={ index }
          recipeName={ rec[`str${pageSubject}`] }
          imgSrc={ rec[`str${pageSubject}Thumb`] }
        />
      ))}
    </div>
  );
}

export default Recipes;

Recipes.propTypes = {
  pageSubject: PropTypes.string.isRequired,
};
