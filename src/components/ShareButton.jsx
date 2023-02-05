import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton({ url, index }) {
  const [itIsCopied, setItIsCopied] = useState(false);
  const copy = clipboardCopy;

  const handleClicl = () => {
    copy(url);
    setItIsCopied(!itIsCopied);
  };

  // Link copied!
  return (
    <button
      type="button"
      data-testid="share-btn"
      onClick={ handleClicl }
    >
      { itIsCopied && <p>Link copied!</p>}
      <img
        src={ shareIcon }
        alt="Button to share"
        data-testid={ `${index}-horizontal-share-btn` }
      />
    </button>
  );
}

ShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  index: PropTypes.number,
};

ShareButton.defaultProps = {
  index: 0,
};
