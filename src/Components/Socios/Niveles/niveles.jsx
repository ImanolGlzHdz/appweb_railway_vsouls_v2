import React, { useEffect, useState } from 'react';
import './niveles.css';
import HeaderMenu from './headernivel/header';
import Menu, { idUsuarioGlobal } from '../Menu/menusocios';

const Nivelessocio = () => {
  const [Niveles, setNiveles] = useState([]);
  const [Nivelesn, setNivelesn] = useState([]);

  useEffect(() => {
    // Realiza la primera llamada a la API para obtener todos los niveles
    fetch(`${import.meta.env.VITE_API}/niveles`)
      .then((respuesta) => respuesta.json())
      .then((data) => setNiveles(data[0]))
      .catch((error) => console.error('Error al obtener niveles:', error));

    // Verifica si idUsuarioGlobal existe antes de hacer la llamada a la segunda API
    const cargarNivelesSocio = async () => {
      try {
        if (idUsuarioGlobal) {
          const respuesta = await fetch(`${import.meta.env.VITE_API}/niveles/socio/${idUsuarioGlobal}`);
          const data = await respuesta.json();

          // Verificar si la respuesta contiene datos de niveles del socio
          if (data && data[0]) {
            setNivelesn(data[0]);
          } else {
            console.error('No se encontraron datos de niveles del socio.');
          }
        }
      } catch (error) {
        console.error('Error al obtener niveles del socio:', error);
      }
    };

    // Llama a cargarNivelesSocio una vez al inicializar el componente
    cargarNivelesSocio();

  }, [idUsuarioGlobal]); // Se ejecutará solo al cambiar idUsuarioGlobal

  const colores = ['developer', 'designer', 'editor'];

  return (
    <div>
      <div className="alert alert-primary sizefont2 text-center" role="alert">
        Tu nivel actual es el {Nivelesn.ID_NIVEL}
      </div>

      <HeaderMenu />

      <div className="card-list">
        {Niveles.map((est, index) => (
          <a key={est.id_nivel} href="#" className={`card-item ${colores[index % colores.length]}`}>
            <h1>{index + 1}</h1>
            <span className={colores[index % colores.length]}>{est.nombre_nivel}</span>
            <h3>Puntos por producto {est.comisionpuntos}</h3>
            <div className={colores[index % colores.length]}>
              <h4>compras de {est.limite_inferior} a {est.limite_superior} productos al mes</h4>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Nivelessocio;
