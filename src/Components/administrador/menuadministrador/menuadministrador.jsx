import React, { useEffect } from 'react';
import './menuadmin.css';
import { Link, useNavigate } from 'react-router-dom';
// import  '../crudpublicidad/crudpublicidad';
import {Accordion, AccordionItem, NextUIProvider} from "@nextui-org/react";


function Navbar() {
  const navigate = useNavigate();
  const rolusuario = sessionStorage.getItem('rolusuario');
  useEffect(() => {
    // alert(rolusuario+' ron menu')
    if (rolusuario == 3){
      navigate('/socios/inicio')
    }else if(rolusuario == 1){
      // navigate('/admin/validacionventassocios')
    }else{
      navigate('/')
    }
  }, []);
  // const defaultContent =
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  const handleCerrarSesion = () => {
    // Eliminar el elemento de sessionStorage
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('rol'); 
    sessionStorage.removeItem('socioid'); 
    sessionStorage.removeItem('rolusuario'); 
    navigate('/');
  };
  return (
    <NextUIProvider>

      <div>
        
      <Accordion classname='' >
      <AccordionItem key="1" classname='' variant='plain' aria-label="Clientes" title="Clientes">
     
        <li className='limenu'>
          <Link to='/menusocioslista' className='amenu quitardecoracion'>
            Socios
          </Link>
        </li>
        {/* <li className='limenu'>
          <Link to='/admin/rol' className='amenu quitardecoracion'>
            Rol
          </Link>
        </li> */}
        <li className='limenu'>
          <Link to='/admin/usuarios/registro' className='amenu quitardecoracion'>
            Usuarios
          </Link>
        </li>
        <li className='limenu'>
          <Link to='/admin/chatbot' className='amenu quitardecoracion'>
            Chatbot
          </Link>
        </li> 
        
      </AccordionItem>
      <AccordionItem key="6" classname='' variant='plain' aria-label="Ventas" title="Ventas">
      <li className='limenu'>
          <Link to='/ventas' className='amenu quitardecoracion'>
            Ventas a los socios
          </Link>
        </li>
        <li className='limenu'>
          <Link to='/admin/validacionventas' className='amenu quitardecoracion'>
            Validacion Venta
          </Link>
        </li>
        <li className='limenu'>
          <Link to='/admin/validacionventassocios' className='amenu quitardecoracion'>
            Validacion venta socios
          </Link>
        </li>
        <li className='limenu'>
          <Link to='/admin/historial' className='amenu quitardecoracion'>
            Historial ventas clientes
          </Link>
        </li>
        <li className='limenu'>
          <Link to='/admin/statusventa' className='amenu quitardecoracion'>
            Status Ventas
          </Link>
        </li>
      </AccordionItem>
      <AccordionItem key="2" classname='' variant='plain' aria-label="Productos" title="Productos">
      <li className='limenu'>
          <Link to='/admin/productosadmin' className='amenu quitardecoracion'>
            Productos
          </Link>
        </li>
        <li className='limenu'>
          <Link to='/admin/ofertas' className='amenu quitardecoracion'>
            Ofertas
          </Link>
        </li>
        <li className='limenu'>
          <Link to='/admin/comisionventa' className='amenu quitardecoracion'>
            Comisiones
          </Link>
        </li>
      </AccordionItem>
      
      <AccordionItem key="4" classname='' variant='plain' aria-label="Publicidad" title="Publicidad">
      <li className='limenu'>
          <Link to='/menupublicidadAgregar' className='amenu quitardecoracion'>
            Publicidad
          </Link>
        </li>
        <li className='limenu'>
          <Link to='/admin/carrucel' className='amenu quitardecoracion'>
            Carrusel Clientes
          </Link>
        </li>
      </AccordionItem>
      <AccordionItem key="5" classname='' variant='plain' aria-label="Configuracion" title="Configuracion">
      <li className='limenu'>
          <Link to='/menupaquetesinicio' className='amenu quitardecoracion'>
            Paquetes
          </Link>
        </li>
        <li className='limenu'>
          <Link to='/menunivelesinicio' className='amenu quitardecoracion'>
            Niveles
          </Link>
        </li>
        <li className='limenu'>
          <Link
            to='/menuadminprimeravezcrear'
            className='amenu quitardecoracion'
          >
            Promociones Primera vez
          </Link>
        </li>
        <li className='limenu'>
          <Link to='/menumonedas' className='amenu quitardecoracion'>
            Monedas
          </Link>
        </li>
        <li className='limenu'>
          <Link to='/admin/pdfdes' className='amenu quitardecoracion'>
            catalogo pdf
          </Link>
        </li>
        <li className='limenu' onClick={() => handleCerrarSesion()}>
          <Link to='#' className='amenu quitardecoracion'>
            Cerrar sesión
          </Link>
        </li>
      </AccordionItem>
    </Accordion>
        {/* 
        
        
        
        
       
       
        
       
        
       */}
      </div>
    </NextUIProvider>
  );
}

export default Navbar;
