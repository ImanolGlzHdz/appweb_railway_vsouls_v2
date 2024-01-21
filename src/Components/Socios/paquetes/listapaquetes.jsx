import React, { useEffect, useState } from 'react';
// import './paqtes.css';
import imagen1 from './img/imagen1.png'
import estrellavacioa from './img/estrellavacia.png'
import estrellareyena from './img/estrellareyena.png'
import '../inicio/Tarjetasprimeravez/stylescatalogo2.css';
import '../DetalleProduct/stylesdetalleprod.css'
import { FaRegHeart, FaCartPlus, FaHeart, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
export var verifcadetallp =''; 
export var productp={};


const Paquetes = ({ paquetes: paquetesProp, agregarpaquetesalcarrito }) => {
  const navigate = useNavigate();
  const [paquetesData, setPaquetesData] = useState([]);
  const [productosdata, setproductosata] = useState([]);
  
  const seleccionarProducto=(prod)=>{
    productp=prod;
    verifcadetallp=3
    // console.log(prod)
    navigate("/socios/detalleproduct");
    
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://apivsoulsapi8-production.up.railway.app/paquetes/activos');
        const data = await response.json();
        setPaquetesData(data[0]); // Update here to set the array of paquetes
        // console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://apivsoulsapi8-production.up.railway.app/productos/paq');
        const data = await response.json();
        setproductosata(data[0]); // Update here to set the array of paquetes
        // console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
    <h1 className="heading-1-1">PAQUETES</h1>
    <div className='container3 '>
      {paquetesData.map((paqu, index) => (
        <section key={index} className="top-categories ">
          <div className="card-category category-moca">
            <div className="text-center">
              <div>
                <h1 className='p sizefontmen'>{paqu.nombre}</h1>
              </div>
              <span className="p ">${paqu.precio}</span>
              <div className='btn'>
                <button onClick={() => agregarpaquetesalcarrito(paqu.ID_PAQUETE)} className='btnAdd'>
                  <FaCartPlus className='iconC' />
                  <h4> Agregar</h4>
                </button>
              </div>
            </div>
  
            <section className="container3products2">
              <div className="container3-products-paquete row">
                <div className='contCP'>
                  <div className='wrapperCatalogo2'>
                    {productosdata
                      .filter((pro) => pro.ID_PAQUETE === paqu.ID_PAQUETE)
                      .map((prod, index) => (
                        <div className='card2 col-md-12' key={prod.CLAVE_P}>
                          <a onClick={() => seleccionarProducto(prod)}>
                            <div className=''>
                              <img class='img-box' src={'https://apivsoulsapi8-production.up.railway.app/products/' + prod.CLAVE_P + '-IMG_PRINCIPAL.png'} alt="" />
                            </div>
                          </a>
                          <div className='details'>
                            <h2>{prod.CANTIDAD}{'\t'}{prod.NOMBRE_P}</h2>
                            <div className='calf'>
                              <span><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /> {prod.CANT} {prod.CANT < 2 ? 'Reseña' : 'Reseñas'} </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </section>

          </div>
        </section>
      ))}
    </div>
  </div>
  

  );
  
};

export default Paquetes;
