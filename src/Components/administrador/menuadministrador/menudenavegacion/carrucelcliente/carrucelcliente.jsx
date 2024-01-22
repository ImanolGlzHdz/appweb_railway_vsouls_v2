import React, { useEffect } from 'react';
import '../../menuadmin.css'
import { Link } from 'react-router-dom';
import Lidemenus from '../../menuadministrador'
import menu from '../img/menu.png'
import cerrar from '../img/cerrar.png'


function Navbar() {
 
  useEffect(() => {
    const header = document.querySelector("header");
    const hamburgerBtn = document.querySelector("#hamburger-btn");
    const closeMenuBtn = document.querySelector("#close-menu-btn");

    // Toggle mobile menu on hamburger button click
    const handleHamburgerClick = () => header.classList.toggle("show-mobile-menu");
    hamburgerBtn.addEventListener("click", handleHamburgerClick);

    // Close mobile menu on close button click
    const handleCloseMenuClick = () => handleHamburgerClick();
    closeMenuBtn.addEventListener("click", handleCloseMenuClick);

    return () => {
      // Cleanup event listeners when the component unmounts
      hamburgerBtn.removeEventListener("click", handleHamburgerClick);
      closeMenuBtn.removeEventListener("click", handleCloseMenuClick);
    };
  }, []);

  return (
    <>
      <div className="todomenuadmi bodyadmi moveratras">
        <header className="headeradmi moveratras">
        <nav className="navbar moveratras">
        <span id="hamburger-btn" className="spanadmi material-symbols-outlined">Menu</span>
            <ul className="menu-links">
              <Lidemenus/>
              <div className="d-flex justify-content-between align-items-center">
               <span id="close-menu-btn2" className="spanadmi material-symbols-outlined">
               <h2 className="spanadmi color">Menu</h2>
                </span> 
                <span id="close-menu-btn" className="spanadmi material-symbols-outlined">
                  
                  <img width="30" height="30" src={cerrar} alt="" />
                </span>
              </div>
            </ul>

            <div className='menudepublidad moveratras activonuevo'>

<Link to='/admin/carrucel' class='amenu activonuevo moveratras'>Agregar </Link>
       <Link to='/admin/carrucel/lista' class='amenu activonuevo moveratras'> Registros</Link>

</div>
            <a className="amenu logo">
              <h3>Vsouls</h3>
            </a>
          </nav>
        </header>

      </div>
    </>
  );
}

export default Navbar;
