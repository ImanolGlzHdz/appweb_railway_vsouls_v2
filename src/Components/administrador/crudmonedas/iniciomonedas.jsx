import React, { useEffect, useState } from 'react';
import '../crudpublicidad/publicidadestilos.css';

const InicioMonedas = () => {
  const [Monedas, setMonedas] = useState([]);
  const [nuevoIntercambio, setNuevoIntercambio] = useState('');
  const [nuevoIntercambioPuntos, setNuevoIntercambioPuntos] = useState('');
  const [nuevoIntercambioSocios, setNuevoIntercambioSocios] = useState('');

  useEffect(() => {
    // Aquí se realiza la petición GET
    fetch("https://apivsoulsapi8-production.up.railway.app/monedas")
      .then(respuesta => respuesta.json())
      .then(data => setMonedas(data))
      .catch(error => console.error('Error al obtener intercambio:', error));
  }, []);

  // Asignar valores a las variables según el índice del array
  useEffect(() => {
    if (Monedas.length > 0) {
      setNuevoIntercambio(Monedas[0].IMTERCAMBIOMONEDA);
      setNuevoIntercambioPuntos(Monedas[1].IMTERCAMBIOMONEDA);
      setNuevoIntercambioSocios(Monedas[2].IMTERCAMBIOMONEDA);
  
      // alert(nuevoIntercambio + nuevoIntercambioSocios);
    }
  }, [Monedas]);
  

  const handleActualizarIntercambio = () => {
    // Realiza la petición PUT para actualizar el intercambio en la API
    fetch("https://apivsoulsapi8-production.up.railway.app/monedas", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ intercambio: nuevoIntercambio }),
    })
      .then(respuesta => respuesta.json())
      .then(data => {
        console.log('Intercambio actualizado:', data);
        // Utiliza la función de estado para asegurarte de tener el estado más reciente
        setMonedas(data);
        setNuevoIntercambio('');
        window.location.reload(); // Limpiar el valor después de la actualización
      })
      .catch(error => console.error('Error al actualizar intercambio:', error));
  };


  const handleActualizarpuntos = () => {
    // Realiza la petición PUT para actualizar el intercambio en la API
    fetch("https://apivsoulsapi8-production.up.railway.app/puntos/productos", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ intercambio: nuevoIntercambioPuntos }),
    })
      .then(respuesta => respuesta.json())
      .then(data => {
        console.log('Intercambio actualizado:', data);
        // Utiliza la función de estado para asegurarte de tener el estado más reciente
        setMonedas(data);
        setNuevoIntercambio('');
        window.location.reload(); // Limpiar el valor después de la actualización
      })
      .catch(error => console.error('Error al actualizar intercambio:', error));
  };

  const handleActualizarporcentaje = () => {
    // Realiza la petición PUT para actualizar el intercambio en la API
    fetch("https://apivsoulsapi8-production.up.railway.app/puntos/socios", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ intercambio: nuevoIntercambioSocios }),
    })
      .then(respuesta => respuesta.json())
      .then(data => {
        console.log('Intercambio actualizado:', data);
        // Utiliza la función de estado para asegurarte de tener el estado más reciente
        setMonedas(data);
        setNuevoIntercambio('');
        window.location.reload(); // Limpiar el valor después de la actualización
      })
      .catch(error => console.error('Error al actualizar intercambio:', error));
  };




  return (
    <div className='todopublicidad todobodypublicidad '>
      <section className="containerpubli limitetabla limitemonedas">      
        <div className='headerpubli'>MONEDAS</div>
        <form action="#" className="form">
        <div>
            <h3>Intercambio de ${nuevoIntercambio} por 500 monedas</h3>
          </div>
          <div className="input-box moveratras">
            <label className='labelpubli'>Intercambio nuevo</label>
            <input
              className='sizefont inputpubli moveratras'
              type="text"
              placeholder="Ingresa el nuevo intercambio"
              value={nuevoIntercambio}
              onChange={(e) => setNuevoIntercambio(e.target.value)}
              required
            />
          </div>
          <button className='sizefont butonpubli' onClick={handleActualizarIntercambio}>
            Actualizar
          </button>
        </form>
      </section>


      <section className="containerpubli limitetabla">      
        <div className='headerpubli'>PORCENTAJE</div>
        <form action="#" className="form">
        <div>
            <h3>Intercambio de {nuevoIntercambioSocios}% de puntos dados al socio inicial</h3>
          </div>
          <div className="input-box moveratras">
            <label className='labelpubli'>Porcentaje de puntos dados al socio principal</label>
            <input
              className='sizefont inputpubli moveratras'
              type="text"
              placeholder="Ingresa el nuevo intercambio"
              value={nuevoIntercambioSocios}
              onChange={(e) => setNuevoIntercambioSocios(e.target.value)}
              required
            />
          </div>
          <button className='sizefont butonpubli' onClick={handleActualizarporcentaje}>
            Actualizar
          </button>
        </form>
      </section>
    </div>
  );
}

export default InicioMonedas;
