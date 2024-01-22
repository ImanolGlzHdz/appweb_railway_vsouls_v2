import React, { useEffect, useState } from 'react';
import '../crudpublicidad/publicidadestilos.css';

const Listasocios = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Aquí se realiza la petición GET
    fetch(`${import.meta.env.VITE_API}/usuario/socios`)
      .then(respuesta => respuesta.json())
      .then(data => setProductos(data[0]))
      .catch(error => console.error('Error al obtener productos:', error));
  }, []);

  return (
    <div className='todopublicidad todobodypublicidad'>
      <section className="containerpubli2 moveratras toptabla2">
        <div className='moveratras'>
            <table className="table table-dark text-center table-hover moveratras">
              <thead>
                <tr>
                  <th scope='col'>Nombre de Usuario</th>
                  <th scope='col'>Monedas</th>
                  <th scope='col'>Nivel</th>
                  <th scope='col'>Nombre del Socio</th>
                </tr>
              </thead>
              <tbody className='moveratras'>
                {productos.map((producto, index) => (
                  <tr key={index} className={producto.nombre_socio === 'Socio Principal' ? 'socioprincipal' : ''}>
                    <td className='tamanioletra moveratras'>{producto.NOMBRE_PRINCIPAL}</td>
                    <td className='tamanioletra moveratras'>{producto.MONEDAS}</td>
                    <td className='tamanioletra moveratras'>{producto.ID_NIVEL}</td>
                    <td className='tamanioletra moveratras'>{producto.SUBSOCIODE}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </section>
    </div>
  );
}

export default Listasocios;
