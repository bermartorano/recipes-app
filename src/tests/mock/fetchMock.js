import { DRINKS, FILTERED_BY_NAME_DRINKS, FILTERED_BY_LETTER_DRINKS,
  FILTERED_BY_INGREDIENT_DRINKS, INGREDIENTS_DRINKS_IDS,
  ALL_CATEGORIES_DRINKS, FILTERED_BY_CATEGORY_DRINKS } from './mockDrinkAPI';

import { FILTERED_BY_INGREDIENT_FOODS, FILTERED_BY_LETTER_FOODS,
  FILTERED_BY_NAME_FOODS, INGREDIENTS_FOODS_IDS,
  ALL_CATEGORIES_FOODS, FOODS, FILTERED_BY_CATEGORY_FOODS } from './mockFoodAPI';

function verifyKey(defaultUrl, receivedUrl, checkerObject) {
  const key = Object.keys(checkerObject)
    .find((keyNumber) => `${defaultUrl}${keyNumber}` === receivedUrl);
  console.log(key);
  return INGREDIENTS_DRINKS_IDS[key];
}

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

  case url.startsWith(`${defaultUrl.drink}lookup.php?i=`):
    return verifyKey(`${defaultUrl.drink}lookup.php?i=`, url, INGREDIENTS_DRINKS_IDS);
  case url.startsWith(`${defaultUrl.food}lookup.php?i=`):
    return verifyKey(`${defaultUrl.food}lookup.php?i=`, url, INGREDIENTS_FOODS_IDS);

  case url.startsWith(`${defaultUrl.drink}filter.php?i=`):
    return FILTERED_BY_INGREDIENT_DRINKS;
  case url.startsWith(`${defaultUrl.food}filter.php?i=`):
    return FILTERED_BY_INGREDIENT_FOODS;

  case url.startsWith(`${defaultUrl.drink}search.php?s=`):
    return FILTERED_BY_NAME_DRINKS;
  case url.startsWith(`${defaultUrl.food}search.php?s=`):
    return FILTERED_BY_NAME_FOODS;

  case url.startsWith(`${defaultUrl.food}search.php?f=`):
    return FILTERED_BY_LETTER_FOODS;
  case url.startsWith(`${defaultUrl.drink}search.php?f=`):
    return FILTERED_BY_LETTER_DRINKS;

  case url.startsWith(`${defaultUrl.food}filter.php?c=`):
    return FILTERED_BY_CATEGORY_FOODS;
  case url.startsWith(`${defaultUrl.drink}filter.php?c=`):
    return FILTERED_BY_CATEGORY_DRINKS;

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
