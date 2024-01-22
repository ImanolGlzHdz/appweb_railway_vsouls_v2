import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuCliente from '../../Menu/Menu'

import "./VentaRechazada.css";

const VentaPendiente = () => {
  const [conteoRegresivo, setConteoRegresivo] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const temporizador = setInterval(() => {
      setConteoRegresivo(prevConteo => {
        if (prevConteo === 1) {
          clearInterval(temporizador);

          navigate('/');
        }
        return prevConteo - 1;
      });
    }, 1000);

    return () => clearInterval(temporizador);
  }, [navigate]);

  return (
    <>
      <MenuCliente />
      <div className="venta-fallida">
        <h1 class="rejected-sale">Venta Rechazada/Pendiente</h1>
        <p>Verifique su forma de pago e intente nuevamente</p>
        <p>Solo se admiten pagos con Tarjeta y con cuenta Mercado Pago</p>
        <p>Redirigiendo en: {conteoRegresivo} segundos</p>
      </div>
    </>
  );
};

export default VentaPendiente;
