import { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar la solicitud GET a la API de roles
        const response = await fetch(`${import.meta.env.VITE_API}/rol`);
        if (!response.ok) {
          throw new Error(`Error de red: ${response.status}`);
        }

        const data = await response.json();
        // Actualizar el estado con los roles obtenidos de la API
        setRoles(data[0]);
      } catch (error) {
        console.error('Error al obtener roles:', error);
      }
      // alert('hola');
    };

    fetchData();
  }, []);  // El segundo argumento [] indica que este efecto se ejecutará solo una vez al montar el componente

  return (
    <>
      <ul>
          {roles.map((rol) => (
            <li key={rol.ID_ROL}>
              <strong>{rol.NOMBRE}</strong>: {rol.DESCRIPCION}
            </li>
          ))}
        </ul>
    </>
  );
}

export default App;