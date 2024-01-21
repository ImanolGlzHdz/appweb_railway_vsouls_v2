import React from 'react';
import '../crudpublicidad/publicidadestilos.css';
import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';

export const Comisiones = () => {

    const [comisiones, setComisiones] = useState([])


    const [fechaInicio, setFechaInicio] = useState(getCurrentDate());
    const [fechaFin, setFechaFin] = useState(getCurrentDate());


     function getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();

      month = month < 10 ? `0${month}` : month;
      day = day < 10 ? `0${day}` : day;

      return `${year}-${month}-${day}`;
  }

    

    useEffect(() => {
      const fetchComisiones= async () => {
          const requestInit = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                P_FECHA_INICIO: fechaInicio, P_FECHA_FIN: fechaFin
              }),
          };

          try {
              const response = await fetch('https://apivsoulsapi8-production.up.railway.app/vendedor/ComisionesG', requestInit);

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


  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'P_FECHA_INICIO') {
        setFechaInicio(value);
    } else if (name === 'P_FECHA_FIN') {
        setFechaFin(value);
    }
};

    

  return (
    <>
    
    
    <div class='limitetabla moveratras'>
        
        <section className=" moveratras containerpubli2 moveratras limitetabla "> 
        <h1 className='titulomio'>CANTIDAD DE VENTAS POR VENDEDOR </h1>     
        <div className=' moveratras '><br />

        <div className="moveratras col-md-4 ">
                <label for="inputAddress" className='moveratras labelpubli'>FECHA DE INICIO</label>
                <input  name="P_FECHA_INICIO" value={fechaInicio}  onChange={handleDateChange} type="date" className='sizefont inputpubli moveratras' id="inputAddress" required/>

            </div>
            <div class="col-md-4 moveratras" >
    
                <label for="inputAddress2" className='moveratras labelpubli'>FECHA DE FIN</label>
                <input name="P_FECHA_FIN" value={fechaFin} onChange={handleDateChange}  type="date" className='sizefont inputpubli moveratras' id="inputAddress2" required/>
            </div>

           
            <br />
        <table className="table table-dark table-hover moveratras">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">VENDEDOR</th>
                    <th scope="col">NO. VENTAS</th>
                    <th scope="col"></th>

                    </tr>
                </thead>
                <tbody className='moveratras'>
                    {comisiones.map(comision => (
                        <tr className='moveratras' key={comision.ID_CLIENTE}>
                            <th className='moveratras' scope="row">{comision.ID_CLIENTE}</th>
                            <td className='moveratras' >{comision.NOMBRE}</td>
                            <td className='moveratras' >{comision.NumComisiones}</td>
                            <td className='moveratras' >
                                <Link to={`/DetallesComision/${comision.ID_CLIENTE}/${fechaInicio}/${fechaFin}`}>
                                <button className='btn btn-outline-info' >Detalles</button>
                                </Link>
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


export default Comisiones