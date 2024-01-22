import React from 'react';
import '../crudpublicidad/publicidadestilos.css';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import Menu1 from '../menuadministrador/menudenavegacion/comisiones/comisiones'

export const DetallesComisiones = () => {

    const { ID_CLIENTE,  fechaInicio , fechaFin } = useParams();

    const [comisiones, setComisiones] = useState([])

    useEffect(() => {
      const fetchComisiones= async () => {
          const requestInit = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                P_ID_CLIENTE: ID_CLIENTE, 
                P_FECHA_INICIO: fechaInicio,
                P_FECHA_FIN: fechaFin
              }),
          };

          try {
              const response = await fetch(`${import.meta.env.VITE_API}/vendedor/ID/`, requestInit);

              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const data = await response.json();
              setComisiones(data[0]);
              
              
          } catch (error) {
              console.error('Error:', error);
          }
      };

      fetchComisiones();
  }, [fechaInicio, fechaFin]);


  return (
    <>
    <Menu1/>
    
    <div class='todopublicidad todobodypublicidad'>
        <div class='menudepublidad'>
           
        </div>
        <section className="containerpubli2 moveratras limitetabla "> 
        <h1 className='titulomio'>CANTIDAD DE VENTAS  </h1>     
        <div className=' moveratras '><br />
           <br />
        <table className="table table-dark table-hover moveratras">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">VENDEDOR</th>
                    <th scope="col">NO. VENTA</th>
                    <th scope="col">PRODUCTO</th>
                    <th scope="col">CANTIDAD</th>
                    <th scope="col">FECHA</th>

                    </tr>
                </thead>
                <tbody className='moveratras'>
                    {comisiones.map(comision => (
                        <tr className='moveratras' key={comision.ID_COMISION}>
                            <th className='moveratras' scope="row">{comision.ID_COMISION}</th>
                            <td className='moveratras' >{comision.NOMBRE}</td>
                            <td className='moveratras' >{comision.ID_VENTA}</td>
                            <td className='moveratras' >{comision.NOMBRE_P}</td>
                            <td className='moveratras' >{comision.CANTIDAD}</td>
                            <td className='moveratras' >{new Date(comision.FECHA_VENTA).toLocaleDateString()}</td>
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


export default DetallesComisiones