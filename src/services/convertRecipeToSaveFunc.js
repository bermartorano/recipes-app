const convertRecipeInfo = (recipe, mealOrDrink) => {
  switch (mealOrDrink) {
  case 'Meal': {
    const recipeToSave = {
      id: recipe.idMeal,
      type: 'meal',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: new Date(),
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
    };
    return recipeToSave;
  }

  case 'Drink': {
    const recipeToSave = {
      id: recipe.idDrink,
      type: 'drink',
      nationality: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      doneDate: new Date(),
      tags: recipe.strTags ? recipe.strTags : [],
    };
    return recipeToSave;
  }

  default:
    break;
  }
};

export default convertRecipeInfo;
