import React, { useEffect, useState } from 'react';
import '../crudpublicidad/publicidadestilos.css';
import { useNavigate } from "react-router-dom";

export let idnivel = "";
export let nombre_nivel1 = "";
export let limite_nivel1 = "";
export let comision1 = "";

const Listaniveles = () => {
  const [Niveles, setNiveles] = useState([]);
  let navigate = useNavigate();

  const funcionEliminar = (id) => {
    // Realiza una petición DELETE a la URL con el ID
    fetch(`https://apivsoulsapi8-production.up.railway.app/niveles/${id}`, {
      // Especifica que es del método DELETE
      method: "DELETE"
    })
      .then(() => {
        // Aquí se actualiza la lista de niveles ahora solo mostrando los que no 
        // coinciden con el ID del nivel eliminado
        const updatedNiveles = Niveles.filter(nivel => nivel.id_nivel !== id);
        setNiveles(updatedNiveles);
      })
      .catch(error => console.error('Error al eliminar:', error));
  }

  const funcioneditar = (idr, nombre, limite, comisions) => {
    idnivel = idr;
    nombre_nivel1 = nombre;
    limite_nivel1 = limite;
    comision1 = comisions
    navigate('/menuniveleseditar');
  }

  useEffect(() => {
    // Aquí se realiza la petición GET
    fetch("https://apivsoulsapi8-production.up.railway.app/niveles")
      .then(respuesta => respuesta.json())
      .then(data => setNiveles(data[0]))
      .catch(error => console.error('Error al obtener niveles:', error));
  }, []);

  return (
    <div className='todopublicidad todobodypublicidad '>
      <section className="containerpubli2 moveratras limitetabla ">
        <div className=' moveratras '>
          <table className="table table-dark table-hover moveratras">
            <thead>
              <tr>
                <th scope="col">Nivel</th>
                <th scope="col">Limite inferior</th>
                <th scope="col">Limite superior</th>
                <th scope="col">Comision por compra en puntos</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody className='moveratras'>
              {Niveles.map(nivel => (
                <tr className='moveratras' key={nivel.id_nivel}>
                  <td className='moveratras'>{nivel.nombre_nivel}</td>
                  <td className='moveratras'>{nivel.limite_inferior}</td>
                  <td className='moveratras'>{nivel.limite_superior}</td>
                  <td className='moveratras'>{nivel.comisionpuntos}</td>
                  <td className='moveratras'>
                    <button className='btn btn-primary margen' onClick={() => funcioneditar(nivel.id_nivel, nivel.nombre_nivel, nivel.limite_superior, nivel.comisionpuntos)}>
                      <img className='imagenbutttongrandes' width="30" height="30" src="https://img.icons8.com/ios/50/edit--v1.png" alt="edit--v1" />
                    </button>
                    <button className='btn btn-danger margen' onClick={() => funcionEliminar(nivel.id_nivel)}>
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

export default Listaniveles;
