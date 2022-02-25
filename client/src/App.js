import "./App.css";
import React from "react";
import Profile from "./pages/Profile.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export default function App() {



  return (
<Router>
      <div className="bg-image">
         <Routes>
          <Route exact path="/" element={<Login />}>
          </Route>          
          <Route path="/signup" element={<Signup />}>
          </Route>
          <Route path="/profile" element={<Profile />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
