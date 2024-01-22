import React, { useEffect, useState } from 'react';
import './foro.css';
// import Menu, { idUsuarioGlobal } from '../Menu/menusocios';
var idUsuarioGlobal= sessionStorage.getItem('socioid'); 
const Foro = () => {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
 

  const fetchMensajes = () => {
    // Verifica si idUsuarioGlobal existe
    // alert(idUsuarioGlobal)
    if (idUsuarioGlobal) {
      fetch(`${import.meta.env.VITE_API}/mensajes/${idUsuarioGlobal}`)
        .then((respuesta) => respuesta.json())
        .then((data) => {
          if (Array.isArray(data[0])) {
            setMensajes(data[0]);

          }
        })
        .catch((error) => console.error('Error al obtener mensajes:', error));
    } else {
      // // console.error('idUsuarioGlobal no existe. La llamada a la API se ha evitado.');
    }
  };
  
  

  const enviarMensaje = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/mensajes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_usuario: idUsuarioGlobal,
          mensaje: nuevoMensaje,
        }),
      });

      if (response.ok) {
        console.log('Mensaje enviado exitosamente');
        // Actualiza la lista de mensajes después de enviar uno nuevo
        fetchMensajes();
        // Limpia el textarea después de enviar el mensaje
        setNuevoMensaje('');
      } else {
        // console.error('Error al enviar el mensaje:', response.statusText);
      }
    } catch (error) {
      // console.error('Error en la solicitud POST:', error);
    }
  };

  const handleKeyPress = (event) => {
    // Si se presiona Enter y no se está pulsando Shift, envía el mensaje
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Evita el salto de línea en el textarea
      enviarMensaje();
    }
  };

  useEffect(() => {
    // Realiza la primera solicitud al cargar el componente
    fetchMensajes();

    // Configura la actualización periódica cada 60 segundos (ajusta según tus necesidades)
    const intervalId = setInterval(fetchMensajes, 1000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1 className="heading-1-1">FORO</h1>
    <div className='htmlforo bodyforo todoforo'>
      
      <div className="panel-chat-usuarios">
      <div className="panel-chat-header">
        </div>
        <div className="panel-chat-datos">
          <div className="datos-usuario">
            <h5>COMPARTE TU OPINION CON LOS DEMAS SOCIOS</h5>
          </div>
        </div>

<div className="panel-chat-body">
  {mensajes.map((men, index) => (
    <div
      key={men.id_mensaje}
      className={`${
        men.ID_CLIENTE == idUsuarioGlobal ? 'panel-msj-der' : 'panel-msj-izq'
      }`}
    >
      <div className="chat-cuerpo">
        <div className="contenedor-msj2">
          {/* {men.ID_CLIENTE}
          {idUsuarioGlobal} */}
          De: {men.NOMBRE}
        </div>
        <div className="contenedor-msj">
          {men.mensaje}
        </div>
        <div className="contenedor-msj-footer">
          <ul className="botonforoes-footer">
            <li>
              <i className="fas fa-eye"></i>
            </li>
            <li>{men.tiempo_transcurrido}</li>
          </ul>
        </div>
      </div>
    </div>
  ))}
</div>


<div className="panel-chat-footer">
          <textarea
            className="texto-chat"
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            onKeyPress={handleKeyPress}
          ></textarea>
          <div className="botonforoes-ajuntar">
            <button className="botonforo" type="button" onClick={enviarMensaje}>
              <img
                className='imagen1'
                width="35"
                height="35"
                src="https://img.icons8.com/fluency/48/filled-sent.png"
                alt="filled-sent"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Foro;