"use client";
import React from 'react';
import PropTypes from 'prop-types';

const GoldenButton = ({ onClick, redirectTo, label = "Submit" }) => {
  
  const handleClick = async () => {
    if (onClick) {
      // If an action is provided, execute it
      await onClick();
    }

    if (redirectTo) {
      // If a redirect URL is provided, navigate to it using window.location
      window.location.href = redirectTo;
    }
  };

  return (
    <div className="text-center">
      <button type="submit" className="button-primary backprim" onClick={handleClick}>
        {label}
      </button>
    </div>
  );
};

GoldenButton.propTypes = {
  onClick: PropTypes.func,  // Action to execute when button is clicked
  redirectTo: PropTypes.string,  // URL to redirect to after clicking the button
  label: PropTypes.string,  // Button text
};

export default GoldenButton;
