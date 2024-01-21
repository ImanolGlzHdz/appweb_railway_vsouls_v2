import React from 'react';

import { Link, useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { MenuPerfil } from './menuPerfil';
import './Botones.css'

import Menu from '../../Menu/Menu'
import Footer from '../../Footer/footer'

export const ActuDireccion = () => {

    const { ID_DIRECCION } = useParams();

    const [direccionU, setDireccionU] = useState({
        ID_DIRECCION: 0,
        CP: '',
        ESTADO: '',
        MUNICIPIO: '',
        COLONIA: '',
        CALLE: '',
        NO_EXTERIOR: '',
        NO_INTERIOR: '',
        CALLESUPERIOR: '',
        CALLEINFERIOR: '',
        REFERENCIA: ''
    });

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');


    // ----------------------------------MOSTRAR USUARIOS ID ----------------------

    useEffect(() => {
        const getDireccion = async () => {
            try {
                const response = await fetch(`https://apivsoulsapi8-production.up.railway.app/direccion/get/${ID_DIRECCION}`);
                const data = await response.json();
             
                setDireccionU(data[0][0]);
            } catch (error) {
                console.error('Error:', error);
               
            }
        }

        getDireccion();
    }, []);
    
    
    // ----------------------- OBTENER LA INFORMACION DE LOS COMBOS DE LA API --------------------------
    


    const apiToken = '50fbf40f-56cd-4c91-9e6d-a50b7025d2c9';

    const apiUrl = `https://api.copomex.com/query/get_estados?token=${apiToken}`;
  
    const obtenerEstados = () => {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.error === false) {
        
            setStates(data.response.estado);
          } else {
            console.error('Error en la respuesta de la API:', data.error_message);
          }
        })
        .catch(error => {
          console.error('Error al obtener estados:', error);
        });
    };
  
    const handleStateChange = (event) => {
      setSelectedState(event.target.value);
      handleSelectChange(event);
    };
  
  
    useEffect(() => {
      obtenerEstados();
    }, []);
  
    const apiUrlMunicipios = `https://api.copomex.com/query/get_municipio_por_estado/${selectedState}?token=${apiToken}`;
  
    const obtenerMunicipios = () => {
      fetch(apiUrlMunicipios)
        .then(response => response.json())
        .then(data => {
          if (data.error === false) {
         
            setCities(data.response.municipios);
          } else {
            console.error('Error en la respuesta de la API:', data.error_message);
          }
        })
        .catch(error => {
          console.error('Error al obtener municipios:', error);
        });
    };
  
    const handleCityChange = (event) => {
      setSelectedCity(event.target.value);
      handleSelectChange(event);
    };
  

    useEffect(() => {
      if (selectedState) {
        obtenerMunicipios();
      }
    }, [selectedState]);

    
       // -----------------------FIN OBTENER LA INFORMACION DE LOS COMBOS DE LA API --------------------------

       // ---------------------------------OBTENER DATOS -------------------------------


       const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setDireccionU(direccionU => ({
            ...direccionU,
            ESTADO: selectedState,
            MUNICIPIO: selectedCity,
  
            [name]: value,
        }));
    }

    const handleChange = e => {

        const { name, value } = e.target;
        setDireccionU(prevDireccionU => ({
            ...prevDireccionU,
            ID_DIRECCION: ID_DIRECCION,
            [name]: value
        }));


    }


    // ----------------------------------- ACTUALIZAR USUARIO ------------------------------

   const handleUpdate= () => {
   
     if (direccionU.CP === '' || direccionU.ESTADO === '' || direccionU.MUNICIPIO === '' || direccionU.COLONIA === '' 
     || direccionU.CALLE === '' || direccionU.NO_EXTERIOR === '' || direccionU.NO_INTERIOR === '' || 
     direccionU.CALLESUPERIOR === '' || direccionU.CALLEINFERIOR === '' || direccionU.REFERENCIA === '' ) {
         alert('Todos los campos son obligatorios')
         return
     }

     const requestInit = {
         method: 'PUT',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(direccionU)
     }

     fetch('https://apivsoulsapi8-production.up.railway.app/direccion ', requestInit)
     .then(res => res.text())
     .then(res => {
         setDireccionU(res);
         alert('Datos Actualizados');
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
        <form class="row g-3" onSubmit={handleUpdate}>
        <div class="col-md-6">
            <label for="inputCity" class="form-label">C.P.</label>
            <input value={direccionU?.CP || ''} name="CP" onChange={handleChange} type="text" class="form-control" id="inputCity" required></input>
        </div>
        <div class="col-md-6">
            <label for="inputState" class="form-label">Estado</label>
            <select onChange={handleStateChange} value={direccionU?.ESTADO} id="inputState" class="form-select" name='ESTADO' required> 
            <option >{direccionU?.ESTADO}</option>
            {Array.isArray(states) && states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
            </select>
        </div>
        <div class="col-md-6">
            <label for="inputState" class="form-label">Ciudad O Comunidad</label>
            <select onChange={handleCityChange} value={direccionU?.MUNICIPIO} id="inputState" class="form-select" name='MUNICIPIO' required>
            <option  >{direccionU?.MUNICIPIO}</option>
            {Array.isArray(cities) && cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
            </select>
        </div>

            <div class="col-md-6">
                <label for="inputCity" class="form-label"> Colonia</label>
                <input value={direccionU?.COLONIA || ''} name="COLONIA" onChange={handleChange} type="text" class="form-control" id="inputCity" required></input>
            </div>
            <div class="col-md-6">
                <label for="inputCity" class="form-label"> Calle</label>
                <input value={direccionU?.CALLE || ''} name="CALLE" onChange={handleChange} type="text" class="form-control" id="inputCity" required></input>
            </div>

            <div class="col-md-6">
                <label for="inputCity" class="form-label">Numero Exterior</label>
                <input value={direccionU?.NO_EXTERIOR || ''} name="NO_EXTERIOR" onChange={handleChange} type="text" class="form-control" id="inputCity" required></input>
            </div>
            <div class="col-md-6">
                <label for="inputCity" class="form-label">Numero Interior</label>
                <input value={direccionU?.NO_INTERIOR || ''} name="NO_INTERIOR" onChange={handleChange} type="text" class="form-control" id="inputCity" required></input>
            </div><div class="col-md-6">
                <label for="inputCity" class="form-label">Calle Superior</label>
                <input value={direccionU?.CALLESUPERIOR || ''} name="CALLESUPERIOR" onChange={handleChange} type="text" class="form-control" id="inputCity" required></input>
            </div><div class="col-md-6">
                <label for="inputCity" class="form-label">Calle Inferior</label>
                <input value={direccionU?.CALLEINFERIOR || ''} name="CALLEINFERIOR" onChange={handleChange} type="text" class="form-control" id="inputCity" required></input>
            </div><div class="col-md-6">
                <label for="inputCity" class="form-label">Referencia</label>
                <input value={direccionU?.REFERENCIA || ''} name="REFERENCIA" onChange={handleChange} type="text" class="form-control" id="inputCity" required></input>
            </div>
            <br />
            <div class="col-4" className='botonA'>
                
                <button type="submit" className="aceptar">Actualizar</button>
                
            </div>
        </form>    

        </section>
    
   

    
    
    <Footer/>
    
    </>


  )
}

export default ActuDireccion;
