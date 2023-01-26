import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../Footer.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/drinks">
        <object
          title="Drink"
          src={ drinkIcon }
          type="image/svg+xml"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/meals">
        <object
          title="Meal"
          src={ mealIcon }
          type="image/svg+xml"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
