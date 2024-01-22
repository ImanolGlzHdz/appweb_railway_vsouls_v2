import React, { useState } from 'react'
import {Modal} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Menu from '../../Menu/Menu'
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../Footer/footer'
import './oportunidad.css'
import imagen from './girl.png'



export const Oportunidaddenegocio = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()
  const handleCloseModal = () => setShowModal(false);
  const handleCloseModaltrue = () => setShowModal(true);  
  const [formData, setFormData] = useState({
    CORREO: '',
    PASSWORD: '',
    PASSWORD_C: '',
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  // Dentro de tu componente
const handleSubmit = () => {
  // Verificar y establecer el código de invitación
  const codigoInvitacion = formData.PASSWORD_C.trim() === '' ? '0' : formData.PASSWORD_C;
// alert(``${import.meta.env.VITE_API}/usuario/new/subsocio/${formData.CORREO}/${formData.PASSWORD}/${codigoInvitacion}`)
  // Construir la URL para la solicitud POST
  const apiUrl = `${import.meta.env.VITE_API}/usuario/new/subsocio/${formData.CORREO}/${formData.PASSWORD}/${codigoInvitacion}`;

  // Realizar la solicitud POST
  fetch(apiUrl, {
    method: 'POST',
    // Puedes agregar más configuraciones según tus necesidades (encabezados, cuerpo JSON, etc.)
  })
    .then((response) => response.json())
    .then((data) => {
      // Manejar la respuesta del servidor
      // console.log('Respuesta del servidor:', data);
      alert('Felicidades ahora eres socio')
navigate('/login')
    })
    .catch((error) => {
      alert('recuerda ingresar bien tus datos')
      console.error('Error al realizar la solicitud:', error);
    });
};

  const soycliente = () =>{
    navigate('/login')
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    
    <div>
        <Menu/>
        <header className='sizeheader'>
   
   <div className="content">
     <div className="text-content">
       <div className="text">Hola, ya conoces el modelo de negocio de </div>
       <div className="name">VSOULS</div>
       <div className="job">
         <div className="job">
           <span>Qué esperas a ser parte de </span>
          </div>
          <div className="job">
          <div className="typing-text">
              <span className="one">nuestro </span>
              
            <span className="two">equipo?</span>
              
            </div>
          </div>
       </div>
       <div className="buttons">
   <button onClick={handleCloseModaltrue}>Soy cliente</button>
   <button onClick={() => soycliente()}>Registrarme</button>
   
 </div>
     
     </div>
    
     <div className="girl">
       <img className='imgvsouls' src={imagen} alt=""/>
     </div>
   </div>
  
 </header>
<body>
<div className="content2">
       <div className="text">- Precios especiales por ser socio.</div>
       <div className="text">- Productos con descuento de bienvenida.</div>
       <div className="text">- Oportunidad de crecimiento.</div>
       <div className="text">- Puntos intercambiables.</div>
       <div className="text">- Paquetes con precios especiales.</div>
  </div>
</body>




 {showModal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header classNameName=' header-carrito' >
          <div>
                <h1 classNameName='sizefont'>Oportunidad de negocio</h1>
            </div>
            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleCloseModal} aria-label="Close"></button>
          </Modal.Header>
          <Modal.Body>
          <div class="col-md-12">
                <input name='CORREO' type="email" class="form-control" id="inputEmail4" onChange={handleChange} placeholder="Correo Electronico eje: name@example.com" required></input>
            </div>
            <br />
            <div class="col-md-12">
        
                <InputGroup className='mb-2'>
                      <FormControl
                        placeholder="Contraseña"
                        name='PASSWORD'
                        className='form-control'
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleChange}
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
                        placeholder="Codigo de invitacion"
                        name='PASSWORD_C'
                        className='form-control'
                        onChange={handleChange}
                        required
                        type='text'
                      />
                      
                    </InputGroup>
            </div>
           <br />
          </Modal.Body>
          <Modal.Footer classNameName="d-flex justify-content-between">
           
            <div  classNameName='btn'>
            <button className='buttons2' onClick={handleSubmit}>
                <h4> Finalizar registro</h4>
              </button>

                  </div>
          </Modal.Footer>
        </Modal>
      )}
        <Footer/>
    </div>
  )
}

export default Oportunidaddenegocio