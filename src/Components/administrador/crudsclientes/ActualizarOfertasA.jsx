import React from 'react';
import '../crudpublicidad/publicidadestilos.css';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import Menumonedas from '../menuadministrador/menudenavegacion/ofertas/ofertas'

export const ActualizarOfertasA = () => {

    const { id } = useParams();
    console.log(id);

    const [prod1, setProd] = useState([]);

    const [ofertasU, setOfertasU] = useState({
        ID_OFERTA: '',
        NOMBRE_OFERTA: '',
        NOMBRE_P: '',
        PORCENTAJE_DE_OFERTA: 0,
        FECHA_INICIO: '',
        FECHA_FIN: ''
    });

    useEffect(() => {
        const getProd = () => {
          fetch('https://apivsoulsapi8-production.up.railway.app/cmbProd')
          .then(res => res.json())
          .then(data => {
              setProd(data);
            })
            .catch(error => console.error('Error:', error));
        
        }
        getProd()
    }, [])
    

     useEffect(() => {
        const getOfertas = async () => {
            try {
                const response = await fetch(`https://apivsoulsapi8-production.up.railway.app/mostrarOferta/${id}`);
                const data = await response.json();
                setOfertasU(data[0]);
            } catch (error) {
                console.error('Error:', error);
               
            }
        }

        getOfertas();
    }, []);

    const handleSelectChange = (e) => {
        const { value } = e.target;
        setOfertasU(oferta => ({
            ...oferta,
            NOMBRE_P: value
        }));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        const parsedValue = name === 'PORCENTAJE_DE_OFERTA' ? parseInt(value, 10) : value;
        console.log(parsedValue);

        
        setOfertasU(prevOfertasU => ({
            ...prevOfertasU,
            [name]: parsedValue
        }));

        
    }
    

    const handleUpdate= (e) => {
        e.preventDefault();
       let por = parseInt(ofertasU.PORCENTAJE_DE_OFERTA, 10)

        if (ofertasU.NOMBRE_OFERTA === '' || ofertasU.NOMBRE_P === ''|| por <= 0 || ofertasU.FECHA_INICIO === '' || ofertasU.FECHA_FIN === '' ) {
            alert('Todos los campos son obligatorios')
           
        }

        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(ofertasU)
        }

        fetch('https://apivsoulsa}pi8-production.up.railway.app/ofertaA', requestInit)
        .then(res => res.text())
        .then(res => {
            alert('Datos Actualizados');
          })
          .catch(error => console.error('Error:', error));

    }



  return (
    <>
    <Menumonedas></Menumonedas>
    
    <div class='todopublicidad todobodypublicidad'>

    <div class='limitetabla moveratras'>
    
        <section class="containerpubli"> 
        <h1 className='titulomio'>ACTUALIZAR OFERTAS</h1>     
        <div >

        <form class="form" onSubmit={handleUpdate}>
            <div className="input-box moveratras">
                <label for="inputEmail4" className='labelpubli'>NOMBRE OFERTA</label>
                <input value={ofertasU?.NOMBRE_OFERTA || ''} name="NOMBRE_OFERTA" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' required/>
            </div>
            <div className="input-box moveratras">
                <label for="inputState" className='labelpubli'>NOMBRE DEL PRODUCTO</label>
                <select onChange={handleSelectChange} id="inputState" class="form-select" required>
                <option value={ofertasU?.NOMBRE_P} selected>{ofertasU?.NOMBRE_P }</option>
                {console.log(prod1)}
                {Array.isArray(prod1) && prod1.map(prod => (
                    <option
                      key={prod?.CLAVE_P} value={prod?.NOMBRE_P} >
                        {prod?.NOMBRE_P}
                    </option>
                ))}
                </select>
            </div>
            <div className="input-box moveratras">
                <label for="inputPassword4" className='labelpubli'></label>PORCENTAJE
                <input value={ofertasU?.PORCENTAJE_DE_OFERTA || ''} name="PORCENTAJE_DE_OFERTA" onChange={handleChange} type="number" className='sizefont inputpubli moveratras'  required/>
            </div>
            <div className="input-box moveratras">
                <label for="inputAddress" className='labelpubli'>FECHA DE INICIO</label>
                <input value={ofertasU?.FECHA_INICIO || ''} name="FECHA_INICIO" onChange={handleChange} type="date" className='sizefont inputpubli moveratras'  required/>
    
                <label for="inputAddress2" className='labelpubli'>FECHA DE FIN</label>
                <input value={ofertasU?.FECHA_FIN || ''} name="FECHA_FIN" onChange={handleChange} type="date" className='sizefont inputpubli moveratras'  required/>
            </div>
          
            
            <div className="input-box moveratras">
                <button class='butonpubli sizefont'>ACTUALIZAR</button>
            </div>
        </form>
        
            </div>
            </section>
        </div>

        </div>
    </>
  )
}

export default ActualizarOfertasA