import React, { useState, useEffect } from 'react';
import './soxios.css';

var idUsuarioGlobal = sessionStorage.getItem('socioid');

const Socios = () => {
  const [sociosData, setSociosData] = useState([]);

  const cargarsocios = async () => {
    if (idUsuarioGlobal) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/usuario/subsocio/${idUsuarioGlobal}`);
        const data = await response.json();

        if (data && data[0] && data[0].length > 0) {
          setSociosData(data[0]);
        } else {
          // console.error('No se encontraron datos de socios.');
        }
      } catch (error) {
        // console.error('Error al obtener datos de socios:', error);
      }
    }
  };

  useEffect(() => {
    // Carga los socios al inicializar el componente
    cargarsocios();
  }, []); // El segundo argumento [] indica que este efecto se ejecuta solo al montar el componente

  return (
    <div className='divgrande'>
      <h1 className="heading-1-1">MIS SOCIOS</h1>
      <table className="table listlist table-danger table-hover">
        <thead>
          <tr>
            <th style={{ width: '33%' }}>ID Usuario</th>
            <th>Nombre</th>
            <th>Nivel</th>
          </tr>
        </thead>
        <tbody>
          {sociosData.map(socio => (
            <tr key={socio.ID_SOCIO_PK}>
              <td>{socio.ID_SOCIO_PK}</td>
              <td>{socio.NOMBRE}</td>
              <td>{socio.ID_NIVEL}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h5>Mi codigo de invitación es: {idUsuarioGlobal}</h5>
      <h5>Cada socio nuevo son 1,000 monedas a tu cuenta para que puedas usarlas en futuras compras!</h5>
    </div>
  );
};

export default Socios;
