import React, { useEffect, useState } from 'react';
import '../crudpublicidad/publicidadestilos.css';
import { idnivel, nombre_nivel1, limite_nivel1, comision1 } from './listaniveles';
import { useNavigate } from 'react-router-dom';


const InicioNiveles = () => {
  const navigate = useNavigate();
  const [Niveles, setNiveles] = useState(null);
 const [nombreNivel, setNombreNivel] = useState('');
  const [limite, setLimite] = useState('');
  const [comision, setcomision] = useState('');

  useEffect(() => {
    // Aquí se realiza la petición GET
    fetch(`${import.meta.env.VITE_API}/niveles/${idnivel}`)
      .then(respuesta => respuesta.json())
      .then(data => setNiveles(data))
      .catch(error => console.error('Error al obtener niveles:', error));
  setLimite(limite_nivel1)
  setNombreNivel(nombre_nivel1)
  setcomision(comision1)
    }, []);
  
 

  const agregarNivel = () => {
    // console.log("1")
    // Construir el objeto con los datos del nuevo nivel
    const nuevoNivel = {
      nombre_nivel: nombreNivel,
      limite: parseInt(limite, 10),
      comisionpuntos: parseInt(comision, 10) // Convertir a entero
    };
    // console.log("1")
    // Realizar la solicitud POST a la API
    fetch(`${import.meta.env.VITE_API}/niveles/`+idnivel, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(nuevoNivel),
})
  .then(response => {
    console.log('Respuesta del servidor:', response);
    return response.json();
  })
  .then(data => {
    console.log('Nuevo nivel agregado:', data);
    alert('Nivel actualizado')
    navigate('/menuniveleslista');
    setNombreNivel('');
    setLimite('');
    setcomision('')
  })
  .catch(error => console.error('Error al agregar nivel:', error));

  };

  return (
    <div className='todopublicidad todobodypublicidad'>
      <section className="containerpubli">
        <div className='headerpubli'>NIVELES</div>
        <form className="form">
          <div className="input-box moveratras">
            <label className='labelpubli'>NOMBRE</label>
            <input
              className='sizefont inputpubli moveratras'
              type="text"
              placeholder={nombre_nivel1}
              required
              value={nombreNivel}
              onChange={(e) => setNombreNivel(e.target.value)}
            />
          </div>
          <div className="input-box moveratras">
            <label className='labelpubli'>Limite</label>
            <input
              className='sizefont inputpubli moveratras'
              type="text"
              placeholder={limite_nivel1}
              required
              value={limite}
              onChange={(e) => setLimite(e.target.value)}
            />
          </div>
          <div className="input-box moveratras">
            <label className='labelpubli'>Comision por compra en puntos</label>
            <input
              className='sizefont inputpubli moveratras'
              type="text"
              placeholder="Ingresa los puntos por compra"
              required
              value={comision}
              onChange={(e) => setcomision(e.target.value)}
            />
          </div>
          <button type="button" className='butonpubli sizefont' onClick={agregarNivel}>
            Agregar
          </button>
        </form>
      </section>
    </div>
  );
};

export default InicioNiveles;
