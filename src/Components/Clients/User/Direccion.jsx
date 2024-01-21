import React from 'react';
import Menu from '../../Menu/Menu'
import Footer from '../../Footer/footer'
import './Perfil.css'
import './Botones.css'

import { useState, useEffect} from 'react';
import { MenuPerfil } from './menuPerfil';

export const Direccion = () => {

    
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const [id, setId] = useState(0);

    const [direccion, setDireccion] = useState({

        ID_USUARIO: 0,
        CP: '',
        ESTADO: 'Selecciona...',
        MUNICIPIO: 'Selecciona...',
        COLONIA: '',
        CALLE: '',
        NO_EXTERIOR: '',
        NO_INTERIOR: '',
        CALLESUPERIOR: '',
        CALLEINFERIOR: '',
        REFERENCIA: ''
    
    })


    useEffect(() => {
       
        const userId = sessionStorage.getItem('userId');
        console.log(userId);
        setId(userId);

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

// --------------------------------- INSERTAR USUARIOS -------------------------------

    
         
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setDireccion(direccion => ({
            ...direccion,
            ESTADO: selectedState,
            MUNICIPIO: selectedCity,

            [name]: value,
        }));
    }

    const handleChange = e => {

        const { name, value } = e.target;
        
        setDireccion(direccion => ({
            ...direccion,
            ID_USUARIO: id,
            [name]: value
        }));

        

    }


    const handleSubmit = () => {

      

        if ( direccion.CP === '' || direccion.ESTADO === 'Selecciona...' || direccion.MUNICIPIO === 'Selecciona...' || 
        direccion.COLONIA === '' || direccion.CALLE === '' || direccion.NO_EXTERIOR === '' || direccion.NO_INTERIOR === '' 
        || direccion.CALLESUPERIOR === '' || direccion.CALLEINFERIOR === '' || direccion.REFERENCIA === '' ) {
            alert('Todos los campos son obligatorios')
            return
        }

      
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(direccion)
            
        }
        console.log(direccion)

        fetch('https://apivsoulsapi8-production.up.railway.app/direccion', requestInit)
        .then(res => res.text())
        .then(res => {
            alert('Direccion Guardada Correctamente');
            setDireccion(res);
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
                    <h1 className='misTitulos'>AGREGAR DIRECCIÓN</h1>
                    
                    </center>
                </div>
                <MenuPerfil/>
            </div>
            <br />
        <form class="row g-3" onSubmit={handleSubmit}>
            <div class="col-md-6">
                <label for="inputCity" className="form-label negritas"> C.P.</label>
                <input value={direccion.CP|| ''} name="CP" onChange={handleChange} type="text" class="form-control" id="inputCity" required></input>
            </div>
        <div class="col-md-6">
                < label for="inputState" className="form-label negritas">Estado</label>
                    <select onChange={handleStateChange} value={selectedState} id="inputState" class="form-select" name='ESTADO' required> 
                    <option selected>Selecciona...</option>
                    {Array.isArray(states) && states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                    </select>
            </div>
            <div class="col-md-6">
                 <label for="inputState" className="form-label negritas">Ciudad O Localidad</label>
                    <select onChange={handleCityChange} id="inputState" class="form-select" name='MUNICIPIO' required>
                    <option  selected>Selecciona...</option>
                    {Array.isArray(cities) && cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                    </select>
            </div>

            <div class="col-md-6">
                <label for="inputCity" className="form-label negritas"> Colonia</label>
                <input name="COLONIA" onChange={handleChange} type="text" class="form-control" id="inputCity" required></input>
            </div>

            <div class="col-md-6">
                <label for="inputCity" className="form-label negritas">Numero Exterior</label>
                <input  name="NO_EXTERIOR" onChange={handleChange} type="text" class="form-control" id="inputCity" required></input>
            </div>
            <div class="col-md-6">
                <label for="inputCity" className="form-label negritas">Numero Interior</label>
                <input  name="NO_INTERIOR" onChange={handleChange} type="text" class="form-control" id="inputCity" required></input>
            </div><div class="col-md-6">
                <label for="inputCity" className="form-label negritas">Calle</label>
                <input  name="CALLE" onChange={handleChange} type="text" class="form-control" id="inputCity" required></input>
            </div><div class="col-md-6">
                <label for="inputCity" className="form-label negritas">Calle Superior</label>
                <input  name="CALLESUPERIOR" onChange={handleChange} type="text" class="form-control" id="inputCity" required></input>
            </div><div class="col-md-6">
                <label for="inputCity" className="form-label negritas">Calle Inferior</label>
                <input  name="CALLEINFERIOR" onChange={handleChange} type="text" class="form-control" id="inputCity" required></input>
            </div>
            <div class="col-md-6">
                <label for="inputCity" className="form-label negritas">Referencia</label>
                <input name="REFERENCIA" onChange={handleChange} type="text" class="form-control" id="inputCity" required></input>
            </div>
            <br />
            <div class="col-4" className='botonA'>
                
                <button type="submit" className="aceptar">Agregar</button>
                
            </div>
        </form>    

        </section>
    
        <Footer/>

    </>
  )
}


export default Direccion;