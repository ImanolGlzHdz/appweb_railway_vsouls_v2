import React from 'react';
import '../crudpublicidad/publicidadestilos.css';
import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';

export const MostrarUsuariosA = () => {

const [rolS, setRolS] = useState('TODOS');
const [rol, setRol] = useState([]);
const [usuariosA, setUsuariosA] = useState([]);
const [usuariosUpdate, setUsuariosUpdate] = useState(false)

// ----------------------MOSTRAR ROL --------------------------------
useEffect(() => {
    const getRol = () => {
      fetch('https://apivsoulsapi8-production.up.railway.app/rol')
        .then((res) => res.json())
        .then((data) => {
          setRol(data[0]);
        })
        .catch((error) => console.error('Error:', error));
    };

    getRol();
  }, []);

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setRolS(value);
  };

// -----------------------MOSTRAR USUARIOS ----------------------------
useEffect(() => {
  const fetchUsuarios = async () => {
    const requestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ P_T_ROL: rolS }),
    };

    try {
      const response = await fetch('https://apivsoulsapi8-production.up.railway.app/mostrarUsuarios', requestInit);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUsuariosA(data[0]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchUsuarios();
  setUsuariosUpdate(false)
}, [rolS]);


// --------------------------ELIMINAR USUARIOS -----------------------

  const handleDelete = ( ID_USUARIO, ID_DIRECCION) => {


    // consulta
    const requestInit = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ ID_USUARIO: ID_USUARIO, ID_DIRECCION: ID_DIRECCION })
    }

    fetch('https://apivsoulsapi8-production.up.railway.app/registroAdmin', requestInit)
    .then(res => res.text())
    .then(res => {
        setUsuariosUpdate(true);
        alert('Registro Eliminado Con Exito')
        window.location.reload();
        
      })
      .catch(error => console.error('Error:', error));

  }

  return (
    <>
    
    <div class='limitetabla moveratras'>
        
        <section className="containerpubli2 moveratras  mx-auto "> 
        <h1 className='titulomio'>USUARIOS</h1>
        <div className=' moveratras '>     
            <div  className=" col-md-4 moveratras ">
                <label  for="inputState" className='labelpubli moveratras'>SELECCIONA ROL</label>
                <select className=' moveratras ' onChange={handleSelectChange} id="inputState" class="form-select" name='ROL'>
                <option selected>TODOS</option>
                {Array.isArray(rol) && rol.map(ro => (
                <option
                    key={ro.ID_ROL} value={ro.NOMBRE} >
                    {ro.NOMBRE}
                </option>
            ))}
                </select>
            
            </div><br /> <br />
        <table className="table table2 table-dark table-hover moveratras">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">CORREO</th>
                    <th scope="col">ROL</th>
                    <th scope="col">RFC</th>
                    <th scope="col">NOMBRE</th>
                    <th scope="col">APELLIDO</th>
                    <th scope="col">APELLIDO 2</th>
                    <th scope="col">TELEFONO</th>
                    <th scope="col">ID_DIRECCIÓN</th>
                    <th scope="col">DIRECCIÓN</th>
                    <th scope="col"></th>
                    <th scope="col"></th>

                    </tr>
                </thead>
                <tbody className='moveratras'>
                {usuariosA.map(usuario => (
                    <tr className='moveratras' key={usuario.ID_DIRECCION}>
                    <th className='moveratras' scope="row">{usuario.ID_USUARIO}</th>
                    <td className='moveratras'>{usuario.CORREO}</td>
                    <td className='moveratras' >{usuario.ROL}</td>
                    <td className='moveratras' >{usuario.RFC}</td>
                    <td className='moveratras'>{usuario.NOMBRE}</td>
                    <td className='moveratras'>{usuario.APE1}</td>
                    <td className='moveratras'>{usuario.APE2}</td>
                    <td className='moveratras'>{usuario.TELEFONO}</td>
                    <td className='moveratras'>{usuario.ID_DIRECCION}</td>
                    <td className='moveratras'>{usuario.DIRECCION}</td>
                    <td className='moveratras'>
                        <Link to={`/ActualizarUsuariosAdministrador/${usuario.ID_USUARIO}/${usuario.ID_DIRECCION}`}>
                        <button className='btn btn-primary margen'>
                          <img className='imagenbutttongrandes' width="30" height="30" src="https://img.icons8.com/ios/50/edit--v1.png" alt="edit--v1" />
                        </button>    
                        </Link>
                    </td>
                    <td className='moveratras'>
                        <button className='btn btn-danger margen' onClick={() => handleDelete(usuario.ID_USUARIO, usuario.ID_DIRECCION)}>
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
    
    
    </>
  )
}

export default MostrarUsuariosA;