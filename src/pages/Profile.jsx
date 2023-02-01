import React from 'react';
import { useHistory } from 'react-router-dom';
import { Footer, Header } from '../services/componentsExport';

function Profile() {
  const email = localStorage.getItem('user') ? JSON
    .parse(localStorage.getItem('user')).email : '';
  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <>
      <Header title="Profile" hasSearchIcon={ false } />
      <div>
        <p data-testid="profile-email">{email}</p>
        <button
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button data-testid="profile-logout-btn" onClick={ handleLogout }>
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}
export default Profile;
