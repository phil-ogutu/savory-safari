import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import UIProvider from "./contexts/UIContext";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <AuthProvider>
      <UIProvider>
        <div className="min-h-screen bg-gray-50 text-black">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <AppRoutes />
        </div>
      </UIProvider>
    </AuthProvider>
  );
};

export default App;
