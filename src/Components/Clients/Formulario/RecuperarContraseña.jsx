import React from 'react';
import { useState, useEffect} from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';  
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate} from "react-router-dom";

import Footer from '../../Footer/footer'

export const RestablecerContra = () => {


    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [vCampos, setVCampos] = useState({
        CORREO: '',
        TOKEN: '',
        PASSWORD: '',
        PASSWORD_C: ''

    })

    
    // ----------------------- OBTENER CONTRASEÑA --------------------------
    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    
    // --------------------- REGISTRAR -----------------------------------

   


    const handleChange = e => {

        const { name, value } = e.target;
        setVCampos(prevVCampos => ({
          ...prevVCampos,
          [name]: value
        }));
        
    }



    const handleSubmit = (e) => {
     e.preventDefault();

        if (vCampos.CORREO === '' || vCampos.TOKEN === '' || vCampos.PASSWORD === '' || vCampos.PASSWORD_C === '' ) {
            alert('Todos los campos son obligatorios')
            return
        }

        if (vCampos.PASSWORD !=  vCampos.PASSWORD_C ) {
          alert('CONFIRMACION DE CONTRASEÑA ERRONEA')
          return
      }
        

        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              CORREO: vCampos.CORREO,
              TOKEN: vCampos.TOKEN,
              PASSWORD: vCampos.PASSWORD
            })
        }

        fetch(`${import.meta.env.VITE_API}/validarToken`, requestInit)
        .then(res => res.json())
        .then(res => {
            

            if(res[0].R === 'HECHO' ){
              alert('LA CONTRASEÑA SE HA ACTUALIZADO CON EXITO');
              setVCampos(res[0].R);
              navigate("/");
              
            }else {
              
              alert( res[0].R)
              setVCampos(res[0].R);
            }
            
          })
          .catch(error => console.error('Error:', error));

    }

      

  return (
    <>


<section className='borde'>
    <div class="row g-3">
        <div class="col-md-11">
            <center><h1 className='misTitulos'>RECUPERAR CONTRASEÑA </h1>
           </center>
        </div>
    </div>
    <br />
<form class="row g-3"  onSubmit={handleSubmit}>

  <div class="container text-center">
          <br /><br />
                
            <div class="row">
              <div class="col"></div>
                <div class="col">
                  <label for="inputEmail4" class="form-label">Introduce Tu Correo</label>
                </div>
                <div class="col">
                  <input type="email" class="form-control" name='CORREO' onChange={handleChange}  required/>
                </div>
                <div class="col"></div>
            </div>
            <br />
            <div class="row">
              <div class="col"></div>
                <div class="col">
                  <label for="inputEmail4" class="form-label">Introduce Tu Token</label>
                </div>
                <div class="col">
                  <input type="text" class="form-control" name='TOKEN' onChange={handleChange}  required/>
                </div>
                <div class="col"></div>
            </div>
            <br />
            <div class="row">
              <div class="col"></div>
                <div class="col">
                  <label for="inputEmail4" class="form-label">Nueva Contraseña</label>
                </div>
                <div class="col">
                  <InputGroup className='mb-3'>
                      <FormControl
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
                <div class="col"></div>
            </div>
            <br />
            <div class="row">
              <div class="col"></div>
                <div class="col">
                  <label for="inputEmail4" class="form-label">Confirmación de Contraseña</label>
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
                <div class="col"></div>
            </div>
            <br /><br />
            <div class="row">
                
                <div class="col" className='botonA'>
                <button type="submit" class="aceptar">Recuperar</button>
                </div>
            </div>
          
        </div>
       
</form>    

</section>

    <Footer/>

    </>
  )
}

export default RestablecerContra