import AppRoutes from "./routes/AppRoutes";
import ThemeCustomization from './themes';
import React from "react";

function App() {
  return (
    <ThemeCustomization>
      <AppRoutes/>
    </ThemeCustomization>
  );
}

export default App;
