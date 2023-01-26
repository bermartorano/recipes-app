function urlDrinkConstructor({ key, search } = { key: 'name', search: '' }) {
  const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

  const urlConstructor = {
    name: `${baseUrl}search.php?s=${search}`,
    firstLetter: `${baseUrl}search.php?f=${search}`,
    ingredient: `${baseUrl}filter.php?i=${search}`,
    categories: `${baseUrl}list.php?c=list`,
  };

  return urlConstructor[key];
}

export async function infoDrinkRequest({ key, search }) {
  try {
    const data = await fetch(urlDrinkConstructor({ key, search }));
    const results = await data.json();
    return results;
  } catch (error) {
    return error;
  }
}

export function drinkUrlImg(ingredient) {
  return `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`;
}
