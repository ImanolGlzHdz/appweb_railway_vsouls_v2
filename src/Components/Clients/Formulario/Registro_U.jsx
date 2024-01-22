import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate} from "react-router-dom";
import { useState, useEffect} from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../Footer/footer';

export const Registro_U = () => {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [correo, setCorreo] = useState(0);
    const [usuarioId, setUsuarioId] = useState(''); 
 

    const [registroU, setRegistroU] = useState({
        CORREO: '',
        PASSWORD: '',
        PASSWORD_C: ''
    })

    // ----------------------- OBTENER CONTRASEÑA --------------------------
    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };


    const handleChange = e => {

      const { name, value } = e.target;
        
        setRegistroU(prevRegistro => ({
            ...prevRegistro,
            [name]: value
        }));

      
    }
    

        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                CORREO: registroU.CORREO
            })
        }

        fetch(`${import.meta.env.VITE_API}/cliente/post`, requestInit)
        .then(res => res.json())
        .then(res => {
            setCorreo(res[0][0].CORREO);
            
          })
          .catch(error => console.error('Error:', error));



    const handleSubmit = (event) => {
      event.preventDefault();

      if (registroU.CORREO === '' || registroU.PASSWORD === ''|| registroU.PASSWORD_C === '' ) {
          alert('Todos los campos son obligatorios')
          return
      }

      if ( registroU.PASSWORD != registroU.PASSWORD_C) {
          alert('LA CONFIRMACION DE LA CONTRASEÑA ES ERRONEA')
          return
      }


    if ( parseInt(correo, 10) >= 1) {
      alert('ESE CORREO YA HA SIDO REGISTRADO')
      return
    }

       
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                CORREO: registroU.CORREO,
                PASSWORD: registroU.PASSWORD
            })
        }

        fetch(`${import.meta.env.VITE_API}/api/insertarUsuario`, requestInit)
        .then(res => res.json())
        .then(res => {
            

            let id = res[0][0].ID;
            if (id != undefined){
              setUsuarioId(res[0][0].ID);
             
              
              sessionStorage.setItem('userId', id);
              navigate("/Registro/Info");
          }
            
            
            
          })
          .catch(error => console.error('Error:', error));


    }

  return (
    <>
    
        <br /><br /><br />

        <form className='formularioC' onSubmit={handleSubmit}>
            <h1 className='misTitulos'>REGISTRO</h1>
            <br />
            
            <div class="col-md-4">
                <input name='CORREO' onChange={handleChange} type="email" class="form-control" id="inputEmail4" placeholder="Correo Electronico eje: name@example.com" required></input>
            </div>
            <br />
            <div class="col-md-4">
        
                <InputGroup className='mb-3'>
                      <FormControl
                        placeholder="Contraseña"
                        name='PASSWORD'
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        className='form-control'
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
        <br />
            <div class="col-md-4">
                <InputGroup className='mb-3'>
                      <FormControl
                        placeholder="Confirmar Contraseña"
                        name='PASSWORD_C'
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        className='form-control'
                        required
                      />
                      
                    </InputGroup>
            </div>
           <br />
            <div  className='botonA'>
                
                <button type="submit" className="aceptar">Continuar</button>
                
            </div>
        </form>
        <br /><br /><br />
       <Footer/>
    </>
  )
}

export default Registro_U;
