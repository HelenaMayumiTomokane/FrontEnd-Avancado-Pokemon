import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/LoginPage";
import RegisterUser from "./pages/RegisterUser/RegisterUser";
import NotFound from "./pages/NotFound/NotFound";
import UserPage from "./pages/UserPage/UserPage";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/user_page" element={<UserPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
