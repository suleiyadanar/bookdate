import React from "react";
import Header from "./Header";
import BookCards from "./BookCards";
import SwipeButtons from "./SwipeButtons";
import Auth from "./Auth";
import Books from "./Books";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import AuthModal from "./AuthModal";

function App() {

  return (


       <Router>

          <Routes>
          <Route path="/" element={<Auth/>}/>
          <Route path="/shelf" element={<Books/>}/>
          <Route path="/swipe" element={<BookCards/>}/>
          </Routes>
      </Router>

  );
}

export default App;

      // {/* Book Cards */}
      // {/* Buttons below book cards */}
      // {/* Book shelf */}
      // {/* Book summary */}
      // {/* Header */}
