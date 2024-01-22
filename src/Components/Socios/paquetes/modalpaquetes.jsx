import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/estilostablamodal.css'
import '../DetalleProduct/stylesdetalleprod.css'
import '../inicio/Tarjetasprimeravez/stylescatalogo2.css';
import { FaRegHeart, FaCartPlus, FaHeart, FaStar } from 'react-icons/fa';
import Menu, { idUsuarioGlobal } from '../Menu/menusocios';
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
// import '../../style_socios.css';
import imagen1 from './img/imagen1.png';
import eliminar from './img/eliminar.png'

const ModalComponent = ({ showModal, handleCloseModal }) => {
  const [carritoProductos, setCarritoProductos] = useState([]);
  const [paquetes, setPaquetes] = useState([]);
  const [totalprod, setTotalProd] = useState(0);
  const [totalpaqu, setTotalPaqu] = useState(0);
  const [total, setTotal] = useState(0);
  const [carritoProductospv, setCarritoProductospv] = useState([]);
  const [carritoData, setCarritoData] = useState([]);
  const [showMercadoPagoButton, setShowMercadoPagoButton] = useState(true);
  const [totalfinal, settotalfinal] = useState(0)
  const [paquetescarrito, setpaquetescarrito] = useState([]);
  const [preferenceId, setPreferenceId] = useState(null);
  const [totalcondescuento, settotalcondescuento] = useState([])
  const [statusventa, setstatusventa] = useState(0)
  initMercadoPago("APP_USR-a167f3fa-d4f0-4b88-8171-9ba7b01284e7");

  const cambiarstatus = () => {
    if (statusventa === 1) {
      
      settotalfinal(total)
      setstatusventa(0);
      // alert('es ' + statusventa);
    } else {
      
      settotalfinal(total- totalcondescuento)
      setstatusventa(1);
      // alert('es ' + statusventa);
    }
  }
 const finalizarVenta_bd = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/carrito/finalizarventa/${idUsuarioGlobal}/${statusventa}/${totalfinal}`, {
        method: 'POST',
      });
      // alert(``${import.meta.env.VITE_API}/carrito/finalizarventa/${idUsuarioGlobal}/${statusventa}`)
      if (response.ok) {
        const carritoResponse = await fetch(`${import.meta.env.VITE_API}/carrito/${idUsuarioGlobal}`);
        const carritoData = await carritoResponse.json();
        // setCarritoProductospv('')
        
        // setCarritoProductos(carritoData[0]);
      } else {
        // console.error('Error en la respuesta de la suma de producto:', response.statusText);
      }
    } catch (error) {
      // // console.error('Error al agregar producto al carrito:', error);
    }
  };

const finalizarVenta = async () => {
 createPreference();
 finalizarVenta_bd()
// alert(idUsuarioGlobal)
  if (preferenceId) {
    // setPreferenceId(id);
    setShowMercadoPagoButton(true);
  }
}
const fetchData = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API}/carrito/paquete/nombre/${idUsuarioGlobal}`);
    const data = await response.json();

    // Asegúrate de que la respuesta es un array antes de actualizar el estado
    if (Array.isArray(data)) {
      setpaquetescarrito(data);
      // console.log('paquetescarrito actualizado:', data);
    } else {
      // console.error('La respuesta de la API no es un array válido:', data);
    }
  } catch (error) {
    // console.error('Error al obtener datos de la API:', error);
  }
};

// Llama a fetchData cuando el componente se monta
useEffect(() => {
  fetchData();
}, []);

const createPreference = async () => {
  try {
    // Espera a que la carga de paquetes esté completa antes de continuar
   

    const productDescriptions = carritoProductos.map(item => item.nombre_p)
.concat(paquetescarrito[0].map(item => item.NOMBRE)) // Asumo que los nombres están en la posición 0 del array
.concat(carritoProductospv.map(item => item.NOMBRE_P));


    const response = await axios.post(`${import.meta.env.VITE_API}/mercadopago/create_preference/socios`, {
      description: productDescriptions.join(', '), // (modifica según tus necesidades)
      price: totalfinal, // (modifica según tus necesidades)
      quantity: 1,
    });

    const { id } = response.data;

    setPreferenceId(id);
  } catch (error) {
    // console.error('Error al crear la preferencia de MercadoPago:', error);
  }
};

  const sumarProducto = async (idprod) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/carrito/sumprod/${idUsuarioGlobal}/${idprod}`, {
        method: 'POST',
      });

      if (response.ok) {
        const carritoResponse = await fetch(`${import.meta.env.VITE_API}/carrito/${idUsuarioGlobal}`);
        const carritoData = await carritoResponse.json();
        cargarTotales();
        cargarPaquetes();
        fetchCarritoData();
        setCarritoProductos(carritoData[0]);
      } else {
        // console.error('Error en la respuesta de la suma de producto:', response.statusText);
      }
    } catch (error) {
      // console.error('Error al agregar producto al carrito:', error);
    }
  };

  const restarProducto = async (idprod) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/carrito/resprod/${idUsuarioGlobal}/${idprod}`, {
        method: 'POST',
      });

      if (response.ok) {
        const carritoResponse = await fetch(`${import.meta.env.VITE_API}/carrito/${idUsuarioGlobal}`);
        const carritoData = await carritoResponse.json();
        cargarTotales();
        setCarritoProductos(carritoData[0]);
      } else {
        // console.error('Error en la respuesta de la suma de producto:', response.statusText);
      }
    } catch (error) {
      // console.error('Error al agregar producto al carrito:', error);
    }
  };

  const eliminarProducto = async (idprod) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/carrito/elimprod/${idUsuarioGlobal}/${idprod}`, {
        method: 'POST',
      });

      if (response.ok) {
        const carritoResponse = await fetch(`${import.meta.env.VITE_API}/carrito/${idUsuarioGlobal}`);
        const carritoData = await carritoResponse.json();
        cargarTotales();
        setCarritoProductos(carritoData[0]);
      } else {
        // console.error('Error en la respuesta de la suma de producto:', response.statusText);
      }
    } catch (error) {
      // console.error('Error al agregar producto al carrito:', error);
    }
  };

  const cargarTotales = async () => {
    try {
      if (idUsuarioGlobal) {
        const fetchData = async (url) => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`Error en la solicitud: ${response.status}`);
            }
  
            const data = await response.json();
            const total = Array.isArray(data) && data[0] && data[0][0] ? data[0][0].total : 0;
            return total;
          } catch (error) {
            // console.error(`Error al obtener datos de ${url}:`, error);
            throw error; // Rethrow the error for centralized error handling
          }
        };
  
        const totalProd = await fetchData(`${import.meta.env.VITE_API}/carrito/totalpro/${idUsuarioGlobal}`);
        const totalPaqu = await fetchData(`${import.meta.env.VITE_API}/carrito/totalpaq/${idUsuarioGlobal}`);
        const total = await fetchData(`${import.meta.env.VITE_API}/carrito/total/${idUsuarioGlobal}`);
        
        // alert(Monedas_Obtenidas)
        setTotalProd(totalProd);
        setTotalPaqu(totalPaqu);
        setTotal(total);
        settotalfinal(total)
       
       
      }
    } catch (error) {
      // Handle any global error or log it
      // console.error('Error al cargar totales:', error);
      // You may want to show a user-friendly error message on the frontend
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/monedas/cli/${idUsuarioGlobal}`);
        const data = await response.json();

        // Filtrar los resultados para obtener solo la información necesaria
        const monedasObtenidas = data[0].map(item => item.Monedas_Obtenidas);
        // alert(monedasObtenidas)
        // Actualizar el estado con la información filtrada
        settotalcondescuento(monedasObtenidas);
      } catch (error) {
        // // console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const cargarProductosModal = async () => {
    if (idUsuarioGlobal) {
    try {
      const carritoResponse = await fetch(`${import.meta.env.VITE_API}/carrito/${idUsuarioGlobal}`);
      const carritoData = await carritoResponse.json();
      cargarTotales();
      setCarritoProductos(carritoData[0]);
    } catch (error) {
      // console.error('Error al cargar productos del carrito:', error);
    }} else {
      // idUsuarioGlobal no existe, realiza alguna acción o simplemente no hace nada
      // console.warn('idUsuarioGlobal no existe, no se realizará la solicitud al servidor.');
    }
  };
  
  useEffect(() => {
    fetchCarritoData();
    // cargarTotales();
    cargarProductosModalpv()
    cargarProductosModal();
  }, [showModal]);  // Añade showModal como dependencia para que se ejecute cuando cambie
  
  

  const cargarPaquetes = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/carrito/paquetes/${idUsuarioGlobal}`);
      const data = await response.json();
      const paquetesData = data[0];
      setPaquetes(paquetesData);
    } catch (error) {
      // console.error('Error al obtener paquetes:', error);
    }
  };

  const fetchCarritoData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/carrito/paquetes/${idUsuarioGlobal}`);
      const [productos, _] = await response.json();
      setCarritoData(productos);
    } catch (error) {
      // // console.error('Error fetching carrito data:', error);
    }
  };

  useEffect(() => {
    fetchCarritoData();
  }, []);

  const sumarPaquete = async (idUsuario, idPaquete) => {
    try {
      await fetch(`${import.meta.env.VITE_API}/carrito/sumpaqu/${idUsuario}/${idPaquete}`, {
        method: 'POST',
      });
      cargarTotales();
      fetchCarritoData();
    } catch (error) {
      // console.error('Error al sumar paquete:', error);
    }
  };

  const restarPaquete = async (idUsuario, idPaquete) => {
    try {
      await fetch(`${import.meta.env.VITE_API}/carrito/respaqu/${idUsuario}/${idPaquete}`, {
        method: 'POST',
      });
      cargarTotales();
      fetchCarritoData();
    } catch (error) {
      // console.error('Error al restar paquete:', error);
    }
  };

  const eliminarPaquete = async (idUsuario, idPaquete) => {
    try {
      await fetch(`${import.meta.env.VITE_API}/carrito/relimpaqu/${idUsuario}/${idPaquete}`, {
        method: 'POST',
      });
      cargarTotales();
      fetchCarritoData();
    } catch (error) {
      // console.error('Error al eliminar paquete:', error);
    }
  };

  const organizedData = carritoData.reduce((acc, item) => {
    if (!acc[item.nombre]) {
      acc[item.nombre] = {
        productos: [],
        cantidad: 0,
        precioTotal: 0,
      };
    }
    acc[item.nombre].productos.push(item);
    acc[item.nombre].cantidad = item.cantidaddepaquetes;
    acc[item.nombre].precioTotal = item.precio;
    return acc;
  }, {});

  const eliminarProductoPV = async (idprod) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/carrito/elimprodpv/${idUsuarioGlobal}/${idprod}`, {
        method: 'POST',
      });

      if (response.ok) {
        const carritoResponse = await fetch(`${import.meta.env.VITE_API}/carrito/${idUsuarioGlobal}`);
        const carritoData = await carritoResponse.json();
        cargarTotales();
        cargarProductosModalpv()
        setCarritoProductos(carritoData[0]);
      } else {
        // console.error('Error en la respuesta de la suma de producto:', response.statusText);
      }
    } catch (error) {
      // console.error('Error al agregar producto al carrito:', error);
    }
  };
  const cargarProductosModalpv = async () => {
    if (idUsuarioGlobal) {
    try {
      const carritoResponse = await fetch(`${import.meta.env.VITE_API}/carrito/prev/${idUsuarioGlobal}`);
      const carritoDatapv = await carritoResponse.json();
      cargarTotales();
      setCarritoProductospv(carritoDatapv[0]);
    } catch (error) {
      // console.error('Error al cargar productos del carrito:', error);
    }} else {
      // idUsuarioGlobal no existe, realiza alguna acción o simplemente no hace nada
      // console.warn('idUsuarioGlobal no existe, no se realizará la solicitud al servidor.');
    }
  };
  return (
    <div>
        {showModal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header className=' header-carrito' >
          <div>
                <h1 className='sizefont'>CARRITO</h1>
            </div>
            <button type="button" onClick={handleCloseModal} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </Modal.Header>
          <Modal.Body>
            <div className="sizefontmen d-flex justify-content-between">
              <h2>Productos del Carrito:</h2>
              <h2>${totalprod}</h2>
            </div>

      
            <div className='carrito'>
  <div className="carrito-items">
    {carritoProductospv.map((carritoprod, index) => (
      <div className="carrito-item" key={index}>
        <img width="80px" src={`${import.meta.env.VITE_API}/products/`+ carritoprod.CLAVE_PRODUCTO + '-IMG_PRINCIPAL.png'} alt="" />
        <div className="carrito-item-detalles sizefontmen">
          <span className="carrito-item-titulo sizefontmen">{carritoprod.NOMBRE_P}</span>
          <div className="selector-cantidad">
            
          </div>
          <span className="carrito-item-precio">{`$${carritoprod.PRECIO_PRIMERAVEZ}`}</span>
        </div>
        <span className="btn-eliminar" onClick={() => eliminarProductoPV(carritoprod.CLAVE_PRODUCTO)}>
        <img className='i' width="30" height="30" src={eliminar} alt="delete" />
        </span>
      </div>
    ))}
    {carritoProductos.map((carritoprod, index) => (
      <div className="carrito-item" key={index}>
        <img width="80px"  src={`${import.meta.env.VITE_API}/products/`+ carritoprod.CLAVE_PRODUCTO+ '-IMG_PRINCIPAL.png'} alt="" />
        <div className="carrito-item-detalles">
          <span className="carrito-item-titulo sizefontmen">{carritoprod.nombre_p}</span>
          <div className="selector-cantidad">
            <i className="i i22 fa-solid fa-minus restar-cantidad" onClick={() => restarProducto(carritoprod.CLAVE_PRODUCTO)}></i>
            <input type="text" value={carritoprod.cantidad} className="carrito-item-cantidad" disabled />
            <i className="i fa-solid fa-plus sumar-cantidad" onClick={() => sumarProducto(carritoprod.CLAVE_PRODUCTO)}></i>
          </div>
          <span className="carrito-item-precio">{`$${carritoprod.precio_socio_p}`}</span>
        </div>
        <span className="btn-eliminar">
          
        <img className='i' width="30" height="30" src={eliminar} alt="delete" onClick={() => eliminarProducto(carritoprod.CLAVE_PRODUCTO)}/>
        </span>
      </div>
    ))}
  

















            <div className="d-flex justify-content-between">
              <h2>Productos en paquete:</h2>
              <h2>${totalpaqu}</h2>
            </div>
            
            {Object.entries(organizedData).map(([seccion, data]) => (
              <div className="carrito-item" key={seccion}>
                <div className='img'>
                <h3 className='sizefontmen'>{seccion}</h3>
                
                  <h3 className='sizefontmen'>
                    ${data.precioTotal.toFixed(2)}
                  </h3>
                </div>
                
                  

                   
                    <div className="selector-cantidad cardmw">
            <i className="i2 fa-solid fa-minus restar-cantidad2" onClick={() => restarPaquete(idUsuarioGlobal, data.productos[0].ID_PAQUETE)}></i>
            <input type="text"  value={data.cantidad}  className="carrito-item-cantidad" disabled />
            <i className="i2 fa-solid fa-plus sumar-cantidad" onClick={() => sumarPaquete(idUsuarioGlobal, data.productos[0].ID_PAQUETE)}></i>
          </div>
                  <span className="btn-eliminar" onClick={() => eliminarPaquete(idUsuarioGlobal, data.productos[0].ID_PAQUETE)}>
                    
                  <img className='i' width="30" height="30" src={eliminar} alt="delete"/>
                  </span>  
                  <div className="carrito-item-detalles " >
                  {data.productos.map((item, index) => (
                      <div key={index} className='d-flex justify-content-between'>
                        <span className="carrito-item-titulo sizefont3">{item.NOMBRE_P}</span>
                       
                        <span className="carrito-item-precio sizefont3 ">{item.cantidaddeproductosporpaquete}</span>                 
                      
                      </div>
                        
                    ))}</div>
              </div>

            ))}

</div>
</div>

          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <h5>Total: ${total}</h5><h5>Total c/desc: ${totalfinal}</h5>
            <div  className='btn'>
                  <button onClick={finalizarVenta}  className='btnAdd'>
                                    <h4>Ir a pagar</h4>
                </button>
                
                  
                  </div>
          </Modal.Footer>
          <div style={{ visibility: showMercadoPagoButton ? 'visible' : 'hidden' }} className="d-flex justify-content-between">
            
            <div  className='btn'>
            <button onClick={cambiarstatus}  className='btnAdd'>
            {statusventa === 1 ? (
              <h5 className='sizefont2_menu'>No usar los puntos</h5>
            ) : (
              <h5 className='sizefont2_menu'>Usar los puntos</h5>
            )}
                </button>
            </div>
          </div>
          <div style={{ visibility: showMercadoPagoButton ? 'visible' : 'hidden' }} className="d-flex justify-content-between">
            
            <div  className='btn'>
                  
                {showMercadoPagoButton && (
                    <div className='contBotonPagar'>
                      {preferenceId && <Wallet initialization={{ preferenceId }} />}
                    </div>
                   )}
                  
                  </div>
          </div>
         
        </Modal>
      )}
    </div>
  );
};

export default ModalComponent;
