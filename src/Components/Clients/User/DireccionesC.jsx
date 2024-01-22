import React from 'react';
import Menu from '../../Menu/Menu'
import Footer from '../../Footer/footer'
import './Botones.css'

import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { MenuPerfil } from './menuPerfil';

export const DireccionesC = () => {

    const [direcciones, setDirecciones] = useState([])
    const [direccionesUpdate, setDireccionesUpdate] = useState(false)

    const [totalD, setTotalD] = useState('');



    useEffect(() => {

        const userId = sessionStorage.getItem('userId');
        

        const getDirecciones = () => {
        fetch(`${import.meta.env.VITE_API}/direccion/${userId}`)
        .then(res => res.json())
        .then(data => {
            setDirecciones(data[0]);
          })
          .catch(error => console.error('Error:', error));
      
      }
      getDirecciones()
      setDireccionesUpdate(false)
    }, [])


    useEffect(() => {

        const userId = sessionStorage.getItem('userId');
        

        const getTotalD = () => {
        fetch(`${import.meta.env.VITE_API}/direccion/total/${userId}`)
        .then(res => res.json())
        .then(data => {
            const tot = (data[0][0].TOTAL)
            setTotalD(tot);
          })
          .catch(error => console.error('Error:', error));
      
      }
      getTotalD()
    }, [])


    // --------------------------ELIMINAR USUARIOS -----------------------

  const handleDelete = ( ID_DIRECCION) => {


    // consulta
    const requestInit = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ ID_DIRECCION: ID_DIRECCION })
    }

    fetch(`${import.meta.env.VITE_API}/direccion`, requestInit)
    .then(res => res.text())
    .then(res => {
        setDireccionesUpdate(true);
        alert('Registro Eliminado Con Exito')
        window.location.reload(); 
        
        
      })
      .catch(error => console.error('Error:', error));

  }

  return (
    <>

    <Menu/>

    <section className='borde'>
            <div class="row g-3">
                <div class="col-md-11">
                    <center>
                    <h1 className='misTitulos'>ACTUALIZAR DIRECCIÓN</h1>
                    
                    </center>
                </div>
                <MenuPerfil/>
            </div>
            <br />
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col"></th>
                    <th scope="col">Dirección</th>
                    <th scope="col"></th>
                    {parseInt(totalD, 10) >= 2 ? (
                    <th scope="col"></th>
                    ) : null}
                    </tr>
                </thead>
                <tbody>
                {direcciones.map(direccion => (
                    <tr key={direccion.ID_DIRECCION}>
                    <th className='idTam' scope="row">{direccion.ID_DIRECCION}</th>
                    <td>{direccion.DIRECCION}</td>
                    <td>
                        <Link to={`/ActualizarDireccion/${direccion.ID_DIRECCION}`}>
                            <img width="20" height="20" src="https://img.icons8.com/office/16/edit.png" alt="edit"/>
                        </Link>
                    </td>
                    
                     {parseInt(totalD, 10) >= 2 ? (

                    <td>
                        <button  onClick={() => handleDelete(direccion.ID_DIRECCION)}>
                            <img className='bote' width="20" height="20" src="https://img.icons8.com/color/48/delete.png" alt="delete"/>
                        </button>
                    </td>
                    ) : null}
                    </tr>
                    ))}
                </tbody>
                </table>   

        </section>
   
    <Footer/>

    </>
  )
}


export default DireccionesC;