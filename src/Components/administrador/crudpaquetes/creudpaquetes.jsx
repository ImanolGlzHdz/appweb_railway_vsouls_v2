import React, { useEffect, useState } from 'react';
import '../crudpublicidad/tablaestilos.css';
import { useNavigate } from 'react-router-dom';

const InicioPaquetes = () => {
  const [productos, setProductos] = useState([]);
  const [productosAgregados, setProductosAgregados] = useState([]);
  const [nombrePaquete, setNombrePaquete] = useState('');
  const [precioPaquete, setPrecioPaquete] = useState('');
  const [cantidades, setCantidades] = useState({});

  const [idPaquete, setIdPaquete] = useState(generateNumericUUID());

  function generateNumericUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
    });
    var numericUUID = parseInt(uuid.replace(/\D/g, ''), 10);
  
    return numericUUID;
}



  const agregarProductoAlPaquete = (idProducto) => {
    const productoExistente = productosAgregados.find(producto => producto.CLAVE_P === idProducto);

    if (!productoExistente) {
      const producto = productos.find(producto => producto.CLAVE_P === idProducto);
      setProductosAgregados([...productosAgregados, { id_producto: idProducto, cantidad: 1, ...producto }]);
      setCantidades({ ...cantidades, [idProducto]: 1 });
    } else {
      const nuevasCantidades = { ...cantidades, [idProducto]: cantidades[idProducto] + 1 };
      setCantidades(nuevasCantidades);
      const nuevosProductos = productosAgregados.map(producto =>
        producto.CLAVE_P === idProducto ? { ...producto, cantidad: cantidades[idProducto] + 1 } : producto
      );
      setProductosAgregados(nuevosProductos);
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
  };

  const eliminarProductoDelPaquete = (idProducto) => {
    const nuevosProductosAgregados = productosAgregados.filter(producto => producto.id_producto !== idProducto);
    setProductosAgregados(nuevosProductosAgregados);
  };

  const sumarpaquete = (idProducto) => {
    const nuevosProductosAgregados = productosAgregados.map(producto =>
      producto.id_producto === idProducto ? { ...producto, cantidad: producto.cantidad + 1 } : producto
    );
    setProductosAgregados(nuevosProductosAgregados);
  };

  const restarpaquete = (idProducto) => {
    const nuevosProductosAgregados = productosAgregados.map(producto =>
      producto.id_producto === idProducto && producto.cantidad > 0
        ? { ...producto, cantidad: producto.cantidad - 1 }
        : producto
    );
    setProductosAgregados(nuevosProductosAgregados);
  };

  let navigate = useNavigate();

  const agregarPaquete = () => {
    const paquete = {
      nombre_paquete: nombrePaquete,
      precio: precioPaquete,
      id_paquete: idPaquete,
      productos: productosAgregados.map(({ id_producto, cantidad }) => ({ id_producto, cantidad }))
    };
  
    // Imprime el objeto paquete en la consola
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

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div className='todopublicidad todobodypublicidad moveratras'>
      <section className="limitetabla containerpubli2 moveratras">
      
      <h1 className='h1estilos limitetabla moveratras'>Todos los productos</h1>
      <table className="table table-dark table-hover moveratras">
        <thead className='moveratras'>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className='moveratras'>
          {Array.isArray(productos) && productos.map(({ CLAVE_P, NOMBRE_P, PRECIO_SOCIO_P }) => (
            <tr key={CLAVE_P} className='moveratras'>
              <td className='moveratras'>{NOMBRE_P}</td>
              <td className='moveratras'>{PRECIO_SOCIO_P}</td>
              <td className='moveratras'>
                <button className='btn btn-primary margen' onClick={() => agregarProductoAlPaquete(CLAVE_P)}>
                  <img className='imagenbutttongrandes' width="30" height="30" src="https://img.icons8.com/color/48/add-product.png" alt="add-product" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className='h1estilos'>Productos agregados al paquete</h1>
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
          {Array.isArray(productosAgregados) && productosAgregados.map(({ id_producto, CLAVE_P, NOMBRE_P, PRECIO_SOCIO_P, cantidad }) => (
            <tr key={id_producto}>
              <td>{NOMBRE_P}</td>
              <td>{PRECIO_SOCIO_P}</td>
              <td>{cantidad}</td>
              <td>
                <button className='btn btn-danger margen' onClick={() => restarpaquete(id_producto)}>
                  <img className='imagenbutttongrandes' width="24" height="24" src="https://img.icons8.com/ios-glyphs/30/minus-math.png" alt="minus-math"/> 
                </button>
                <button className='btn btn-primary margen' onClick={() => sumarpaquete(id_producto)}>
                  <img className='imagenbutttongrandes' width="24" height="24" src="https://img.icons8.com/material-rounded/24/plus-math--v1.png" alt="plus-math--v1"/>
                </button>
                <button className='btn btn-danger margen' onClick={() => eliminarProductoDelPaquete(id_producto)}>
                  <img className='imagenbutttongrandes' width="30" height="30" src="https://img.icons8.com/ios/50/delete--v1.png" alt="delete--v1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <div className="input-group">
        <h3 className='h1estilos'>Datos</h3>
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control sizefont"
          placeholder="Nombre del paquete"
          value={nombrePaquete}
          onChange={(e) => setNombrePaquete(e.target.value)}
        />
        <span className="input-group-text sizefont">$</span>
        <input
          type="text"
          className="form-control sizefont"
          placeholder="Precio del paquete"
          value={precioPaquete}
          onChange={(e) => setPrecioPaquete(e.target.value)}
        />
        <span className=" sizefont input-group-text">.00</span>
      </div>
      <br />
      <button className=' sizefont btn btn-primary margen' onClick={agregarPaquete}>
        Agregar <img width="48" height="48" src="https://img.icons8.com/emoji/48/package-.png" alt="package-" />
      </button>
      </section>
    </div>
  );
}

export default InicioPaquetes;
