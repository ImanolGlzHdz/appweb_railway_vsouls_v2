import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../crudpublicidad/tablaestilos.css';
import { useNavigate } from 'react-router-dom';

const InicioPaquetes = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoPrecio, setNuevoPrecio] = useState('');

  const navigate = useNavigate();

  const cargarProductos = () => {
    fetch("https://apivsoulsapi8-production.up.railway.app/productos")
      .then(respuesta => respuesta.json())
      .then(data => {
        const productos = Array.isArray(data) ? data : [];
        setProductos(productos);
      })
      .catch(error => console.error('Error al obtener productos:', error));
  };

  const handleAgregar = () => {
    // Verifica si el nuevo precio es un número
    if (!isNaN(parseFloat(nuevoPrecio)) && isFinite(nuevoPrecio)) {
      const idProducto = productoSeleccionado.CLAVE_P;
      const nuevoPrecioFloat = parseFloat(nuevoPrecio).toFixed(2); // Redondea a dos decimales
      // alert(idProducto + nuevoPrecioFloat)
      // Realiza la petición POST a la API
      fetch(`https://apivsoulsapi8-production.up.railway.app/primeravez/crear/${idProducto}/${nuevoPrecioFloat}`, {
        method: 'POST',
      })
        .then(response => response.json())
        .then(data => {
          // Maneja la respuesta de la API según tus necesidades
          console.log('Producto registrado con éxito:', data);
          setModalVisible(false);
          setNuevoPrecio('');
          // navigate('./menuadminprimeravezlista')
        })
        .catch(error => {
          console.error('Error al registrar el producto:', error);
          // Puedes manejar el error de acuerdo a tus necesidades
        });
    } else {
      // Muestra un mensaje de error si el nuevo precio no es un número válido
      alert('Por favor, ingresa un precio válido.');
    }
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
                <Button
                  variant='primary'
                  onClick={() => {
                    setProductoSeleccionado({ CLAVE_P, NOMBRE_P, PRECIO_SOCIO_P });
                    setModalVisible(true);
                  }}
                >
                  <img className='imagenbutttongrandes' width="30" height="30" src="https://img.icons8.com/color/48/add-product.png" alt="add-product" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal className='sizefont' show={modalVisible} onHide={() => setModalVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title className='sizefont' ><h1>Producto</h1></Modal.Title>
          </Modal.Header>
        <Modal.Body>
          {productoSeleccionado && (
            <div >
              <p className='sizefont'>Nombre: {productoSeleccionado.NOMBRE_P}</p>
              <p className='sizefont'>Precio regular: {productoSeleccionado.PRECIO_SOCIO_P}</p>
            </div>
          )}
          <div class=" input-group mb-3">
            <span class="sizefont input-group-text">$</span>
            <input
              type="text"
              class="sizefont form-control"
              placeholder='ESCRIBE EL PRECIO'
              aria-label="Amount (to the nearest dollar)"
              value={nuevoPrecio}
              onChange={(e) => setNuevoPrecio(e.target.value)}
            />
            <span class="sizefont input-group-text">.00</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='sizefont' variant="secondary" onClick={handleAgregar}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>

      </section>
    </div>
  );
}

export default InicioPaquetes;
