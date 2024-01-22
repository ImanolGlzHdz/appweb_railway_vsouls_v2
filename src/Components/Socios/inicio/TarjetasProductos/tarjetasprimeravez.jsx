import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style_socios.css';
import { FaHeart, FaStar } from 'react-icons/fa';
import imagen1 from './img/imagen1.png';
import Menu, { idUsuarioGlobal } from '../../Menu/menusocios';

const Tarjetasq = ({ agregarProductoAlCarritopv }) => {
  const [productosA, setProductosA] = useState([]);

 
  useEffect(() => {
    // alert(idUsuarioGlobal);
  
    const delayedExecution = setTimeout(() => {
      const getProds = () => {
        // console.log('Fetching data...');
        fetch(`${import.meta.env.VITE_API}/primeravez/prod/${idUsuarioGlobal}`)
          .then(res => res.json())
          .then(res => {
            // console.log('Data received:', res);
            // Verifica si la primera posición es un array
            if (Array.isArray(res[0])) {
              setProductosA(res[0]);
            } else {
              console.error('Data structure not as expected:', res);
            }
          })
          .catch(error => console.error('Error fetching data:', error));
      };
  
      // Verifica si idUsuarioGlobal existe antes de llamar a getProds
      if (idUsuarioGlobal) {
        getProds();
      }
    }, 1000); // Espera de 1 segundo antes de ejecutar getProds
  
    // Limpia el temporizador si el componente se desmonta antes de que se complete la espera
    return () => clearTimeout(delayedExecution);
  }, []);
  // Dependencias vacías para que se ejecute solo una vez al montar el componente
  

  return (
    <div>
      <div className='contC'>
        <div className='wrapperCatalogo'>
          {Array.isArray(productosA) &&
            productosA.map((producto, index) => (
              <div key={index} className='card'>
                <a>
                <div className='linkOferta2'>
                                                    <h2>Bienvenida</h2>
                                                </div>
                  <div className='img-box'>
                    <img src={imagen1} alt='' />
                  </div>
                </a>
                <div className='details'>
                  <h2>{producto.NOMBRE_P}</h2>
                  <div className='calf'>
                    <span>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar /> {producto.CANT}{' '}
                      {producto.CANT < 2 ? 'Reseña' : 'Reseñas'}{' '}
                    </span>
                  </div>
                  <div className='oferta'>
                    <h3>${producto.precio} MXN</h3>
                  </div>
                  <div className='price'>
                    <h3>${producto.preciosocio} MXN</h3>
                  </div>
                  <div className='link'>
                    <a
                      onClick={() =>
                        agregarProductoAlCarritopv(
                          producto.CLAVE_PRODUCTO_PRIMERAVEZ
                        )
                      }
                    >
                      Agregar al carrito
                    </a>
                  </div>
                  {/* <div className='fav'>
                    <FaHeart />
                  </div> */}
                  {/* <div className='link2'>
                    <a>Agregar al carrito</a>
                  </div> */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Tarjetasq;
