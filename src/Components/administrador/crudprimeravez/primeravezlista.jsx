import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import '../crudpublicidad/tablaestilos.css';

const InicioPaquetes = () => {
  const [productosAgregados, setProductosAgregados] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState();
  const [nuevoPrecio, setNuevoPrecio] = useState('');

const cargarprimeravez = () =>{
  // Realizar la solicitud a la API para obtener los productos agregados
  fetch(`${import.meta.env.VITE_API}/primeravez`)
  .then(response => response.json())
  .then(data => {
    // Verifica que haya datos y que la primera sublista esté presente
    if (data && Array.isArray(data[0])) {
      setProductosAgregados(data[0]);
    } else {
      console.error('La respuesta de la API no tiene el formato esperado:', data);
    }
  })
  .catch(error => console.error('Error al obtener productos agregados:', error));
}
  useEffect(() => {
    cargarprimeravez()
  }, []);
  

  const handleEliminar = (id) => {
    // Realiza la petición DELETE a la API para eliminar el producto
    fetch(`${import.meta.env.VITE_API}/primeravez/eliminar/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        // Maneja la respuesta de la API según tus necesidades
        console.log('Producto eliminado con éxito:', data);
        // Actualiza la lista de productos después de la eliminación
        fetch(`${import.meta.env.VITE_API}/primeravez`)
      .then(response => response.json())
      .then(data => {
        // Verifica que haya datos y que la primera sublista esté presente
        if (data && Array.isArray(data[0])) {
          setProductosAgregados(data[0]);
        } else {
          console.error('La respuesta de la API no tiene el formato esperado:', data);
        }
      })
      .catch(error => console.error('Error al obtener productos agregados:', error));
        // setProductosAgregados(productosAgregados.filter(producto => producto.id_primeravezprod !== id));
      })
      .catch(error => {
        console.error('Error al eliminar el producto:', error);
        // Puedes manejar el error de acuerdo a tus necesidades
      });
  };

  const handleEditar = (id) => {
    
    // Encuentra el producto seleccionado para editar
  
    setProductoSeleccionado(id);
    // alert(productoSeleccionado)
    setModalVisible(true);
  };

  const handleActualizarPrecio = () => {
    if (!isNaN(parseFloat(nuevoPrecio)) && isFinite(nuevoPrecio)) {
      // alert(productoSeleccionado+ nuevoPrecio)
    // Realiza la petición a la API para actualizar el precio
    fetch(`${import.meta.env.VITE_API}/primeravez/editar/${productoSeleccionado}/${nuevoPrecio}`, {
      method: 'PUT', // O el método que tu API requiera para actualizar
    })
      .then(response => response.json())
      .then(data => {
        // Maneja la respuesta de la API según tus necesidades
        console.log('Precio actualizado con éxito:', data);
        cargarprimeravez()

        setModalVisible(false);
      })
      .catch(error => {
        console.error('Error al actualizar el precio:', error);
        // Puedes manejar el error de acuerdo a tus necesidades
      });
    } else {
      // Muestra un mensaje de error si el nuevo precio no es un número válido
      alert('Por favor, ingresa un precio válido.');
    }
  };

  return (
    <div className='todopublicidad todobodypublicidad moveratras'>
      <section className="limitetabla containerpubli2 moveratras">
        <h1 className='h1estilos limitetabla moveratras'>Productos de primera vez (nuevousuario)</h1>
        <table className="table moveratras table-dark table-hover moveratras">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className='moveratras'>
            {productosAgregados.map(producto => (
              <tr key={producto.ID_PRIMERAVEZ}>
                <td className='moveratras'>{producto.NOMBRE_P}</td>
                <td className='moveratras'>{producto.PRECIO_PRIMERAVEZ}</td>
                <td className='moveratras'>
                  <Button variant='primary' className='margen' onClick={() => handleEditar(producto.ID_PRIMERAVEZ)}>
                    <img className='imagenbutttongrandes' width="30" height="30" src="https://img.icons8.com/ios/50/edit--v1.png" alt="edit--v1" />
                  </Button>
                  <Button variant='danger' className='margen' onClick={() => handleEliminar(producto.ID_PRIMERAVEZ)}>
                    <img className='imagenbutttongrandes' width="30" height="30" src="https://img.icons8.com/ios/50/delete--v1.png" alt="delete--v1" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modal para editar el precio */}
      <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title className='sizefont2'>Editar Precio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productoSeleccionado && (
            <Form>
              <Form.Group controlId="formPrecio">
                <Form.Label className='sizefont'>Nuevo Precio</Form.Label>
                <Form.Control
                className='sizefont2'
                  type="text"
                  placeholder="Ingrese el nuevo precio"
                  value={nuevoPrecio}
                  onChange={(e) => setNuevoPrecio(e.target.value)}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button className='sizefont' variant="primary" onClick={handleActualizarPrecio}>
            Actualizar Precio
          </Button>
          <Button className='sizefont' variant="secondary" onClick={() => setModalVisible(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default InicioPaquetes;
