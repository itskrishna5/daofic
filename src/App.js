import Routes from "./routes/routes";
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';

import { AuthProvider } from "./context/authcontext";

export default function App() {

  return (
    <>
    
    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>

    </>
  );
}