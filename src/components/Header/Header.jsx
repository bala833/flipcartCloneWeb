import React, { useContext, useEffect, useState } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SearchProduct } from "../../services/Product/Product";
import { AuthContext } from "../../context/authContext";
import {logout, logoutUser, authenticateMe} from "../../services/AuthService/AuthService"


const Header = () => {
const { authToken, setAuthToken, isAuthenticated, setIsAuthenticated, redirectToLogin} = useContext(AuthContext);

  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const validateLogin = async () => {
    const response = await authenticateMe();

    if (response.status === 200) {
      setIsAuthenticated(true)
    } else {
      redirectToLogin()
    }
      
  }
  useEffect(() => {
    validateLogin()
  }, [])

    // Fetch suggestions when user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (keyword?.trim()?.length < 2) {
        setSuggestions([]);
        return;
      }

        const response = await SearchProduct(keyword, authToken)
 
        console.log(response, 'asdf')
        setSuggestions(response?.data);
        // console.error("Error fetching suggestions:", error);
      
    };

    // Debounce API calls (wait 300ms after typing)
    const delayDebounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [keyword]);


  const handleSelectSuggestion = (id) => {
    setShowSuggestions(false);
    navigate(`/product/${id}`)

  };

  const login = (id) => {
    navigate(`/login`)

  };
  const handleLogout = async () => {

    const response =  await logoutUser(authToken);
    if (response.status === 200) {
      setAuthToken("");
      setIsAuthenticated(false)
      console.log(response,'logged out successful');
    } else {
      console.log(response, 'some issue')
    }
  };
  const homePage = (id) => {
    navigate(`/`)

  };

  return (
    <header className="flipkart-header">
      <nav className="header-navbar fixed-top">
        <div className="container header-container">
          {/* Logo */}
          <div onClick={() => homePage()} className="header-logo">
            <img src="/logo192.png" alt="Logo" />
            <span className="brand-text">
              MyStore <small>Explore Plus</small>
            </span>
          </div>
          <div className="search-container" style={{ position: "relative" }}>
            {/* Search Bar */}
            <form className="search-bar">
            <input
                    type="text"
                    placeholder="Search for products, brands and more"
                    className="search-input"
                    value={keyword}
                    onChange={(e) => {
                      setKeyword(e.target.value);
                      setShowSuggestions(true);
                    }}
                  />
              <button type="submit" className="search-btn">
                <FaSearch />
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions?.length > 0 && (
              <ul
                className="suggestions-list"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  zIndex: 10,
                }}
              >
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    className="suggestion-item"
                    onClick={() => handleSelectSuggestion(item.id)}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {item.name} <span style={{ color: "#888" }}>({item.brand})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Section */}
          <div className="header-actions">
            {isAuthenticated ? 
            <div onClick={() => handleLogout()} className="nav-login">
              <FaUser className="me-1" /> Logout
            </div>
            :
            <div onClick={() => login()} className="nav-login">
              <FaUser className="me-1" /> Login
            </div>
              }
            <a href="/cart" className="nav-cart">
              <FaShoppingCart className="me-1" /> Cart
            </a>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="header-space"></div>
    </header>
  );
};

export default Header;
