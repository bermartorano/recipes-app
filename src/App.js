import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Profile, Meals, Drinks, Login,
  FavoritesRecipes, DoneRecipes, NotFound,
  RecipeInProgress, RecipeDetails } from './services/pagesExports';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoritesRecipes } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route exact path="/meals/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default App;
