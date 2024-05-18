import React from 'react';
import spin from '../../assets/spin.svg'

const Spinner = () => {
  return (
    <div className="flex justify-center mt-16">
      <span className="flex items-center text-4xl">
        <img src={spin} alt="Spinner" className="animate-spin h-10 w-10 mr-4" />
        Chargement...
      </span>
    </div>
  );
};

export default Spinner;
