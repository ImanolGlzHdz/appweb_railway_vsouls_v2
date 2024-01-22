import React, { useEffect, useState } from 'react';
import '../crudpublicidad/tablaestilos.css';
import { useNavigate } from 'react-router-dom';
import { id_paquete_producto, nombre_paquete_producto, precio_paquete_producto } from './listapaquetes';

const EditarPaquetes = () => {
  const [productos, setProductos] = useState([]);
  const [productosAgregados, setProductosAgregados] = useState([]);
  const [nombrePaquete, setNombrePaquete] = useState('');
  const [precioPaquete, setPrecioPaquete] = useState('');
  const [idPaquete, setIdPaquete] = useState();

  const navigate = useNavigate();

  const agregarProductoAlPaquete = (idProducto, nombre, precio) => {
    const productoExistente = productosAgregados.find(producto => producto.id_producto === idProducto);

    if (!productoExistente) {
      const producto = productos.find(producto => producto.claveproducto === idProducto);
      setProductosAgregados([...productosAgregados, { id_producto: idProducto, cantidad: 1, NOMBRE_P: nombre, PRECIO_SOCIO_P: precio, ...producto }]);
    } else {
      const nuevosProductosAgregados = productosAgregados.map(producto =>
        producto.id_producto === idProducto ? { ...producto, cantidad: producto.cantidad + 1 } : producto
      );
      setProductosAgregados(nuevosProductosAgregados);
    }
  };

  const eliminarProductoDelPaquete = (idProducto, idPaquete_p) => {
    const nuevosProductosAgregados = productosAgregados.filter(producto => producto.id_producto !== idProducto);
    setProductosAgregados(nuevosProductosAgregados);

    const url = `${import.meta.env.VITE_API}/paquetes/productos/${idProducto}/${idPaquete_p}`;

    fetch(url, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error al eliminar producto del paquete: ${response.status}`);
        }
      })
      .catch(error => {
        console.error('Error al eliminar producto del paquete:', error);
      });
  };

  const actualizarCantidadPaquete = (idProducto, cantidad) => {
    const nuevosProductosAgregados = productosAgregados.map(producto =>
      producto.id_producto === idProducto ? { ...producto, cantidad } : producto
    );
    setProductosAgregados(nuevosProductosAgregados);
  };

  const sumarRestarPaquete = (idProducto, operacion) => {
    const producto = productosAgregados.find(producto => producto.id_producto === idProducto);

    if (producto) {
      const nuevaCantidad = operacion === 'sumar' ? producto.cantidad + 1 : Math.max(producto.cantidad - 1, 0);
      actualizarCantidadPaquete(idProducto, nuevaCantidad);
    }
  };

  const cargarProductos = () => {
    fetch(`${import.meta.env.VITE_API}/productos`)
      .then(respuesta => respuesta.json())
      .then(data => {
        const productos = Array.isArray(data) ? data : [];
        setProductos(productos);
      })
      .catch(error => console.error('Error al obtener productos:', error));
    setNombrePaquete(nombre_paquete_producto);
    setPrecioPaquete(precio_paquete_producto);
  };

  const cargarProductosporPaquete = () => {
    if (!id_paquete_producto) {
      return;
    }

    fetch(`${import.meta.env.VITE_API}/paquetes/productos/${id_paquete_producto}`)
      .then(respuesta => respuesta.json())
      .then(data => {
        const productos = Array.isArray(data) && data.length > 0 ? data[0] : [];
        setProductosAgregados(productos);
      })
      .catch(error => console.error('Error al obtener productos:', error));
  };

  useEffect(() => {
    cargarProductosporPaquete();
    cargarProductos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const restarpaquete = (idProducto) => {
    sumarRestarPaquete(idProducto, 'restar');
  };

  const sumarpaquete = (idProducto) => {
    sumarRestarPaquete(idProducto, 'sumar');
  };

  const agregarPaquete = () => {
    const paquete = {
      nombre_paquete: nombrePaquete,
      precio: precioPaquete,
      id_paquete: id_paquete_producto,
      productos: productosAgregados.map(({ id_producto, cantidad }) => ({ id_producto, cantidad }))
    };

    console.log('Paquete a enviar:', paquete);

    fetch(`${import.meta.env.VITE_API}/paquetes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paquete),
    })
      .then(response => response.json())
      .then(data => {
        setIdPaquete(data.id_paquete);
        alert('Paquete actualizado');
        navigate('/menupaqueteslista');
      })
      .catch(error => console.error('Error al agregar el paquete:', error));
  };

  return (
    <div className='todopublicidad todobodypublicidad'>
      <section className="limitetabla containerpubli2 moveratras">
        <h1 className='h1estilos limitetabla'>Todos los productos</h1>
        <table className="table table-dark table-hover moveratras">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(productos) && productos.map(({ CLAVE_P, NOMBRE_P, PRECIO_SOCIO_P }) => (
              <tr key={CLAVE_P}>
                <td className='moveratras'>{NOMBRE_P}</td>
                <td className='moveratras'>{PRECIO_SOCIO_P}</td>
                <td className='moveratras'>
                  <button className='btn btn-primary margen' onClick={() => agregarProductoAlPaquete(CLAVE_P, NOMBRE_P, PRECIO_SOCIO_P)}>
                    <img width="30" className='imagenbutttongrandes' height="30" src="https://img.icons8.com/color/48/add-product.png" alt="add-product" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1 className='h1estilos'>Productos agregados al paquete</h1>
        <h1 className='h1estilos'>con ID: {id_paquete_producto}</h1>
        <table className="table table-dark table-hover moveratras">
          <thead>
            <tr >
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(productosAgregados) && productosAgregados.map(({ id_producto, NOMBRE_P, PRECIO_SOCIO_P, cantidad }) => (
  <tr key={id_producto}>
    <td className='moveratras'>{NOMBRE_P}</td>
    <td className='moveratras'>{PRECIO_SOCIO_P}</td>
    <td className='moveratras'>{cantidad}</td>
    <td className='moveratras'>
      <button className='btn btn-danger margen' onClick={() => restarpaquete(id_producto)}>
        <img width="24" className='imagenbutttongrandes' height="24" src="https://img.icons8.com/ios-glyphs/30/minus-math.png" alt="minus-math" />
      </button>
      <button className='btn btn-primary margen' onClick={() => sumarpaquete(id_producto)}>
        <img width="24" height="24" className='imagenbutttongrandes' src="https://img.icons8.com/material-rounded/24/plus-math--v1.png" alt="plus-math--v1" />
      </button>
      <button className='btn btn-danger margen' onClick={() => eliminarProductoDelPaquete(id_producto, id_paquete_producto)}>
        <img className='imagenbutttongrandes' width="30" height="30" src="https://img.icons8.com/ios/50/delete--v1.png" alt="delete--v1" />
      </button>
    </td>
  </tr>
))}

          </tbody>
        </table>

        <br />
        <div className="input-group moveratras">
          <h3 className='h1estilos moveratras'>Datos</h3>
        </div>
        <div className="input-group mb-3 moveratras">
          <input
            type="text"
            className="sizefont form-control moveratras"
            placeholder="Nombre del paquete"
            value={nombrePaquete}
            onChange={(e) => setNombrePaquete(e.target.value)}
          />
          <span className="sizefont input-group-text moveratras">$</span>
          <input
            type="text"
            className=" sizefont form-control moveratras"
            placeholder="Precio del paquete"
            value={precioPaquete}
            onChange={(e) => setPrecioPaquete(e.target.value)}
          />
          <span className="sizefont input-group-text">.00</span>
        </div>
        <br />
        <button className='sizefont btn btn-primary margen' onClick={agregarPaquete}>
          Editar <img width="48" height="48" src="https://img.icons8.com/emoji/48/package-.png" alt="package-" />
        </button>
      </section>
    </div>
  );
};

export default EditarPaquetes;
