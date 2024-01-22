import React from 'react';
import { useState, useEffect} from 'react';
import Footer from '../../Footer/footer';
import './Botones.css'


export const ObtenerToken = () => {


    const [vCorreo, setVCorreo] = useState({P_CORREO: '' })


    
    // --------------------- REGISTRAR -----------------------------------

   


    const handleChange = e => {

        const { name, value } = e.target;
        setVCorreo(prevVCorreo => ({
          ...prevVCorreo,
          [name]: value
        }));
    }



    const handleSubmit = () => {

        if (vCorreo.P_CORREO === '' ) {
            alert('Todos los campos son obligatorios')
            return
        }

        

        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(vCorreo)
        }

        fetch(`${import.meta.env.VITE_API}/token`, requestInit)
        .then(res => res.json())
        .then(res => {

            if(res[0].R === 'USUARIO INCORRECTO' ){
              alert(res[0].R);
              
            }else {
              
              alert('TU TOKEN ES:\n'  + res[0].R + ' \nRecuerda guardarlo porque lo utilizaras para tu cambio de Contraseña')
              
              setVCorreo(res[0].R);
            }
            
          })
          .catch(error => console.error('Error:', error));




          // ----------------Mandar E-mail----------------------------

          const requestInit1 = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(vCorreo)
        }

        fetch(`${import.meta.env.VITE_API}/correo/enviar-correo`, requestInit1)
        .then(res => res.text())
        .then(res => {
           

              console.log('Correo Enviado')
              setVCorreo(res);
              
            
            
          })
          .catch(error => console.error('Error:', error));

    }

      

  return (
    <>
<br /><br />
<section className='wrapperList'>
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
          <label style={{ textAlign: 'justify' }}>
            <p>¡Hola!</p>
            <p>Si Olvidaste tu contraseña ingresa tu correo electrónico para recibir un token de recuperación, recibirás un mensaje en tu <b>correo electronico </b> con un enlace a la página de cambio de contraseña.</p>
            
          </label>
                  <br />
            <div class="row">
                <div class="col">
                </div>
                <div class="col">
                  <label for="inputEmail4" className="form-label">Introduce tu Correo</label>
                </div>
                <div class="col">
                  <input type="email" className="form-control" name='P_CORREO' onChange={handleChange}  required/>
                </div>
                <div class="col">
                </div>
            </div>
            <br /><br />
            <div class="row">
                <div class="col" className='botonA'>
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

export default ObtenerToken