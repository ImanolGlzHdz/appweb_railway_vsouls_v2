import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

var idUsuarioGlobal = sessionStorage.getItem('socioid');

const Ventafallida = () => {
const navigate = useNavigate()
  useEffect(() => {
    // Definir la función para realizar la petición GET
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/venta/fallida/socios/${idUsuarioGlobal}`);
        // Manejar la respuesta aquí (puedes procesarla, almacenarla en el estado, etc.)
        const data = await response.json();
        console.log(data); // Puedes ajustar esto según tus necesidades
      } catch (error) {
        console.error('Error al realizar la petición:', error);
      }
    };

    // Llamar a la función al inicializar el componente
    fetchData();

    navigate('/socios/inicio')
  }, []); // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente

  return (
    <div>ventafallida</div>
  );
};

export default Ventafallida;
