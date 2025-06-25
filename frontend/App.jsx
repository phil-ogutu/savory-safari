import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import UIProvider from "./contexts/UIContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <AuthProvider>
      <UIProvider>
        <div className="min-h-screen bg-gray-50 text-black">
          <AppRoutes />
        </div>
      </UIProvider>
    </AuthProvider>
  );
};

export default App;
