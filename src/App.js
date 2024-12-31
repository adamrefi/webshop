// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

const Home = () => {
  const [sideMenuActive, setSideMenuActive] = useState(false);

  const toggleSideMenu = () => {
    setSideMenuActive(!sideMenuActive);
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="nav-toggle" onClick={toggleSideMenu}>
          &#9776; {/* Hamburger icon */}
        </div>
        <div className="logo">Adali Clothing</div>
      </header>

      {/* Side Menu */}
      <div className={`side-menu ${sideMenuActive ? 'active' : ''}`}>
        <div className="close-btn" onClick={toggleSideMenu}>&times;</div>
        <div className="menu-item"><Link to="/">Kezdőlap</Link></div>
        <div className="menu-item"><Link to="/oterm">Termékek</Link></div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <h1>Üdvözlünk az Adali Clothing Webáruházban</h1>
        <p>Fedezd fel legújabb kollekciónkat!</p>
        <Link to="/oterm" className="cta-button">Nézd meg az összes terméket</Link>
      </section>
    </div>
  );
};

const Oterm = () => {
  const [sideMenuActive, setSideMenuActive] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // A termékek adatainak lekérése a fetch API-val
  useEffect(() => {
    fetch(`http://localhost/react2/src/get_products.php?cs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP hiba! Státusz: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hiba a termékek lekérésekor:", error.message);
        setLoading(false);
      });
  }, []);

  const toggleSideMenu = () => {
    setSideMenuActive(!sideMenuActive);
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="nav-toggle" onClick={toggleSideMenu}>
          &#9776; {/* Hamburger icon */}
        </div>
        <div className="logo">Adali Clothing</div>
      </header>

      {/* Side Menu */}
      <div className={`side-menu ${sideMenuActive ? 'active' : ''}`}>
        <div className="close-btn" onClick={toggleSideMenu}>&times;</div>
        <div className="menu-item"><Link to="/">Kezdőlap</Link></div>
        <div className="menu-item"><Link to="/oterm">Termékek</Link></div>
      </div>

      {/* Hero Section */}
      <section className="hero otterm-hero">
        <h1>Összes Termékünk</h1>
      </section>

      {/* Product List */}
      <main>
        <div className="product-list">
          {loading ? (
            <p>Termékek betöltése folyamatban...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div className="product-item" key={product.azonosito}>
                <h3>{product.nev}</h3>
                <p>{product.termekleiras}</p>
                <div className="price">{product.ar} Ft</div>
              </div>
            ))
          ) : (
            <p>Nincsenek elérhető termékek.</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Adali Clothing - Minden jog fenntartva.</p>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Kezdőlap */}
        <Route path="/oterm" element={<Oterm />} /> {/* Összes Termék */}
      </Routes>
    </Router>
  );
};

export default App;

