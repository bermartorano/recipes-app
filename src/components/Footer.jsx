import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/drinks">
        <img
          src="../images/drinkIcon.svg"
          alt="Drink icon"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/meals">
        <img
          src="../images/mealIcon.svg"
          alt="Meals icon"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
