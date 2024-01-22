import React, { useState } from 'react';
import '../crudpublicidad/publicidadestilos.css';
import { useNavigate } from 'react-router-dom';

const InicioNiveles = () => {
  const [nombreNivel, setNombreNivel] = useState('');
  const [limite, setLimite] = useState('');
  const [comision, setcomision] = useState('');
  const navigate = useNavigate();
  
  const agregarNivel = () => {
   
    // console.log("1")
    // Construir el objeto con los datos del nuevo nivel
    const nuevoNivel = {
      nombre_nivel: nombreNivel,
      limite: parseInt(limite, 10),
      comisionpuntos: parseInt(comision, 10),// Convertir a entero
    };
    // console.log("1")
    // Realizar la solicitud POST a la API
    fetch(`${import.meta.env.VITE_API}/niveles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoNivel),
    })
      .then(response => response.json())
      .then(data => {
        // Manejar la respuesta si es necesario
        console.log('Nuevo nivel agregado:', data);
        alert('Nivel agregado')
        setNombreNivel(''); // <-- Usar setNombreNivel para resetear el estado
        setLimite('');
        setcomision('') // <-- Usar setLimite para resetear el estado
      })
      
      .catch(error => console.error('Error al agregar nivel:', error));
      alert('Nivel agregado')
      navigate('/menuniveleslista')
      
  };

  return (
    <div className='todopublicidad todobodypublicidad'>
      <section className="containerpubli">
        <div className='headerpubli'>NIVELES</div>
        <form className="form">
          <div className="input-box moveratras">
            <label className='labelpubli'>Nombre</label>
            <input
              className='sizefont inputpubli moveratras'
              type="text"
              placeholder="Ingresa el nombre del nivel"
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
              placeholder="Ingresa en pesos el límite del nivel"
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
