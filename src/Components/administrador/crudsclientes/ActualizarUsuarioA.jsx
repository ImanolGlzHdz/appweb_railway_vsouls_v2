import React from 'react';
import '../crudpublicidad/publicidadestilos.css';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import MenuUser from '../menuadministrador/menudenavegacion/usuarios/usuarios'

export const ActualizarUsuarioA = () => {

    const { ID_USUARIO, ID_DIRECCION } = useParams();

  

    const [usuariosU, setUsuariosU] = useState({
        ID_USUARIO: '',
        CORREO: '',
        PASSWORD: '',
        ROL: '',
        RFC: ' ',
        NOMBRE: '',
        APE1: '',
        APE2: '',
        TELEFONO: '',
        ID_DIRECCION: '',
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
    });

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const [selectedRol, setSelectedRol] = useState('');

    const [rol, setRol] = useState([]);

    const [esVisible] = useState(false);

     // ----------------------------------MOSTRAR USUARIOS ID ----------------------

     useEffect(() => {
        const fetchUsuariosU = async () => {
            const requestInit = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ID_USUARIO: ID_USUARIO, ID_DIRECCION: ID_DIRECCION }),
            };
    
            try {
                const response = await fetch('http://localhost:5000/mostrarRegistro', requestInit);
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = await response.json();
                setUsuariosU(data[0][0]);
                setSelectedState(data[0][0].ESTADO || '');
            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        fetchUsuariosU();
    }, []);
    
    useEffect(() => {
        
    }, [usuariosU]);
    
    

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
          fetch('http://localhost:5000/rol')
          .then(res => res.json())
          .then(data => {
              setRol(data[0]);
            })
            .catch(error => console.error('Error:', error));
        
        }
        getRol()
    }, [])

    const handleRolChange = (e) => {
      const { name, value } = e.target;
      setUsuariosU(usuariosU => ({
          ...usuariosU,
          ROL: selectedRol,
          [name]: value,
      }));
    };


    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setUsuariosU(usuariosU => ({
            ...usuariosU,
            ESTADO: selectedState,
            MUNICIPIO: selectedCity,
            ROL: selectedRol,
            [name]: value,
        }));
        
    }

    const handleChange = e => {

        const { name, value } = e.target;
        setUsuariosU(prevUsuarios => ({
            ...prevUsuarios,
            [name]: value
        }));


    }


   // ----------------------------------- ACTUALIZAR USUARIO ------------------------------

   const handleUpdate= () => {
     if (usuariosU.CORREO === '' || usuariosU.PASSWORD === '' || usuariosU.ROL ==='' || usuariosU.NOMBRE === '' || 
     usuariosU.APE1 === '' || usuariosU.APE2 === '' || usuariosU.TELEFONO === '' || usuariosU.CP === '' || usuariosU.ESTADO === 'Selecciona...' ||
     usuariosU.MUNICIPIO === 'Selecciona...'|| usuariosU.COLONIA === '' || usuariosU.CALLE === '' || usuariosU.NO_EXTERIOR === '' || 
     usuariosU.NO_INTERIOR === '' || usuariosU.CALLESUPERIOR === '' || usuariosU.CALLEINFERIOR === '' || usuariosU.REFERENCIA === '' ) {
         alert('Todos los campos son obligatorios')
         return
     }

     const requestInit = {
         method: 'PUT',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(usuariosU)
     }

     fetch('http://localhost:5000/registroAdmin ', requestInit)
     .then(res => res.text())
     .then(res => {
         setUsuariosU(res);
         alert('Datos Actualizados');
       })
       .catch(error => console.error('Error:', error));

 }


  return (
    <>

<MenuUser></MenuUser>

<div class='todopublicidad todobodypublicidad'>
        <div class='limitetabla moveratras'>
        </div>
        <br /><br />
        <section class="containerpubli"> 
        <h1 className='titulomio'>ACTUALIZAR USUARIOS</h1>     
        <div class='divgrande '>

        <form class="form" onSubmit={handleUpdate}>
            
              <div className="input-box moveratras" style={{ display: esVisible ? 'block' : 'none' }}>
                <label for="inputPassword4" className='labelpubli'>ID</label>
                <input value={usuariosU?.ID_USUARIO || ''} name="ID_USUARIO" readOnly type="text" className='sizefont inputpubli moveratras' id="inputPassword4" required></input>
                </div>

                <div className="input-box moveratras">
                    <label for="inputState" className='labelpubli'>Rol</label>
                    <select onChange={handleRolChange} value={usuariosU?.ROL}  class="form-select" name='ROL' required>
                    <option >{usuariosU?.ROL}</option>
                    {Array.isArray(rol) && rol.map(ro => (
                    <option
                      key={ro.ID_ROL} value={ro.NOMBRE} >
                        {ro.NOMBRE}
                    </option>
                ))}
                    </select>
                
                    </div>
            <div className="input-box moveratras">
                <label for="inputPassword4" className='labelpubli'></label>Nombre
                <input value={usuariosU?.NOMBRE || ''} name="NOMBRE" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputPassword4" required></input>
            </div>
            <div className="input-box moveratras">
                <label for="inputAddress" className='labelpubli'>Apellido Paterno</label>
                <input value={usuariosU?.APE1 || ''} name="APE1" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputAddress" required></input>
    
                <label for="inputAddress2" className='labelpubli'>Apellido Materno</label>
                <input value={usuariosU?.APE2 || ''} name="APE2" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputAddress2" required></input>
            </div>
            <div className="input-box moveratras">
                <label for="inputCity" className='labelpubli'>Telefono</label>
                <input value={usuariosU?.TELEFONO || ''} name="TELEFONO" onChange={handleChange} type="tel" className='sizefont inputpubli moveratras' id="inputCity" required></input>
            </div>
            <div className="input-box moveratras" style={{ display: esVisible ? 'block' : 'none' }}>
            <label for="inputPassword4" className='labelpubli'>ID Dirección</label>
                <input value={usuariosU?.ID_DIRECCION || ''} name="ID_DIRECCION" readOnly type="text" className='sizefont inputpubli moveratras' id="inputPassword4" required></input>
            </div>
            <div className="input-box moveratras">
                <label for="inputCity" class="form-label">C.P.</label>
                <input value={usuariosU?.CP || ''} name="CP" onChange={handleChange} type="tel" className='sizefont inputpubli moveratras' id="inputCity" required></input>
            </div>
            <div className="input-box moveratras">
                    <label for="inputState" className='labelpubli'>Estado</label>
                    <select onChange={handleStateChange} value={usuariosU?.ESTADO} id="inputState" class="form-select" name='ESTADO' required> 
                    <option >{usuariosU?.ESTADO}</option>
                    {Array.isArray(states) && states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                    </select>
                </div>
                <div className="input-box moveratras">
                    <label for="inputState" class="form-label">Ciudad O Comunidad</label>
                    <select onChange={handleCityChange} value={usuariosU?.MUNICIPIO} id="inputState" class="form-select" name='MUNICIPIO' required>
                    <option  >{usuariosU?.MUNICIPIO}</option>
                    {Array.isArray(cities) && cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                    </select>
                </div>

            <div className="input-box moveratras">
                <label for="inputCity" className='labelpubli'> Colonia</label>
                <input value={usuariosU?.COLONIA || ''} name="COLONIA" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputCity" required></input>
            </div>

            <div className="input-box moveratras">
                <label for="inputCity" className='labelpubli'>Calle</label>
                <input value={usuariosU?.CALLE || ''} name="CALLE" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputCity" required></input>
            </div>
            <div className="input-box moveratras">
                <label for="inputCity" className='labelpubli'>Numero Exterior</label>
                <input value={usuariosU?.NO_EXTERIOR || ''} name="NO_EXTERIOR" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputCity" required></input>
            </div>
            <div className="input-box moveratras">
                <label for="inputCity" className='labelpubli'>Numero Interior</label>
                <input value={usuariosU?.NO_INTERIOR || ''} name="NO_INTERIOR" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputCity" required></input>
            </div>
            <div className="input-box moveratras">
                <label for="inputCity" className='labelpubli'>Entre Calle</label>
                <input value={usuariosU?.CALLESUPERIOR || ''} name="CALLESUPERIOR" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputCity" required></input>
            </div>
            <div className="input-box moveratras">
                <label for="inputCity" className='labelpubli'>Y calle</label>
                <input value={usuariosU?.CALLEINFERIOR || ''} name="CALLEINFERIOR" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputCity" required></input>
            </div>
            <div className="input-box moveratras">
                <label for="inputCity" className='labelpubli'>Referencia</label>
                <input value={usuariosU?.REFERENCIA || ''} name="REFERENCIA" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' required></input>
            </div>
            
            <div className="input-box moveratras">
                <button type='submit' className='butonpubli sizefont'>ACTUALIZAR</button>
            </div>
        </form>
        
            </div>
            </section>
        </div>

    </>
  )
}

export default ActualizarUsuarioA
