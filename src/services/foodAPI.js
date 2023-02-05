function urlFoodConstructor({ key, search }) {
  const baseUrl = 'https://www.themealdb.com/api/json/v1/1/';

  const urlConstructor = {
    name: `${baseUrl}search.php?s=${search}`,
    recipeId: `${baseUrl}lookup.php?i=${search}`,
    ingredient: `${baseUrl}filter.php?i=${search}`,
    firstLetter: `${baseUrl}search.php?f=${search}`,
    categories: `${baseUrl}list.php?c=list`,
    categoryFilter: `${baseUrl}filter.php?c=${search}`,
  };

  return urlConstructor[key];
}

export async function infoFoodRequest({ key, search } = { key: 'name', search: '' }) {
  try {
    const data = await fetch(urlFoodConstructor({ key, search }));
    const results = await data.json();
    return results;
  } catch (error) {
    return error;
  }
}
