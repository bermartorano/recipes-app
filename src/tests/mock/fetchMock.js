import { DRINKS, FILTERED_BY_NAME_DRINKS, FILTERED_BY_LETTER_DRINKS,
  FILTERED_BY_INGREDIENT_DRINKS, ALL_CATEGORIES_DRINKS } from './mockDrinkAPI';

import { FILTERED_BY_INGREDIENT_FOODS, FILTERED_BY_LETTER_FOODS,
  FILTERED_BY_NAME_FOODS, ALL_CATEGORIES_FOODS, FOODS } from './mockFoodAPI';

function urlChecker(url) {
  const defaultUrl = {
    drink: 'https://www.thecocktaildb.com/api/json/v1/1/',
    food: 'https://www.themealdb.com/api/json/v1/1/',
  };

  switch (true) {
  case url === `${defaultUrl.drink}search.php?s=`:
    return DRINKS;
  case url === `${defaultUrl.food}search.php?s=`:
    return FOODS;

  case url === `${defaultUrl.drink}list.php?c=list`:
    return ALL_CATEGORIES_DRINKS;
  case url === `${defaultUrl.food}list.php?c=list`:
    return ALL_CATEGORIES_FOODS;

  case url.starsWith(`${defaultUrl.drink}search.php?s=`):
    return FILTERED_BY_NAME_DRINKS;
  case url.starsWith(`${defaultUrl.drink}search.php?f=`):
    return FILTERED_BY_LETTER_DRINKS;
  case url.starsWith(`${defaultUrl.drink}filter.php?i=`):
    return FILTERED_BY_INGREDIENT_DRINKS;

  case url.starsWith(`${defaultUrl.food}search.php?s=`):
    return FILTERED_BY_NAME_FOODS;
  case url.starsWith(`${defaultUrl.food}search.php?f=`):
    return FILTERED_BY_LETTER_FOODS;
  case url.starsWith(`${defaultUrl.food}filter.php?i=`):
    return FILTERED_BY_INGREDIENT_FOODS;

  default:
    return { error: 'invalid URL ' };
  }
}

export function fetchMock(url) {
  const returnInfo = urlChecker(url);
  return (returnInfo.error)
    ? Promise.reject(new Error(returnInfo))
    : Promise.resolve({ json: () => Promise.resolve(returnInfo) });
}
