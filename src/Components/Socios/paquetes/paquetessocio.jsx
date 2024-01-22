import React, { useEffect, useState } from 'react';
import Tarjetaspaquetes from './listapaquetes';
import Modalpaquetes from './modalpaquetes';
// import Menu, { idUsuarioGlobal } from '../Menu/menusocios';

const Tarjetas = () => {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [carritoProductos, setCarritoProductos] = useState([]);
  const [totalprod, setTotalProd] = useState(0);

  // Define cargarProductos
  const cargarProductos = async () => {
    try {
      const respuesta = await fetch(`${import.meta.env.VITE_API}/productos`);
      const data = await respuesta.json();
      const productos = Array.isArray(data) ? data : [];
      setProductos(productos);
    } catch (error) {
      // console.error('Error al obtener productos:', error);
    }
  };

  // Define cargarTotales
  const cargarTotales = () => {
    // Implementa la lógica para cargar totales
  };

  const agregarpaquetesalcarrito = async (idProducto) => {
      var idUsuarioGlobal= sessionStorage.getItem('socioid');
      // alert(idUsuarioGlobal)
    try {
      
      const response = await fetch(`${import.meta.env.VITE_API}/carrito/paquetes/${idUsuarioGlobal}/${idProducto}`, {
        method: 'POST',
      });
      // alert(`${import.meta.env.VITE_API}/carrito/paquetes/${idUsuarioGlobal}/${idProducto}`)
      const carritoResponse = await fetch(`${import.meta.env.VITE_API}/carrito/${idUsuarioGlobal}`);
      const carritoData = await carritoResponse.json();

      setCarritoProductos(carritoData[0]);
    } catch (error) {
      // console.error('Error al agregar producto al carrito:', error);
    }

    setShowModal(true);  // Cambiado de handleShowModal a setShowModal
  };

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    cargarProductos();
    cargarTotales();  // Asegúrate de definir esta función
  }, []);

  return (
    <div>
      <Tarjetaspaquetes productos={productos} agregarpaquetesalcarrito={agregarpaquetesalcarrito} />
      <Modalpaquetes showModal={showModal} handleCloseModal={handleCloseModal} carritoProductos={carritoProductos} />
    </div>
  );
};

export default Tarjetas;
