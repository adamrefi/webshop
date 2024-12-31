import React, { useState, useEffect } from 'react';
import './App.css';

const Oterm = () => {
  const [sideMenuActive, setSideMenuActive] = useState(false);
  const [products, setProducts] = useState([]); // Termékek állapot
  const [categoryName, setCategoryName] = useState(''); // Kategória név

  const cs = new URLSearchParams(window.location.search).get('cs') || 0; // URL paraméter a csoport lekéréséhez

  // A termékek adatainak lekérése a PHP API-ból
  useEffect(() => {
    fetch(`http://localhost/react2/src/get_products.phpcs=${cs}`)  // API URL
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setProducts(data);
          if (data[0]?.kategoria) {
            setCategoryName(data[0].kategoria); // Beállítjuk a kategória nevét
          }
        }
      })
      .catch(error => {
        console.error("Hiba a termékek lekérésekor:", error);
      });
  }, [cs]); // Ha a 'cs' változik, akkor újra lekérjük az adatokat

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
        <div className="menu-item"><a href="/">Kezdőlap</a></div>
        <div className="menu-item"><a href="/oterm">Termékek</a></div>
        <div className="menu-item"><a href="#">Kapcsolat</a></div>
      </div>

      {/* Hero Section */}
      <section className="hero otterm-hero">
        <h1>{categoryName || "Összes Termékünk"}</h1>
      </section>

      {/* Product List */}
      <main>
        <div className="product-list">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="product-item" key={product.azonosito}>
                <img src={`../admin_webshop/kepek/${product.azonosito}.jpg`} alt={product.nev} />
                <h3>{product.nev}</h3>
                <p>{product.termekleiras}</p>
                <div className="price">{product.akcios_egysegar > 0 ? `${product.akcios_egysegar} Ft` : `${product.ar} Ft`}</div>
              </div>
            ))
          ) : (
            <p>Termékek betöltése folyamatban...</p>
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

export default Oterm;
