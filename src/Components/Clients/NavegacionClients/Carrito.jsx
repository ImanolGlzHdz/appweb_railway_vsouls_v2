import React, { useState, useEffect, useRef } from 'react';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import MenuCliente from '../../Menu/Menu'
import { useNavigate } from "react-router-dom";

import Footer from '../../Footer/footer'

import "../Venta/ListaCarrito.css";
export var prodCarrito = {};

const Carrito = () => {
  const navigate = useNavigate();
  const [preferenceId, setPreferenceId] = useState(null);
  const [carritoData, setCarritoData] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const [total, setTotal] = useState(0);
  const [totalConDescuento, setTotalConDescuento] = useState(0);
  const [showMercadoPagoButton, setShowMercadoPagoButton] = useState(true);
  
  const buttonRef = useRef(null);

  initMercadoPago("APP_USR-a167f3fa-d4f0-4b88-8171-9ba7b01284e7");

  useEffect(() => {
    const fetchCarritoData = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        const response = await axios.get(`${import.meta.env.VITE_API}/ver-carrito/${userId}`);

        if (response.data.length > 0) {
          const cantidadesIniciales = {};

          response.data[0].forEach(item => {
            cantidadesIniciales[item.CLAVEPRODUCTO] = item.CANTIDADC;
          });

          setCarritoData(response.data[0]);
          setCantidades(cantidadesIniciales);
        } else {
          console.error('La respuesta del servidor no contiene datos.');
        }
      } catch (error) {
        console.error('Error al recuperar datos del carrito:', error);
      }
    };

    fetchCarritoData();
  }, []);

  useEffect(() => {
    const newTotal = carritoData.reduce((acc, item) => {
      return acc + item.PRECIOPRODUCTO * cantidades[item.CLAVEPRODUCTO];
    }, 0);
    setTotal(newTotal);

    const totalDiscounted = carritoData.reduce((acc, item) => {
      const discountedPrice = item.PRECIOPRODUCTO * (1 - calculateDiscount(cantidades[item.CLAVEPRODUCTO]));
      return acc + discountedPrice * cantidades[item.CLAVEPRODUCTO];
    }, 0);
    setTotalConDescuento(totalDiscounted);
    setShowMercadoPagoButton(false);

  }, [cantidades, carritoData]);

  const datosProductoCompleta = (item) => {

    const newP = {"CLAVE_P":item.CLAVEPRODUCTO, "NOMBRE_P":item.NOMBREPRODUCTO,
                  "DESCRIPCION_P":item.DESCRIPCION_P,
                  "BENEFICIOS_P":item.BENEFICIOS_P,
                  "PRECIO_P":item.PRECIOPRODUCTO,
                  "CANT":item.CANT_REVIEW
                }
    console.log(newP)
    prodCarrito=newP;
    navigate("/cliente/detalleProducto");
  }

  const createPreference = async () => {
    try {
      const totalPrice = carritoData.reduce((acc, item) => {
        const discountedPrice = item.PRECIOPRODUCTO * (1 - calculateDiscount(item.CANTIDADC));
        return acc + discountedPrice * item.CANTIDADC;
      }, 0);

      const productDescriptions = carritoData.map(item => item.NOMBREPRODUCTO);

      const response = await axios.post(`${import.meta.env.VITE_API}/mercadopago/create_preference`, {
        description: productDescriptions.join(', '),
        price: totalConDescuento,
        quantity: 1,
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.error('Error al crear la preferencia de MercadoPago:', error);
    }
  };


  const updateCantidadEnBaseDeDatos = async () => {
    for (const itemId in cantidades) {
      const userId = sessionStorage.getItem('userId');
      const url = `${import.meta.env.VITE_API}/actualizar-canti/${userId}/${itemId}/${cantidades[itemId]}`;
      try {
        await axios.put(url, null, {});
      } catch (error) {
        console.error(`Error al actualizar la cantidad para el producto ${itemId} en la base de datos:`, error.message);
      }
    }
  };

  const handleBuy = async () => {
    updateCantidadEnBaseDeDatos();
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
      setShowMercadoPagoButton(true);
    }
  };

  const calculateDiscount = (quantity) => {
    if (quantity === 2) {
      return 0.12;
    } else if (quantity >= 3 && quantity <= 5) {
      return 0.20;
    } else if (quantity >= 6) {
      return 0.40;
    } else {
      return 0;
    }
  };

  const eliminarDelCarro = (productoClave) => {
    const userId = sessionStorage.getItem('userId');
    const url = `${import.meta.env.VITE_API}/borrar-producto-carrito/${userId}/${productoClave}`;

    axios.delete(url)
      .then(response => {
        alert('Borrado del carrito exitosamente');
        const userId = sessionStorage.getItem('userId');
        axios.get(`${import.meta.env.VITE_API}/ver-carrito/${userId}`)
          .then(response => {
            const cantidadesIniciales = {};
            response.data[0].forEach(item => {
              cantidadesIniciales[item.CLAVEPRODUCTO] = 1;
            });
            if (response.data[0].length > 1) {
              setCarritoData(response.data);
              setCantidades(cantidadesIniciales);
              handleReload();
            } else {
              handleReload();
            }
          })
          .catch(error => {
            console.error('Error al recuperar datos actualizados del carrito:', error);
          });
      })
      .catch(error => {
        console.error('Error al eliminar el producto del carrito:', error);
      });
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      <MenuCliente />
      <div className='contenedorCarDet'>
        {carritoData.length === 0 ? (
          <div style={{ width: '60%', height: '150px', marginTop: '4%', backgroundColor: 'white', marginLeft: '20%' }}>

            <h5 style={{ fontFamily: 'sans-serif', marginTop: '20px', fontWeight: 'bold', color: '#333', textAlign: 'center', fontSize: '40px', textDecoration: 'line-through' }}>🛒</h5>

            <h4 style={{ fontFamily: 'sans-serif', marginTop: '20px', marginBottom: '20px', fontWeight: 'bold', fontSize: '15px', color: '#333', textAlign: 'center' }}>
              No hay productos en tu carrito de compras.
            </h4>
          </div>
        ) : (
          <>
            <table id='tableListaCarrito' className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Productos</th>
                  <th scope="col"></th>
                  <th scope="col" className='scops'></th>
                  <th scope="col" className='scops'></th>
                </tr>
              </thead>
              <tbody>
                {carritoData.map(item => (
                  <tr key={item.CLAVEPRODUCTO}>
                    <th scope="row" className='imgTable'>
                      <img src={`${import.meta.env.VITE_API}/products/` + item.CLAVEPRODUCTO + '-IMG_PRINCIPAL.png'} style={{ width: "100%" }} alt="" />
                    </th>
                    <td className='nombreProduct'>{item.NOMBREPRODUCTO}
                      <br />
                      <div className='linksCarro'>
                        <a onClick={() => eliminarDelCarro(item.CLAVEPRODUCTO)}>Eliminar</a>
                        <a onClick={() => datosProductoCompleta(item)}>Ver producto</a>
                      </div>
                    </td>
                    <td className='cantPorp'>
                      <div className="cantidad-input">
                        <button
                          className="botonMasMenos btnMenos"
                          onClick={() => {
                            const newCantidades = { ...cantidades };
                            newCantidades[item.CLAVEPRODUCTO] = Math.max(1, cantidades[item.CLAVEPRODUCTO] - 1);
                            setCantidades(newCantidades);
                          }}
                        >-</button>
                        <input
                          type="number"
                          className="numeroCarritoCant"
                          value={cantidades[item.CLAVEPRODUCTO]}
                          onChange={(e) => {
                            const newCantidades = { ...cantidades };
                            newCantidades[item.CLAVEPRODUCTO] = parseInt(e.target.value) || 1;
                            setCantidades(newCantidades);
                          }}
                          readOnly
                        />
                        <button
                          className="botonMasMenos btnMas"
                          onClick={() => {
                            const newCantidades = { ...cantidades };
                            newCantidades[item.CLAVEPRODUCTO] = Math.min(item.EXISTENCIAS, cantidades[item.CLAVEPRODUCTO] + 1);
                            setCantidades(newCantidades);
                          }}
                        >+</button>
                      </div>
                      <label id='existencias'>{item.EXISTENCIAS} Disponibles</label>
                    </td>
                    <td className='PrePorTot'>
                      <label>Precio: {item.PRECIOPRODUCTO} c/u</label><br />
                      <label>Descuento: {calculateDiscount(cantidades[item.CLAVEPRODUCTO]) * 100}%</label>
                      <label>Total: {item.PRECIOPRODUCTO * cantidades[item.CLAVEPRODUCTO] * (1 - calculateDiscount(cantidades[item.CLAVEPRODUCTO]))}</label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='contDetail'>
              <h4 style={{ textAlign: "center" }}>Resumen de compra</h4>
              <hr />
              <div className='contDett'>
                <div className='detPrecios'>
                  <h5 className='totProducts'>Productos({carritoData.length})</h5>
                  <p>Subtotal: <s>{total}</s></p>
                  <p>Total con Descuento: {totalConDescuento}</p>
                </div>

                <div className='contBtnPago'>
                  <button type="button" className='botonc boton-carga' ref={buttonRef} onClick={handleBuy}>
                    Iniciar compra
                  </button>

                  {showMercadoPagoButton && (
                    <div className='contBotonPagar'>
                      {preferenceId && <Wallet initialization={{ preferenceId }} />}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer/>
    </>
  );
};

export default Carrito

