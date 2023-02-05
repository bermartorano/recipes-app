import React from 'react';
import Recipes from '../components/Recipes';
import { Footer, Header } from '../services/componentsExport';

function Drinks() {
  return (
    <>
      <Header title="Drinks" hasSearchIcon />
      <Recipes pageSubject="drinks" />
      <Footer />
    </>
  );
}

export default Drinks;
