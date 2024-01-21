import React, { useState, useEffect } from 'react';
import './stylesfav.css';
import { FaTrashAlt, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Menu, { idUsuarioGlobal } from '../Menu/menusocios';
export var verifcadetallf =''; 
export var producft={};


const Favoritos = () => {
  const navigate = useNavigate();
  const [fav, setFav] = useState([]);
  var idUsuarioGlobal = sessionStorage.getItem('socioid');
  
    const getProds = () => {
      fetch(`https://apivsoulsapi8-production.up.railway.app/favoritos/cli/${idUsuarioGlobal}`)
        .then((res) => res.json())
        .then((res) => setFav(res));
    };

  useEffect(() => {
    getProds();
  }, []);

  const handleDelete = (prod) => {
    const CLAVE_P = prod.CLAVE_P;
    const deleteFav = { CLAVE_P: CLAVE_P, ID_USUARIO: idUsuarioGlobal };
  
    const requestInit = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deleteFav),
    };
  
    fetch('https://apivsoulsapi8-production.up.railway.app/delete/fav/socios', requestInit)
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        // Actualiza la lista después de eliminar el producto
        getProds();
      });
  };
  

  const seleccionarProducto = (prod) => {
    producft = prod;
    verifcadetallf=2
    // Considera usar el hook useHistory en lugar de useNavigate
    navigate('/socios/detalleproduct');
  };

  return (
    <>
      <div className='contFav'>
        <h2 className='titleFav'>MI LISTA DE FAVORITOS</h2>
        <div className='wrapperFavoritos'>
          {fav.map((prod) => (
            <div className='cardFav' key={prod.CLAVE_P}>
              <div className='caracter'>
                <img
                  src={`https://apivsoulsapi8-production.up.railway.app/products/${prod.CLAVE_P}-IMG_PRINCIPAL.png`}
                  alt=''
                />
                <div className='nameProducto'>
                  <h4>{prod.NOMBRE_P}</h4>
                </div>
                <div className='priceProducto'>
                  <h5>${prod.PRECIO_P} MXN</h5>
                </div>
              </div>
              <div className='linkF'>
                <span onClick={() => handleDelete(prod)}>
                  <FaTrashAlt />
                </span>
                <span onClick={() => seleccionarProducto(prod)}>
                  <FaEye />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Favoritos;
