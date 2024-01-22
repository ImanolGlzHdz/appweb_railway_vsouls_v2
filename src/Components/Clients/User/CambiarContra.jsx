import React from 'react';
import Menu from '../../Menu/Menu'
import Footer from '../../Footer/footer'
import { InputGroup, FormControl, Button } from 'react-bootstrap';  
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { MenuPerfil } from './menuPerfil';

export const CambiarContra = () => {

    const [showPassword, setShowPassword] = useState(false);

    const [vCampos, setVCampos] = useState({
        PASSWORD_A: '',
        PASSWORD_N: '',
        PASSWORD_C: ''

    })


    const [idUsuario, setIdUsuario] = useState(0);
    
    // ----------------------- OBTENER CONTRASEÑA --------------------------
    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };


    useEffect(() => {
     
        const userId = sessionStorage.getItem('userId');
        
        setIdUsuario(userId);
      
    }, []);
    
    // --------------------- REGISTRAR -----------------------------------

   


    const handleChange = e => {

        const { name, value } = e.target;
        setVCampos(prevVCampos => ({
          ...prevVCampos,
          [name]: value
        }));

        
    }



    const handleSubmit = () => {
       
        if (vCampos.PASSWORD_A === '' || vCampos.PASSWORD_N === '' || vCampos.PASSWORD_C === '' ) {
            alert('Todos los campos son obligatorios')
            return
        }

        if (vCampos.PASSWORD_N !=  vCampos.PASSWORD_C ) {
            alert('CONFIRMACION DE CONTRASEÑA ERRONEA')
            return
        }

       
        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                ID_USUARIO: idUsuario,
                PASSWORD_A: vCampos.PASSWORD_A,
                PASSWORD_N: vCampos.PASSWORD_N
            })
        }

        fetch(`${import.meta.env.VITE_API}/api/contrasenaUsuario/`, requestInit)
        .then(res => res.text())
        .then(res => {
            alert(res)
            setVCampos(res);
            
          })
          .catch(error => console.error('Error:', error));


     


    }

      

  return (
    <>

<Menu/>

<section className='borde'>
    <div class="row g-3">
        <div class="col-md-11">
            <center><h1 className='misTitulos'>CAMBIAR CONTRASEÑA</h1>
           </center>
        </div>
        <MenuPerfil/>
    </div>
    <br />
<form class="row g-3"  onSubmit={handleSubmit}>
        <div class="container text-center">
            <div class="row">
                <div class="col">
                </div>
                <div class="col">
                    <label for="inputEmail4" class="form-label">Contraseña Anterior</label>
                </div>
                <div class="col">
                <InputGroup className='mb-3'>
                      <FormControl
                        name='PASSWORD_A'
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
                <div class="col">
                </div>
            </div>
            <br />
            <div class="row">
                 <div class="col">
                </div>
                <div class="col">
                    <label for="inputEmail4" class="form-label">Contraseña Nueva</label>
                </div>
                <div class="col">
                <InputGroup className='mb-3'>
                      <FormControl
                        name='PASSWORD_N'
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        className='form-control'
                        required
                      />
                     
                    </InputGroup>
                </div>
                <div class="col">
                   
                </div>
            </div>
<br />
            <div class="row">
                <div class="col">
                </div>
                <div class="col">
                    <label for="inputEmail4" class="form-label">Confirmar Contraseña</label>
                </div>
                <div class="col">
                <InputGroup className='mb-3'>
                      <FormControl
                        name='PASSWORD_C'
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        className='form-control'
                        required
                      />
                    </InputGroup>
                    
                </div>
                <div class="col">
                   
                </div>
            </div>

<br />
            <div class="row">
                <div class="col">
                </div>
                <div class="col">
                </div>
                <div class="col">
                </div>
                <div class="col">
                <button type="submit" className="aceptar">Cambiar</button>
                </div>
            </div>
        </div>
       
</form>    

</section>

<Footer/>
    </>
  )
}


export default CambiarContra;