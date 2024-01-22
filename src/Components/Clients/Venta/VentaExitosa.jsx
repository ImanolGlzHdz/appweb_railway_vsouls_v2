import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MenuCliente from '../../Menu/Menu'

import "./VentaExitosa.css";

const VentaExitosa = () => {
  const [resultadoValidacion, setResultadoValidacion] = useState([]);
  const [conteoRegresivo, setConteoRegresivo] = useState(10);
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchVentaExitosaData = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const url = `${import.meta.env.VITE_API}/venta-exit/${userId}`;

      const response = await axios.get(url);
      setResultadoValidacion(response.data[0]);
      console.log(response.data[0]);
    } catch (error) {
      console.error('Error al hacer la llamada a la API:', error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      clickAutomatico();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const temporizador = setInterval(() => {
      setConteoRegresivo(prevConteo => {
        if (prevConteo === 1) {
          clearInterval(temporizador);
          borrarCarroPorUsuario();
          navigate('/');
        }
        return prevConteo - 1;
      });
    }, 1000);

    return () => clearInterval(temporizador);

  }, [navigate]);

  const borrarCarroPorUsuario = () => {
    const userId = sessionStorage.getItem('userId');
    const url = `${import.meta.env.VITE_API}/borrar-carro/${userId}`;

    return axios.delete(url)
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        alert('Carrito borrado');
        return response.data;
      })
      .catch(error => {
        console.error('Error al hacer la llamada a la API:', error);
        throw error;
      });
  };

  const sumaSubtotal = resultadoValidacion.reduce((total, item) => total + item.SUBTOTAL, 0);
  const sumaTotalConDescuento = resultadoValidacion.reduce((total, item) => total + item.TOTAL_CON_DESCUENTO, 0);

  const clickAutomatico = () => {
    if (buttonRef.current && !buttonClicked) {
      buttonRef.current.click();
    }
  };

  const handleButtonClick = async () => {
    setButtonClicked(true);
    try {
      const userId = sessionStorage.getItem('userId');
      const url = `${import.meta.env.VITE_API}/venta-exit/${userId}`;

      const response = await axios.get(url);
      setResultadoValidacion(response.data[0]);
      console.log(response.data[0]);

      // Realizar el cálculo después de que resultadoValidacion se haya actualizado
      const totalConDescuento = response.data[0].reduce((total, item) => total + item.TOTAL_CON_DESCUENTO, 0);
      console.log('Total con descuento:', totalConDescuento);

      await insertarVenta(userId, totalConDescuento);

    } catch (error) {
      console.error('Error al hacer la llamada a la API:', error);
    }
  };

  const insertarVenta = async (userId, total) => {
    try {
      const ID_CLIENTE = sessionStorage.getItem('ID_CLIENTE');
      const userId = sessionStorage.getItem('userId');

      if (ID_CLIENTE === "undefined") {
          const url = `${import.meta.env.VITE_API}/insertar-ventaSnC/${userId}/${total}`;
          const response = await axios.post(url);
          console.log('Respuesta del servidor (insertarVenta):', response.data);
          const getProds = () => {
            fetch(`${import.meta.env.VITE_API}/products`)
            .then(res => res.json())
            
          }
          getProds()
      } else {
          const url = `${import.meta.env.VITE_API}/insertar-venta/${userId}/${total}/${ID_CLIENTE}`;
          const response = await axios.post(url);
          console.log('Respuesta del servidor (insertarVenta):', response.data);
          sessionStorage.removeItem('ID_CLIENTE');
          const getProds = () => {
            fetch(`${import.meta.env.VITE_API}/products`)
            .then(res => res.json())
            
          }
          getProds()
      }

    } catch (error) {
      console.error('Error al hacer la llamada a la API (insertarVenta):', error);
    }
  };

  return (
    <><MenuCliente />
      <div className="venta-exitosa">
        <h1 className="venta-exitosa-titulo">¡Venta Exitosa!</h1>
        <div className="venta-exitosa-detalles">
          <p className="venta-exitosa-detalles-texto">
            <ul>
              {resultadoValidacion.map(item => (
                <li key={item.CLAVEPRODUCTO}>
                  <p>{item.CANTIDAD_CARRO} ud {item.NOMBRE_P}</p>
                </li>
              ))}
              <p>Subtotal: {sumaSubtotal}</p>
              <p>Total: {sumaTotalConDescuento}</p>
              <label style={{ color: 'black' }}>Gracias por su compra</label>
            </ul>
          </p>
        </div>
        <p>Redirigiendo en: {conteoRegresivo} segundos</p>
        <button
          className='botonVerDatosVentaExit'
          ref={buttonRef}
          onClick={handleButtonClick}
          disabled={buttonClicked} // Desactivar el botón si ya ha sido clicado
        >
          Iniciar Venta Exitosa
        </button>
      </div>
    </>
  );
};

export default VentaExitosa;
