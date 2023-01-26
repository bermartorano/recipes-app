import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Profile, Meals, Drinks, Login, FavoritesRecipes, DoneRecipes } from './services/pagesExports'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
       <Switch>
        <Route exact path='/done-recipes' component={ DoneRecipes } />
        <Route exact path='/favorite-recipes' component={ FavoritesRecipes } />
        <Route exact path='/profile' component={ Profile } />
        <Route exact path='/' component={ Login } />
        <Route exact path='/meals' component={ Meals } />
        <Route exact path='/drinks' component={ Drinks } />
        <Route exact path='/drinks/:drinkId' component={ Drinks } />
        <Route exact path='/meals/:mealId' component={ Meals } />
        <Route exact path='/drinks/:drinkId/in-progress' component={ Drinks } />
        <Route exact path='/meals/:mealId/in-progress' component={ Meals } />
        <Route component={ NotFound } />
      </ Switch>
    </BrowserRouter>
  );
}

// import rockGlass from './images/rockGlass.svg';
{/* <span className="logo">TRYBE</span>
<object
  className="rocksGlass"
  type="image/svg+xml"
  data={ rockGlass }
>
  Glass
</object> */}

export default App;
