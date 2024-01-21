import { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET a la API de roles
    fetch(`${import.meta.env.VITE_API}/rol`)
      .then((response) => response.json())
      .then((data) => {
        // Actualizar el estado con los roles obtenidos de la API
        setRoles(data[0]);
      })
      .catch((error) => {
        console.error('Error al obtener roles:', error);
      });
      alert('hola')
  }, []); // El segundo argumento [] indica que este efecto se ejecutará solo una vez al montar el componente

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <h1>{import.meta.env.VITE_API}</h1>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <h2>Roles:</h2>
        <ul>
          {roles.map((rol) => (
            <li key={rol.ID_ROL}>
              <strong>{rol.NOMBRE}</strong>: {rol.DESCRIPCION}
            </li>
          ))}
        </ul>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
