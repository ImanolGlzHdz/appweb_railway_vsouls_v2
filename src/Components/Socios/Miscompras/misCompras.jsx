import React, { useEffect, useState } from 'react';
import '../stylehistorial.css'
// import Menu, { idUsuarioGlobal } from '../Menu/menusocios';
var idUsuarioGlobal= sessionStorage.getItem('socioid'); 
const App = () => {
  const [compras, setCompras] = useState([]);
  const [compras2, setCompras2] = useState([]);
  const [compras3, setCompras3] = useState([]);
// useefect de peticiones
useEffect(() => {
  const fetchData = async () => {
    try {
      // Primero, obtén las compras pendientes
      const responsePendientes = await fetch(`${import.meta.env.VITE_API}/miscompras/pendientes/${idUsuarioGlobal}`);
      const dataPendientes = await responsePendientes.json();
      setCompras2(dataPendientes[0]);

      // Luego, obtén las compras enviadas
      const responseEnviadas = await fetch(`${import.meta.env.VITE_API}/miscompras/enviadas/${idUsuarioGlobal}`);
      const dataEnviadas = await responseEnviadas.json();
      setCompras3(dataEnviadas[0]);

      // Finalmente, obtén las compras entregadas
      const responseEntregadas = await fetch(`${import.meta.env.VITE_API}/miscompras/entregadas/${idUsuarioGlobal}`);
      const dataEntregadas = await responseEntregadas.json();
      setCompras(dataEntregadas[0]);

    } catch (error) {
      // console.error('Error fetching compras data:', error);
    }
  };

  fetchData(); // Ejecuta la función de carga inicial

  // Limpia el intervalo cuando el componente se desmonta
  return () => {};
}, []); // Dependencias vacías para ejecutarse solo al montar


  // ventas pendientes
 
  // ...
  
  const organizarPorIdVenta2 = () => {
    if (!compras2 || compras2.length === 0) {
      return {}; // Devuelve un objeto vacío si compras2 es undefined o está vacío
    }
  
    const comprasPorIdVenta = {};
    compras2.forEach((compra) => {
      const idVenta = compra.ID_VENTA_SOCIOS;
      if (!comprasPorIdVenta[idVenta]) {
        comprasPorIdVenta[idVenta] = {
          compras: [],
          fecha: formatearFecha2(compra.fecha_venta),
          total: 0,
          totalsincomisioon: 0,
        };
      }
      comprasPorIdVenta[idVenta].compras.push(compra);
      // Acumula los valores correctamente
      comprasPorIdVenta[idVenta].total = compra.total;
      comprasPorIdVenta[idVenta].totalsincomisioon = compra.total - compra.totalsincomision;
    });
  
    return comprasPorIdVenta;
  };
  // Función para formatear la fecha en "DD-MM-YYYY"
  const formatearFecha2 = (fecha) => {
    const date = new Date(fecha);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const año = date.getFullYear();
    return `${dia}-${mes}-${año}`;
  };

  

  // ventas enviadas
 
  // Función para formatear la fecha en "DD-MM-YYYY"
  const formatearFecha3 = (fecha) => {
    const date = new Date(fecha);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const año = date.getFullYear();
    return `${dia}-${mes}-${año}`;
  };

  const organizarPorIdVenta3 = () => {
    if (!compras3 || compras3.length === 0) {
      return {}; // Devuelve un objeto vacío si compras3 es undefined o está vacío
    }
  
    const comprasPorIdVenta = {};
    compras3.forEach((compra) => {
      const idVenta = compra.ID_VENTA_SOCIOS;
      if (!comprasPorIdVenta[idVenta]) {
        comprasPorIdVenta[idVenta] = {
          compras: [],
          fecha: formatearFecha3(compra.fecha_venta),
          total: 0,
          totalsincomisioon: 0,
        };
      }
      comprasPorIdVenta[idVenta].compras.push(compra);
      // Acumula los valores correctamente
      comprasPorIdVenta[idVenta].total = compra.total;
      comprasPorIdVenta[idVenta].totalsincomisioon = compra.total - compra.totalsincomision;
    });
  
    return comprasPorIdVenta;
  };
  

// ventas normales

// ...

const organizarPorIdVenta = () => {
  if (!compras || compras.length === 0) {
    return {}; // Devuelve un objeto vacío si compras es undefined o está vacío
  }

  const comprasPorIdVenta = {};
  compras.forEach((compra) => {
    const idVenta = compra.ID_VENTA_SOCIOS;
    if (!comprasPorIdVenta[idVenta]) {
      comprasPorIdVenta[idVenta] = {
        compras: [],
        fecha: formatearFecha(compra.fecha_venta),
        total: 0,
        totalsincomisioon: 0,
      };
    }
    comprasPorIdVenta[idVenta].compras.push(compra);
    // Acumula los valores correctamente
    comprasPorIdVenta[idVenta].total = compra.total;
    comprasPorIdVenta[idVenta].totalsincomisioon = compra.total - compra.totalsincomision;
  });

  return comprasPorIdVenta;
};

  // Función para formatear la fecha en "DD-MM-YYYY"
  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const año = date.getFullYear();
    return `${dia}-${mes}-${año}`;
  };


  return (
    <div className='mincontenido'>
      <h1 className="heading-1-1">MIS COMPRAS</h1>
     
     
      {Object.entries(organizarPorIdVenta3()).map(([ID_VENTA_SOCIOS, { compras: comprasIdVenta3, fecha, total,totalsincomisioon }]) => (
        <div className='text-center' key={ID_VENTA_SOCIOS}>
          <h5 className='sicefont3'>Fecha: {fecha} &nbsp;&nbsp;&nbsp;&nbsp; Total: ${total}   &nbsp;&nbsp;&nbsp;&nbsp;   Comision: ${totalsincomisioon-total}</h5>
          <h5 className='h5 azul'>
            Enviado
          </h5>
          <div className='wrapperList'>
            <table className="default">
              <thead>
                <tr>
                  <th>Nombre Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {comprasIdVenta3.map((compra, index) => (
                  <tr key={`${ID_VENTA_SOCIOS}-${index}`}>
                    <td>{compra.nombre_producto}</td>
                    <td>{compra.precio}</td>
                    <td>{compra.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

       {Object.entries(organizarPorIdVenta2()).map(([ID_VENTA_SOCIOS, { compras: comprasIdVenta2, fecha, total, totalsincomisioon }]) => (
        <div className='text-center' key={ID_VENTA_SOCIOS}>
          <h5 className='sicefont3'>&nbsp; Fecha: {fecha} &nbsp;&nbsp;&nbsp;&nbsp; Total: ${total}   &nbsp;&nbsp;&nbsp;&nbsp;   Comision: ${totalsincomisioon-total}</h5>
          <h5 className={`h5 ${comprasIdVenta2[0].STATUS_VENTA_SOCIOS === 1 ? 'verde' : (comprasIdVenta2[0].STATUS_VENTA_SOCIOS === 2 ? 'azul' : 'pendiente')}`}>
            {comprasIdVenta2[0].STATUS_VENTA_SOCIOS === 1 ? 'Pedido Entregado' : (comprasIdVenta2[0].STATUS_VENTA_SOCIOS === 2 ? 'Enviado' : 'Pendiente')}
          </h5>
          <div className='wrapperList'>
            <table className="default">
              <thead>
                <tr>
                  <th>Nombre Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {comprasIdVenta2.map((compra, index) => (
                  <tr key={`${ID_VENTA_SOCIOS}-${index}`}>
                    <td>{compra.nombre_producto}</td>
                    <td>{compra.precio}</td>
                    <td>{compra.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}


      {Object.entries(organizarPorIdVenta()).map(([ID_VENTA_SOCIOS, { compras: comprasIdVenta, fecha, total,totalsincomisioon }]) => (
        <div className='text-center' key={ID_VENTA_SOCIOS}>
          <h5 className='sicefont3'>Fecha: {fecha} &nbsp;&nbsp;&nbsp;&nbsp; Total: ${total}   &nbsp;&nbsp;&nbsp;&nbsp;   Comision: ${totalsincomisioon-total}</h5>
          <h5 className={`h5 ${comprasIdVenta[0].STATUS_VENTA_SOCIOS === 1 ? 'verde' : (comprasIdVenta[0].STATUS_VENTA_SOCIOS === 2 ? 'azul' : 'pendiente')}`}>
            {comprasIdVenta[0].STATUS_VENTA_SOCIOS === 1 ? 'Pedido Entregado' : (comprasIdVenta[0].STATUS_VENTA_SOCIOS === 2 ? 'Enviado' : 'Pendiente')}
          </h5>
          <div className='wrapperList'>
            <table className="default">
              <thead>
                <tr>
                  <th>Nombre Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {comprasIdVenta.map((compra, index) => (
                  <tr key={`${ID_VENTA_SOCIOS}-${index}`}>
                    <td>{compra.nombre_producto}</td>
                    <td>{compra.precio}</td>
                    <td>{compra.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
