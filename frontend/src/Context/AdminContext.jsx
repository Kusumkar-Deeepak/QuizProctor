// src/context/AdminContext.jsx
import { createContext, useState, useContext } from 'react';

// Create the Admin context
const AdminContext = createContext();

// AdminProvider to manage state globally
// eslint-disable-next-line react/prop-types
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  const updateAdmin = (newAdmin) => {
    setAdmin(newAdmin);
  };

  return (
    <AdminContext.Provider value={{ admin, updateAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to use the AdminContext
export const useAdminContext = () => useContext(AdminContext);
