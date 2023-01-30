import React from 'react';
import Recipes from '../components/Recipes';
import { Footer, Header } from '../services/componentsExport';

function Meals() {
  return (
    <>
      <Header title="Meals" hasSearchIcon />
      <Recipes pageSubject="Meal" />
      <Footer />
    </>
  );
}

export default Meals;
