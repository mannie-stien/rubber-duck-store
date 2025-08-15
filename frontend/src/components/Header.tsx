import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="main-header">
      <nav className="main-nav">
        <a href="#almacen" className="nav-tab active">Almacen</a>
        <a href="#tienda" className="nav-tab">Tienda</a>
      </nav>
      <div className="sub-nav">
        <span className="sub-nav-item active">Warehouse</span>
        <span className="sub-nav-item active">Store</span>
      </div>
    </header>
  );
};

export default Header;