import React from 'react'
import { useNavigate} from "react-router-dom";

import { useState, useEffect} from 'react';

import Footer from '../../Footer/footer'


export const Registro_C = () => {

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const navigate = useNavigate();

    const [registroD, setRegistroD] = useState({
        ID_USUARIO: '',
        RFC: ' ',
        NOMBRE: '',
        APE1: '',
        APE2: '',
        TELEFONO: '',
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

    // --------------------------------- INSERTAR USUARIOS -------------------------------

         
    const handleSelectChange = (e) => {
      const { name, value } = e.target;
      setRegistroD(registroD => ({
          ...registroD,
          ESTADO: selectedState,
          MUNICIPIO: selectedCity,

          [name]: value,
      }));
  }

    const handleChange = e => {

        const userId = sessionStorage.getItem('userId');
        
        const { name, value } = e.target;

        
        setRegistroD(prevRegistroD => ({
            ...prevRegistroD,
            ID_USUARIO: userId,
            [name]: value
        }));


    }

    // ----------------INSERTAR REGISTRO -----------------------------------

    
    const handleSubmit = (event) => {
      event.preventDefault();

        if (registroD.NOMBRE === '' || registroD.APE1 === '' || registroD.APE2 === '' || 
        registroD.TELEFONO === '' || registroD.CP === '' || registroD.ESTADO === 'Selecciona...' ||registroD.MUNICIPIO === 'Selecciona...' || 
        registroD.COLONIA === '' || registroD.CALLE === '' || registroD.NO_EXTERIOR === '' || registroD.NO_INTERIOR === '' || 
        registroD.CALLESUPERIOR === '' || registroD.CALLEINFERIOR === '' || registroD.REFERENCIA === '' ) {
            alert('Todos los campos son obligatorios')
            return
        }

        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(registroD)
        }

        fetch('http://localhost:5000/cliente', requestInit)
        .then(res => res.text())
        .then(res => {
            
            alert(res);
            setRegistroD(res);

            if(res == 'Usuario insertado'){
                navigate("/");
            }
          })
          .catch(error => console.error('Error:', error));

    }



  return (
    <>
        
        <section className='borde'>
            <center><h1 className='misTitulos'>REGISTRO DE DATOS PERSONALES</h1></center>
        
            <br /><br />
        <form class="row g-3" onSubmit={handleSubmit}>
            
            <div class="col-6">
                <label for="inputPassword4" className="form-label negritas">Nombre</label>
                <input name='NOMBRE' onChange={handleChange} type="text" class="form-control"  required></input>
            </div>
            <div class="col-6">
                <label for="inputAddress" className="form-label negritas">Apellido Paterno</label>
                <input name='APE1' onChange={handleChange} type="text" class="form-control"  required></input>
            </div>
            <div class="col-6">
                <label for="inputAddress2" className="form-label negritas">Apellido Materno</label>
                <input name='APE2' onChange={handleChange} type="text" class="form-control"  required></input>
            </div>
            <div class="col-md-6">
                <label for="inputCity" className="form-label negritas">Telefono</label>
                <input name='TELEFONO' onChange={handleChange} type="tel" class="form-control"  required></input>
            </div>
            <div class="col-md-6">
                <label for="inputCity" className="form-label negritas">C.P.</label>
                <input name='CP' onChange={handleChange} type="text" class="form-control"  required></input>
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
                <input name='COLONIA' onChange={handleChange} type="text" class="form-control"  required></input>
            </div>
            <div class="col-md-6">
                <label for="inputCity" className="form-label negritas"> Calle</label>
                <input name='CALLE' onChange={handleChange} type="text" class="form-control"  required></input>
            </div>

            <div class="col-md-6">
                <label for="inputCity" className="form-label negritas">Numero Exterior</label>
                <input name='NO_EXTERIOR' onChange={handleChange} type="text" class="form-control"  required></input>
            </div>
            <div class="col-md-6">
                <label for="inputCity" className="form-label negritas">Numero Interior</label>
                <input name='NO_INTERIOR' onChange={handleChange} type="text" class="form-control"  required></input>
            </div>
            <div class="col-md-6">
                <label for="inputCity" className="form-label negritas">Entre Calle</label>
                <input name='CALLESUPERIOR' onChange={handleChange} type="text" class="form-control"  required></input>
            </div>
            <div class="col-md-6">
                <label for="inputCity" className="form-label negritas">Y Calle</label>
                <input name='CALLEINFERIOR' onChange={handleChange} type="text" class="form-control"  required></input>
            </div>
            <div class="col-md-6">
                <label for="inputCity" className="form-label negritas">Referencia</label>
                <input name='REFERENCIA' onChange={handleChange} type="text" class="form-control"  required></input>
            </div>
            
            <div class="col-12" className='botonA'>
                <button type="submit" className="aceptar">Registrarse</button>
            </div>
        </form>    

        </section>

        <Footer/>
    
    </>
  )
}

export default Registro_C;
