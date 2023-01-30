import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RecepiesContext } from '../context/RecepiesProvider';
import RecepiCard from './RecipeCard';
import { infoFoodRequest } from '../services/foodAPI';
import { infoDrinkRequest } from '../services/drinkAPI';

function Recipes(props) {
  const { pageSubject } = props;
  const { recepies, setRecepies } = useContext(RecepiesContext);
  const recepiesKeyText = `${pageSubject.toLowerCase()}s`;
  const { [recepiesKeyText]: recepiesKey } = recepies;
  const maxRecipesToRender = 12;
  const recipesToRender = recepiesKey.slice(0, maxRecipesToRender);

  useEffect(() => {
    const inicalRecipes = async () => {
      switch (pageSubject) {
      case 'Meal': {
        const inicialMealsFetched = await infoFoodRequest({ key: 'name', search: '' });
        setRecepies(inicialMealsFetched);
        break;
      }

      case 'Drink': {
        const inicialDrinksFetched = await infoDrinkRequest({ key: 'name', search: '' });
        setRecepies(inicialDrinksFetched);
      }
        break;
      default:
      }
    };
    inicalRecipes();
  }, []);

  return (
    <div>
      {recipesToRender.map((rec, index) => (
        <RecepiCard
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
