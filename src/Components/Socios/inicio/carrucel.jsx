import React, { useEffect, useState } from 'react';
// import './carousel.css';

const Carousel = () => {
  const [Publicidad, setPublicidad] = useState([]);

  useEffect(() => {
    // Realiza la petición GET
    fetch(`${import.meta.env.VITE_API}/publicidad/get`)
      .then((respuesta) => respuesta.json()) // Convierte la respuesta en formato JSON
      .then((data) => setPublicidad(data)) // Actualiza el estado Publicidad con los datos obtenidos
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
  {Publicidad.map((publi, index) => (
  <div key={publi} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
  <img  className="d-block sicecarrucel w-100" src={`${import.meta.env.VITE_API}/publicidad/` + publi} alt="" />
</div>

))}

  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  );
};

export default Carousel;
