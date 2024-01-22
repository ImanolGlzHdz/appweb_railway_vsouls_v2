import React from 'react';
import '../css/publicidadestilos.css';
import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';

export const MostrarRolA = () => {

    const [rolUpdate, setRolUpdate] = useState(false)


    const [roles, setRoles] = useState([])

    useEffect(() => {
      const getRoles = () => {
        fetch(`${import.meta.env.VITE_API}/rol`)
        .then(res => res.json())
        .then(data => {
            setRoles(data[0]);
          })
          .catch(error => console.error('Error:', error));
      
      }
      getRoles()
      setRolUpdate(false)
    }, [rolUpdate])


    const handleDelete = ID_ROL => {

        const requestInit = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ ID_ROL: ID_ROL })
        }

        fetch(`${import.meta.env.VITE_API}/rol`, requestInit)
        .then(res => res.text())
        .then(res => {
            setRolUpdate(true);
            
          })
          .catch(error => console.error('Error:', error));

    }
    



  return (
    <>
    
    <div class='todopublicidad todobodypublicidad'>
        <div class='menudepublidad'>
        </div>
        <section className="containerpubli2 moveratras limitetabla ">     
        <header class='headerpubli'>ROL</header> 
        <div className=' moveratras '>
        <table className="table table-dark table-hover moveratras">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NOMBRE</th>
                    <th scope="col">DESCRIPCION</th>
                    <th scope="col"></th>
                    <th scope="col"></th>

                    </tr>
                </thead>
                <tbody className='moveratras'>
                    {roles.map(rol => (

                        <tr className='moveratras' key={rol.ID_ROL}>
                            <th className='moveratras' scope="row"> {rol.ID_ROL} </th>
                            <td className='moveratras' > {rol.NOMBRE} </td>
                            <td className='moveratras' > {rol.DESCRIPCION} </td>
                            <td className='moveratras'>
                                <Link to={`/RolActualizar/${rol.ID_ROL}`}>
                                    <button className='btn btn-primary margen' >
                                        <img className='imagenbutttongrandes' width="30" height="30" src="https://img.icons8.com/ios/50/edit--v1.png" alt="edit--v1" />
                                    </button>
                                 </Link>
                            </td>
                            <td className='moveratras'>
                                <button className='btn btn-danger margen' onClick={() => handleDelete(rol.ID_ROL)} >
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

export default MostrarRolA;