import React, { useEffect, useState } from 'react';
import '../crudpublicidad/tablaestilos.css';
import { useNavigate } from 'react-router-dom';

// Cambiado a variable local en lugar de exportarla
let id_paquete_producto = '';
let nombre_paquete_producto = '';
let precio_paquete_producto = 0;

export { id_paquete_producto , nombre_paquete_producto, precio_paquete_producto};

const Listapaquetes = () => {
  const [Paquetes, setPaquetes] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/paquetes`)
      .then(respuesta => respuesta.json())
      .then(data => {
        const paquetes = Array.isArray(data[0]) ? data[0] : [];
        setPaquetes(paquetes);
      })
      .catch(error => console.error('Error al obtener paquetes:', error));
  }, []);

  // Cambiado para pasar la función como una función anónima
  const funcioneditar = (idp, nombrep, preciop) => {
    id_paquete_producto = idp;
    nombre_paquete_producto = nombrep;
    precio_paquete_producto = preciop;
  
    // alert(`ID: ${id_paquete_producto}, Nombre: ${nombre_paquete_producto}, Precio: ${precio_paquete_producto}`);
    navigate('/menupaqueteseditar');
  }
  

  const getIcono = (status) => {
    const statusValue = status?.data ? status.data[0] : status;

    return statusValue === 0
      ? "https://img.icons8.com/ios-glyphs/30/hide.png"
      : "https://img.icons8.com/ios/50/visible.png";
  };

  const cambiarstatus = async (idPaquete, status) => {
    let statusValue = status?.data ? status.data[0] : status;
  
    if (statusValue === 0) {
      statusValue = 1;
    } else {
      statusValue = 0;
    }
  
    fetch(`${import.meta.env.VITE_API}/paquetes/estatus/${idPaquete}/${statusValue}`, {
      method: "POST"
    })
      .then(respuesta => respuesta.json())
      .then(data => {

        const paquetes = Array.isArray(data[0]) ? data[0] : [];
        setPaquetes(paquetes);
        // console.log(paquetes)
      })
      .catch(error => console.error('Error al cambiar el estatus:', error));
  };
  

  const funcionEliminar = (id) => {
    fetch(`${import.meta.env.VITE_API}/paquetes/${id}`, {
      method: "DELETE"
    })
      .then(() => {
       
          fetch(`${import.meta.env.VITE_API}/paquetes`)
            .then(respuesta => respuesta.json())
            .then(data => {
              const paquetes = Array.isArray(data[0]) ? data[0] : [];
              setPaquetes(paquetes);
            })
            .catch(error => console.error('Error al obtener paquetes:', error));        
      })
      .catch(error => console.error('Error al eliminar:', error));
  }

  return (
    <div className='todopublicidad todobodypublicidad'>
      <section className="limitetabla containerpubli2 moveratras">
      
        <div className=' moveratras centrar'>
        <h1 className='h1estilos '>Paquetes</h1>
        <table className="table table-dark table-hover moveratras">
            <thead className='moveratras'>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                {/* <th>status</th> */}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
            {Paquetes.map(paquete => (
  <tr key={paquete.ID_PAQUETE} className='moveratras'>
    <td className='moveratras'>{paquete.nombre}</td>
    <td className='moveratras'>{paquete.precio}</td>
    {/* <td>{paquete.status && paquete.status.data && paquete.status.data[0]}</td> */}
    <td className='moveratras'>
      <button className='btn btn-success margen' onClick={() => cambiarstatus(paquete.ID_PAQUETE, paquete.status)}>
        <img className='imagenbutttongrandes' width="30" height="30" src={getIcono(paquete.status)} alt="icono" />
      </button>
      <button className='btn btn-primary margen' onClick={() => funcioneditar(paquete.ID_PAQUETE, paquete.nombre, paquete.precio)}>
        <img className='imagenbutttongrandes' width="30" height="30" src="https://img.icons8.com/ios/50/edit--v1.png" alt="edit--v1" />
      </button>
      <button type='button' className='btn btn-danger margen' onClick={() => funcionEliminar(paquete.ID_PAQUETE)}>
        <img className='imagenbutttongrandes' width="30" height="30" src="https://img.icons8.com/ios/50/delete--v1.png" alt="delete--v1" />
      </button>
    </td>
  </tr>
))}

            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Listapaquetes;
