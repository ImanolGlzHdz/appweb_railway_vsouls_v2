import React, { useEffect, useState } from 'react';
import { Modal, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Wallet } from '@mercadopago/sdk-react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import './stylesnavCliente.css';
import shooping from './img3/car27.png';
import user from './img3/user27.png';
import heart27 from './img3/heart27.png';
import monedas from './img3/monedas2.png';
import eliminar from './img/eliminar.png';
import Modalmenu from './modalmenu';
import { useNavigate } from 'react-router-dom';

export let idUsuarioGlobal = '';

const MenuSocios = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const rolusuario = sessionStorage.getItem('rolusuario');
  const [numeroProductos, setNumeroProductos] = useState(0);
  const [userInfo, setUserInfo] = useState({
    idUsuario: '',
    subsociode: '',
    nombre: '',
    rol: '',
    monedas: '',
  });

  const handleCloseModal = () => setShowModal(false);

  const abrirmodal = async (idProducto) => {
    setShowModal(true);
  };

  const obtenerNumeroProductos = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/carrito/num/${idUsuarioGlobal}`);
      const data = await response.json();

      if (data && data[0] && data[0][0] && data[0][0].contadorproductos) {
        setNumeroProductos(data[0][0].contadorproductos);
      } else {
        // Manejo de error si es necesario
      }
    } catch (error) {
      // console.error('Error al obtener el número de productos:', error);
    }
  };

  const obtenerUsuario = async () => {
    try {
      const ID_CLIENTE = sessionStorage.getItem('socioid');
      idUsuarioGlobal = ID_CLIENTE;

      const response = await fetch(`${import.meta.env.VITE_API}/usuario/${idUsuarioGlobal}`);
      const data = await response.json();

      idUsuarioGlobal = data[0][0].ID_CLIENTE;
      setUserInfo({
        idUsuario: data[0][0].ID_CLIENTE,
        subsociode: data[0][0].SUBSOCIO_DE,
        monedas: data[0][0].MONEDAS,
      });
    } catch (error) {
      // console.error('Error al obtener usuario:', error);
    }
  };

  useEffect(() => {
    obtenerNumeroProductos();
    obtenerUsuario();
    // alert(rolusuario+' ron menu')
    if (rolusuario == 3) {
      // navigate('/socios/inicio')
    } else if (rolusuario == 1) {
      navigate('/admin/validacionventassocios');
    } else {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <>
        <div className='contEnvio'>
          <div className='redes'>
            <a href='#' className='fb'>
              <FaFacebookF />
            </a>
            <a
              href='https://instagram.com/vsou.lsmexico?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr'
              className='insta'
            >
              <FaInstagram />
            </a>
            <a href='#' className='whats'>
              <FaWhatsapp />
            </a>
            <a href='https://www.tiktok.com/@edwinmartinez028?_t=8h3bmLqy1FW&_r=1' className='tik'>
              <FaTiktok />
            </a>
          </div>
          <h1>Envios GRATIS a toda la Republica Mexicana</h1>
        </div>
        <div className='conttop'>
          <img
            src='//vsoulsmx.com/cdn/shop/files/Logo_180x.png?v=1614725898 180w, //vsoulsmx.com/cdn/shop/files/Logo_360x.png?v=1614725898 360w, //vsoulsmx.com/cdn/shop/files/Logo_540x.png?v=1614725898 540w, //vsoulsmx.com/cdn/shop/files/Logo_720x.png?v=1614725898 720w, //vsoulsmx.com/cdn/shop/files/Logo_900x.png?v=1614725898 900w, //vsoulsmx.com/cdn/shop/files/Logo_1080x.png?v=1614725898 1080w, //vsoulsmx.com/cdn/shop/files/Logo_1296x.png?v=1614725898 1296w, //vsoulsmx.com/cdn/shop/files/Logo_1512x.png?v=1614725898 1512w, //vsoulsmx.com/cdn/shop/files/Logo_1728x.png?v=1614725898 1728w, //vsoulsmx.com/cdn/shop/files/Logo_2048x.png?v=1614725898 2048w'
          />
        </div>
        <div className='container-fluid p-0'>
          <Navbar expand='lg' className='navbar-light'>
            <Navbar.Toggle aria-controls='navbarTogglerDemo01' />
            <Navbar.Collapse>
              <Nav className='navbar-nav'>
                <Nav.Link href='/socios/inicio' style={{ textDecoration: 'none' }}>
                  INICIO
                </Nav.Link>
                <Nav.Link href='/socios/paquetes' style={{ textDecoration: 'none' }}>
                  PAQUETES
                </Nav.Link>
                <Nav.Link href='/socios/foro' style={{ textDecoration: 'none' }}>
                  FORO
                </Nav.Link>
                <Nav.Link href='/socios/niveles' style={{ textDecoration: 'none' }}>
                  NIVELES
                </Nav.Link>
                <Nav.Link href='/socios/missocios' style={{ textDecoration: 'none' }}>
                  MIS SOCIOS
                </Nav.Link>
                <Nav.Link href='/socios/estadisticas' style={{ textDecoration: 'none' }}>
                  MIS COMPRAS
                </Nav.Link>
                <Nav.Link href='/socios/catalogo' style={{ textDecoration: 'none' }}>
                  CATALOGO DESCARGABLE
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <div className='d-flex align-items-center'>
              <a className='iconos' href='/socios/favoritos'>
                <img src={heart27} />
              </a>
              <i onClick={abrirmodal}>
                <img width='30' height='30' src={shooping} alt='monedas' />
              </i>
              <div className='content-shopping-cart'>
                <span className='text'>Carrito</span>
                <span className='number bold'>({numeroProductos})</span>
              </div>
              <i>
                <img width='30' height='30' src={monedas} alt='monedas' />
              </i>
              <div className='content-shopping-cart'>
                <span className='text'>Monedas</span>
                <span className='number bold'>(${userInfo.monedas})</span>
              </div>
            </div>
            <a className='iconos' href='/socios/perfil'>
              <img src={user} />
            </a>
          </Navbar>
          <hr />
        </div>
      </>
      <Modalmenu showModal={showModal} handleCloseModal={handleCloseModal} />
    </div>
  );
};

export default MenuSocios;
