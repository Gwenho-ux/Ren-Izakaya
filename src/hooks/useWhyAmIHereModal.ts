import { useState } from 'react';

export const useWhyAmIHereModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    console.log('Opening Why Am I Here modal');
    setIsOpen(true);
  };
  
  const closeModal = () => {
    console.log('Closing modal');
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
  };
}; 