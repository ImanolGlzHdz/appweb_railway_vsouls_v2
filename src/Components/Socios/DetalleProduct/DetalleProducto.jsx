import React, { useState } from 'react'
import TarjetaDEtalleproducto from './Tarjetadetalleproducto'
import Modaldetalleproducto from './modaldetalleproducto'
import Menu, { idUsuarioGlobal } from '../Menu/menusocios';

const DetalleProducto = () => {
  const [showModal, setShowModal] = useState(false);
  const [carritoProductos, setCarritoProductos] = useState([]);

  const agregarProductoAlCarrito = async (CLAVE_P) => {
    try {
      // alert(idUsuarioGlobal)
      const response = await fetch(`https://apivsoulsapi8-production.up.railway.app/carrito/productos/${idUsuarioGlobal}/${CLAVE_P}`, {
        method: 'POST',
      });

      const carritoResponse = await fetch(`https://apivsoulsapi8-production.up.railway.app/carrito/${idUsuarioGlobal}`);
      const carritoData = await carritoResponse.json();

      setCarritoProductos(carritoData[0]);
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }

    setShowModal(true);  // Cambiado de handleShowModal a setShowModal
  };
  const handleCloseModal = () => setShowModal(false);
  return (
    <div>
        <TarjetaDEtalleproducto agregarProductoAlCarrito={agregarProductoAlCarrito}/>
        <Modaldetalleproducto showModal={showModal} handleCloseModal={handleCloseModal} carritoProductos={carritoProductos}/>
    </div>
  )
}

export default DetalleProducto