import React, { createContext, useContext, useState } from "react";

const UIContext = createContext();

const UIProvider = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <UIContext.Provider
      value={{ isModalOpen, openModal, closeModal, showToast, toastMessage }}
    >
      {children}
    </UIContext.Provider>
  );
};

export default UIProvider;

export const useUI = () => useContext(UIContext);
