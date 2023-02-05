import { infoDrinkRequest } from './drinkAPI';
import { infoFoodRequest } from './foodAPI';

export function fetchRecipe(page) {
  const optionsToFetch = {
    meals: async ({ key, search } = { key: 'name', search: '' }) => {
      const { meals } = await infoFoodRequest({ key, search });
      return meals;
    },
    drinks: async ({ key, search } = { key: 'name', search: '' }) => {
      const { drinks } = await infoDrinkRequest({ key, search });
      return drinks;
    },
  };
  return optionsToFetch[page];
}

export function pageChecker(url) {
  return url.match(/(meals)|(drinks)/);
}

export function pageReferences(actualPage) {
  const itIsMeal = actualPage === 'meals';
  return {
    pageTitle: (itIsMeal) ? 'Meals' : 'Drinks',
    page: (itIsMeal) ? 'meals' : 'drinks',
    id: (itIsMeal) ? 'idMeal' : 'idDrink',
    title: (itIsMeal) ? 'strMeal' : 'strDrink',
    thumb: (itIsMeal) ? 'strMealThumb' : 'strDrinkThumb',
  };
}
