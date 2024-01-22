import React from 'react'
import {  useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap'; 
import './Iconorueda.css'


export const MenuPerfil = () => {

    // ------------------------ ELIMINAR SESION ---------------------

    const navigate = useNavigate();


    const handleCerrarSesion = () => {
       sessionStorage.removeItem('userId');
       sessionStorage.removeItem('rol'); 
       sessionStorage.removeItem('socioid'); 
        sessionStorage.removeItem('rolusuario');
       navigate('/');
     };


  return (
    <>

  <div class="col-md-1">
  <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
          <img width="50" height="50" src="https://img.icons8.com/fluency/48/settings.png" alt="settings"/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/cliente/miPerfil">Perfil</Dropdown.Item>
        <Dropdown.Item href="/ActualizarPerfil">Actualizar Datos Personales</Dropdown.Item>
        <Dropdown.Item href="/Direccion">Agregar Otra Dirección</Dropdown.Item>
        <Dropdown.Item href="/Direcciones">Actualizar Dirección</Dropdown.Item>
        <Dropdown.Item href="/CambiarContrasena">Cambiar Contraseña</Dropdown.Item>
        <Dropdown.Item onClick={handleCerrarSesion}>Cerrar Sesión</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>
    
 

    </>
  )
}

export default MenuPerfil;