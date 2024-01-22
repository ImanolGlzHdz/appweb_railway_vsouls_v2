import React, { useEffect, useState } from 'react';
import Tarjetasq from './tarjetas';
import Tarjetasp from './tarjetasprimeravez';
import ModalComponent from './modal';
import Menu, { idUsuarioGlobal } from '../../Menu/menusocios';


const Tarjetas = () => {
  const [showModal, setShowModal] = useState(false);
  const [carritoProductos, setCarritoProductos] = useState([]);

  const agregarProductoAlCarrito = async (CLAVE_P) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/carrito/productos/${idUsuarioGlobal}/${CLAVE_P}`, {
        method: 'POST',
      });

      const carritoResponse = await fetch(`${import.meta.env.VITE_API}/carrito/${idUsuarioGlobal}`);
      const carritoData = await carritoResponse.json();

      setCarritoProductos(carritoData[0]);
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }

    setShowModal(true);
  };

  const agregarProductoAlCarritopv = async (idProducto) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/primeravez/nuevo/${idUsuarioGlobal}/${idProducto}`, {
        method: 'POST',
      });

      const carritoResponse = await fetch(`${import.meta.env.VITE_API}/carrito/${idUsuarioGlobal}`);
      const carritoData = await carritoResponse.json();

      setCarritoProductos(carritoData[0]);
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }

    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <Tarjetasq agregarProductoAlCarrito={agregarProductoAlCarrito} />
      <Tarjetasp agregarProductoAlCarritopv={agregarProductoAlCarritopv} />
      
      <ModalComponent showModal={showModal} handleCloseModal={handleCloseModal} carritoProductos={carritoProductos} />
    </div>
  );
};

export default Tarjetas;
