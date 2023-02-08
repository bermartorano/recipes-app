import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function DetailsButton() {
  const history = useHistory();
  const [text, setText] = useState('Start Recipe');
  const [show, setShow] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    const id = location.pathname.split('/').pop();

    if (doneRecipes.includes(id)) {
      setShow(false);
    } else if (inProgressRecipes.includes(id)) {
      setText('Continue Recipe');
    }
  }, [location]);

  const handleClick = () => {
    const id = location.pathname.split('/').pop();
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    inProgressRecipes.push(id);
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    let path = location.pathname;
    path = path.includes('/drinks/') ? '/drinks/' : '/meals/';
    history.push(`${path}${id}/in-progress`);
  };

  return show ? (
    <button
      style={ { position: 'fixed', bottom: 0 } }
      className="start-recipe-btn"
      data-testid="start-recipe-btn"
      onClick={ handleClick }
    >
      {text}
    </button>
  ) : null;
}

export default DetailsButton;
