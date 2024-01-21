import React, { useEffect, useState } from 'react';
import '../publicidadestilos.css';

const Listapublicidad = () => {
  const [Publicidad, setPublicidad] = useState([]);

  // Función para eliminar un elemento de la lista
  const funcionEliminar = (id) => {
    // Realiza una petición DELETE a la URL con el ID
    fetch(`https://apivsoulsapi8-production.up.railway.app/publicidad/delete/${id}`, {
      // Especifica que es del método DELETE
      method: "DELETE"
    })
      .then(() => {
        peticionapi()
        // Aquí se actualiza la lista de publicidad ahora solo mostrando los que no 
        // coinciden con el ID de la publicidad eliminada
        const updatedPublicidad = Publicidad.filter(item => item.id_publicidad !== id);
        setPublicidad(updatedPublicidad);
      })
      .catch(error => console.error('Error al eliminar:', error));
  };

const peticionapi = () =>{
  // Aquí se realiza la petición GET
  fetch("https://apivsoulsapi8-production.up.railway.app/publicidad/get")
  .then(respuesta => respuesta.json())
  .then(data => setPublicidad(data))
  .catch(error => console.error('Error al obtener publicidad:', error));
}

  useEffect(() => {
    peticionapi()
  }, []); // <-- Deja el array de dependencias vacío inicialmente

  return (
    <div className='todopublicidad todobodypublicidad '>
      <section className="containerpubli2 moveratras toptabla">
        <div className='moveratras'>
          <table className="table table-dark text-center table-hover moveratras">
            <thead>
              <tr>
                <th scope='col'>Nombre</th>
                <th scope="col text-center">Imagen</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody className='moveratras'>
              {Publicidad.map(publicidad => (
                <tr key={publicidad}>
                  <td className='tamanioletra moveratras'>{publicidad}</td>
                  <td className='moveratras'><img className='tamanioimagen2 moveratras' src={`https://apivsoulsapi8-production.up.railway.app/publicidad/` + publicidad} alt='...'></img></td>
                  <td className='moveratras'>
                    <button className='btn btn-danger margen moveratras' onClick={() => funcionEliminar(publicidad)}><img className='imagenbutttongrandes' width="30" height="30" src="https://img.icons8.com/ios/50/delete--v1.png" alt="delete--v1" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Listapublicidad;
