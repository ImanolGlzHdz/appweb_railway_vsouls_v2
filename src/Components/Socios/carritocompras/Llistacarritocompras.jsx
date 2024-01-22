import React, { useState, useEffect } from 'react';
import Menu, { idUsuarioGlobal } from '../Menu/menusocios';
import { Table } from 'react-bootstrap';

const Llistacarritocompras = () => {
  const [carritoData, setCarritoData] = useState([]);

  const fetchCarritoData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/carrito/paquetes/${idUsuarioGlobal}`);
      const [productos, _] = await response.json();
      setCarritoData(productos);
    } catch (error) {
      console.error('Error fetching carrito data:', error);
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
      // Vuelve a cargar los datos después de la actualización
      fetchCarritoData();
    } catch (error) {
      console.error('Error al sumar paquete:', error);
    }
  };

  const restarPaquete = async (idUsuario, idPaquete) => {
    try {
      await fetch(`${import.meta.env.VITE_API}/carrito/respaqu/${idUsuario}/${idPaquete}`, {
        method: 'POST',
      });
      // Vuelve a cargar los datos después de la actualización
      fetchCarritoData();
    } catch (error) {
      console.error('Error al restar paquete:', error);
    }
  };

  const eliminarPaquete = async (idUsuario, idPaquete) => {
    try {
      await fetch(`${import.meta.env.VITE_API}/carrito/relimpaqu/${idUsuario}/${idPaquete}`, {
        method: 'POST',
      });
      // Vuelve a cargar los datos después de la actualización
      fetchCarritoData();
    } catch (error) {
      console.error('Error al eliminar paquete:', error);
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

  return (
    <div>
      {Object.entries(organizedData).map(([seccion, data]) => (
        <div key={seccion}>
          <div className="d-flex justify-content-between">
            <h3>{seccion}</h3>
            <h3>
              Cantidad/paquetes: {data.cantidad} - Precio: ${data.precioTotal.toFixed(2)}
            </h3>
            <button className='btn btn-danger margen' onClick={() => restarPaquete(idUsuarioGlobal, data.productos[0].idpaquete)}>
              <img width="15" height="15" src="https://img.icons8.com/ios-glyphs/30/minus-math.png" alt="minus-math" />
            </button>
            <button className='btn btn-primary margen' onClick={() => sumarPaquete(idUsuarioGlobal, data.productos[0].idpaquete)}>
              <img width="15" height="15" src="https://img.icons8.com/material-rounded/24/plus-math--v1.png" alt="plus-math--v1" />
            </button>
            <button className='btn btn-danger margen' onClick={() => eliminarPaquete(idUsuarioGlobal, data.productos[0].idpaquete)}>
              <img width="15" height="15" src="https://img.icons8.com/ios/50/delete--v1.png" alt="delete--v1" />
            </button>
          </div>
          
          <Table className="table listlist table-info table-hover">
            <thead>
              <tr>
                <th>Producto</th>
                <th>productos/paquete</th>
              </tr>
            </thead>
            <tbody>
              {data.productos.map((item, index) => (
                <tr key={index}>
                  <td>{item.nombreproducto}</td>
                  <td>{item.cantidaddeproductosporpaquete}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default Llistacarritocompras;
