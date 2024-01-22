import React from 'react';
import '../crudpublicidad/publicidadestilos.css';
import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';

export const MostrarOfertasA = () => {

    const [ofertaUpdate, setOfertaUpdate] = useState(false)


    const [ofertas, setOfertas] = useState([])

    useEffect(() => {
      const getOfertas = () => {
        fetch(`${import.meta.env.VITE_API}/ofertaA`)
        .then(res => res.json())
        .then(data => {
            setOfertas(data[0]);
          })
          .catch(error => console.error('Error:', error));
      
      }
      getOfertas()
      setOfertaUpdate(false)
    }, [ofertaUpdate])


    const handleDelete = ID_OFERTA => {


        const requestInit = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ ID_OFERTA: ID_OFERTA })
        }

        fetch(`${import.meta.env.VITE_API}/ofertaA`, requestInit)
        .then(res => res.text())
        .then(res => {
            setOfertaUpdate(true);
            
          })
          .catch(error => console.error('Error:', error));

    }
    



  return (
    <>
    
    
    <div class='limitetabla moveratras mx-auto'>
       
        <section className="containerpubli2 moveratras limitetabla  mx-auto"> 
        <h1 className='titulomio'>OFERTAS</h1>     
        <div class='moveratras'>
            <br />
        <table className="table table-dark table-hover moveratras">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NOMBRE OFERTA</th>
                    <th scope="col">PRODUCTO</th>
                    <th scope="col">PORCENTAJE</th>
                    <th scope="col">PRECIO ORIGINAL</th>
                    <th scope="col">PRECIO CON DESCUENTO</th>
                    <th scope="col">FECHA DE INICIO</th>
                    <th scope="col">FECHA DE FIN</th>
                    <th scope="col"></th>
                    <th scope="col"></th>

                    </tr>
                </thead>
                <tbody className='moveratras'>
                    {ofertas.map(oferta => (
                        <tr className='moveratras' key={oferta.ID_OFERTA}>
                            <th className='moveratras' scope="row">{oferta.ID_OFERTA}</th>
                            <td className='moveratras'>{oferta.NOMBRE_OFERTA}</td>
                            <td className='moveratras' >{oferta.NOMBRE_P}</td>
                            <td className='moveratras' >{oferta.PORCENTAJE}</td>
                            <td className='moveratras'>{oferta.PRECIO_P}</td>
                            <td className='moveratras'>{oferta.PRECIO_D}</td>
                            <td className='moveratras' >{new Date(oferta.FECHA_INICIO).toLocaleDateString()}</td>
                            <td className='moveratras' >{new Date(oferta.FECHA_FIN).toLocaleDateString()}</td>
                            <td className='moveratras' >
                                <Link to={`/ActualizarOfertasAdministrador/${oferta.ID_OFERTA}`}>
                                <button className='btn btn-primary margen'>
                                    <img className='imagenbutttongrandes' width="30" height="30" src="https://img.icons8.com/ios/50/edit--v1.png" alt="edit--v1" />
                                </button> 
                    </Link>
                            </td>
                            <td className='moveratras'>
                                <button className='btn btn-danger margen'  onClick={() => handleDelete(oferta.ID_OFERTA)}>
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


export default MostrarOfertasA