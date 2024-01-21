import React from 'react'
import '../crudpublicidad/publicidadestilos.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap';  // Añade estas importaciones
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';

export const Usuarios_A = () => {

    
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

      const [rol, setRol] = useState([]);

      const [usuarios, setUsuarios] = useState({
        
        CORREO: '',
        PASSWORD: '',
        ROL: 'Selecciona...',
        RFC: '',
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


    const [showPassword, setShowPassword] = useState(false);

    // ----------------------- OBTENER CONTRASEÑA --------------------------
    

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };


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

       // ---------------------------------COMBOS DE ROL -------------------------------
       useEffect(() => {
        const getRol = () => {
          fetch('https://apivsoulsapi8-production.up.railway.app/rol')
          .then(res => res.json())
          .then(data => {
              setRol(data[0]);
            })
            .catch(error => console.error('Error:', error));
        
        }
        getRol()
    }, [])


    // ---------------------------------FIN COMBOS DE ROL -------------------------------

    // --------------------------------- INSERTAR USUARIOS -------------------------------

         
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setUsuarios(usuarios => ({
            ...usuarios,
            ESTADO: selectedState,
            MUNICIPIO: selectedCity,
            [name]: value,
        }));
    }

    const handleChange = e => {

        const { name, value } = e.target;

        
        setUsuarios(prevUsuarios => ({
            ...prevUsuarios,
            [name]: value
        }));


    }


    const handleSubmit = () => {

        if (usuarios.CORREO === '' || usuarios.PASSWORD === '' || usuarios.ROL ==='Selecciona...' || usuarios.RFC === '' || usuarios.NOMBRE === '' || 
        usuarios.APE1 === '' || usuarios.APE2 === '' || usuarios.TELEFONO === '' || usuarios.CP === '' || usuarios.ESTADO === 'Selecciona...' ||
        usuarios.MUNICIPIO === 'Selecciona...' || usuarios.COLONIA === '' || usuarios.CALLE === '' || usuarios.NO_EXTERIOR === '' || 
        usuarios.NO_INTERIOR === '' || usuarios.CALLESUPERIOR === '' || usuarios.CALLEINFERIOR === '' || usuarios.REFERENCIA === '' ) {
            alert('Todos los campos son obligatorios')
            return
        }

        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(usuarios)
        }

        fetch('https://apivsoulsapi8-production.up.railway.app/registroAdmin', requestInit)
        .then(res => res.text())
        .then(res => {
            alert('Usuario Insertado');
            setUsuarios(res);
          })
          .catch(error => console.error('Error:', error));

    }

    // --------------------------------- INSERTAR USUARIOS -------------------------------

      
  return (
    <>
        <div class='limitetabla  moveratras'>
       
        <section class="containerpubli  moveratras">  
        <h1 className='titulomio'>USUARIOS</h1>  
        <div >
        
            <form class="moveratras form" onSubmit={handleSubmit}>
                <div className="moveratras input-box ">
                    <label for="inputEmail4" className='moveratras labelpubli '><h1>Correo</h1></label>
                    <input name="CORREO" onChange={handleChange} type="email" className=' moveratras sizefont inputpubli' id="inputEmail4" required></input>
                </div>
                    
                  <div className="input-box moveratras">
                    <label htmlFor='inputPassword4' className=' moveratras labelpubli'>
                      Password
                    </label>
                    <InputGroup className='mb-3'>
                      <FormControl
                        name='PASSWORD'
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        className='sizefont inputpubli moveratras'
                        id='inputPassword4'
                        required
                      />
                      <Button
                        variant='outline-secondary'
                        onClick={togglePasswordVisibility}
                      >
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                      </Button>
                    </InputGroup>
              </div>
                <div className="input-box moveratras">
                    <label for="inputState" className='labelpubli'>Rol</label>
                    <select onChange={handleSelectChange} id="inputState" class="form-select" name='ROL' required>
                    <option selected>Selecciona...</option>
                    {Array.isArray(rol) && rol.map(ro => (
                    <option
                      key={ro.ID_ROL} value={ro.NOMBRE} >
                        {ro.NOMBRE}
                    </option>
                ))}
                    </select>
                
                
                    <label for="inputEmail4" className='labelpubli'>RFC</label>
                    <input name="RFC" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputEmail4" required></input>
                </div>
                <div className="input-box moveratras">
                    <label for="inputPassword4" className='labelpubli'>Nombre</label>
                    <input name="NOMBRE" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputPassword4" required></input>
                </div>
                <div className="input-box moveratras">
                    <label for="inputAddress" className='labelpubli'>Apellido Paterno</label>
                    <input name="APE1" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputAddress" required></input>
        
                    <label for="inputAddress2" className='labelpubli'>Apellido Materno</label>
                    <input name="APE2" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputAddress2" required></input>
                </div>
                <div className="input-box moveratras">
                    <label for="inputCity" className='labelpubli'>Telefono</label>
                    <input name="TELEFONO" onChange={handleChange} type="tel" className='sizefont inputpubli moveratras' id="inputCity" required></input>
                </div>
                <div className="input-box moveratras">
                    <label for="inputCity" className='labelpubli'>C.P.</label>
                    <input name="CP" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputCity" required></input>
                </div>
                <div className="input-box moveratras">
                    <label for="inputState" className='labelpubli'>Estado</label>
                    <select onChange={handleStateChange} value={selectedState} id="inputState" class="form-select" name='ESTADO' required> 
                    <option selected>Selecciona...</option>
                    {Array.isArray(states) && states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                    </select>
                </div>
                <div className="input-box moveratras">
                    <label for="inputState" className='labelpubli'>Ciudad O Localidad</label>
                    <select onChange={handleCityChange} id="inputState" className='sizefont inputpubli moveratras' name='MUNICIPIO' required>
                    <option  selected>Selecciona...</option>
                    {Array.isArray(cities) && cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                    </select>
                </div>

                <div className="input-box moveratras">
                    <label for="inputCity" className='labelpubli'> Colonia</label>
                    <input name="COLONIA" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputCity" required></input>
                </div>

                <div className="input-box moveratras">
                    <label for="inputCity" className='labelpubli'>Calle</label>
                    <input name="CALLE" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputCity" required></input>
                </div>
                <div className="input-box moveratras">
                    <label for="inputCity" className='labelpubli'>Numero Exterior</label>
                    <input name="NO_EXTERIOR" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputCity" required></input>
                </div>
                <div className="input-box moveratras">
                    <label for="inputCity" className='labelpubli'>Numero Interior</label>
                    <input name="NO_INTERIOR" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputCity" required></input>
                </div>
                <div className="input-box moveratras">
                    <label for="inputCity" className='labelpubli'>Calle Superior</label>
                    <input name="CALLESUPERIOR" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputCity" required></input>
                </div>
                <div className="input-box moveratras">
                    <label for="inputCity" className='labelpubli'>Calle Inferior</label>
                    <input name="CALLEINFERIOR" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputCity" required></input>
                </div>
                <div className="input-box moveratras">
                    <label for="inputCity" className='moveratras labelpubli'>Referencia</label>
                    <input name="REFERENCIA" onChange={handleChange} type="text" className='moveratras sizefont inputpubli moveratras' id="inputCity" required></input>
                </div>
                
                <div className="input-box moveratras">
                    <button type='submit' class='moveratras butonpubli sizefont'>REGISTRAR</button>
                </div>
            </form>
            
                </div>
                </section>
        </div>

    </>
  )
}

export default Usuarios_A;