import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesnavCliente.css';
import shooping from './Img/car27.png';
import lupa from './Img/lupa27.png';
import user from './Img/user27.png';
import heart27 from './Img/heart27.png';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const rolusuario = sessionStorage.getItem('rolusuario');
  const [rolUs, setRolUs] = useState([]);

  const handleSearch = () => {
    navigate(`/cliente/catalogo?search=${searchTerm}`);
  };
  // ------------------------------ MANEJO DE USUARIOS ----------------------------
  useEffect(() => {
    // alert(rolusuario+' ron menu')
    if (rolusuario == 3){
      navigate('/socios/inicio')
    }else if(rolusuario == 1){
      navigate('/admin/validacionventassocios')
    }else{
      // navigate('/')
    }
  }, []);


  useEffect(() => {
    const getRolUs = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        
        const response = await fetch(`${import.meta.env.VITE_API}/rolUsuario/${userId}`);
        const data = await response.json();

        if (Array.isArray(data[0]) && data[0].length > 0) {
          setRolUs(data[0][0].ID_ROL);
          sessionStorage.setItem('rol', data[0][0].ID_ROL)
          
        } else {
          setRolUs(null);
          sessionStorage.setItem('rol', null);

        }
      } catch (error) {
        // console.error('Error:', error);
        // alert(error)
      // setRolUs(null);
      // sessionStorage.setItem('rol', null);
      }

    };

    getRolUs();
  }, []);

  const accederLogin = ()=>{
    navigate("/login")
  }


  return (
    <>
      <div className='contEnvio'>
        <div className="redesSociales">
          <a href="https://www.facebook.com/profile.php?id=100090623448731&mibextid=ZbWKwL" className="red"><FaFacebookF /></a>
          <a href="https://instagram.com/vsou.lsmexico?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr" className="red"><FaInstagram /></a>
          <a href="https://wa.me/message/65PSFVQIIQLKL1" className="red"><FaWhatsapp /></a>
          <a href="https://www.tiktok.com/@edwinmartinez028?_t=8h3bmLqy1FW&_r=1" className="red"><FaTiktok /></a>
        </div>
        <h1 className='textoEnvioGratis'>Envios GRATIS a toda la Republica Mexicana</h1>
      </div>
      <div className='conttop'>
        <img src="//vsoulsmx.com/cdn/shop/files/Logo_180x.png?v=1614725898 180w, //vsoulsmx.com/cdn/shop/files/Logo_360x.png?v=1614725898 360w, //vsoulsmx.com/cdn/shop/files/Logo_540x.png?v=1614725898 540w, //vsoulsmx.com/cdn/shop/files/Logo_720x.png?v=1614725898 720w, //vsoulsmx.com/cdn/shop/files/Logo_900x.png?v=1614725898 900w, //vsoulsmx.com/cdn/shop/files/Logo_1080x.png?v=1614725898 1080w, //vsoulsmx.com/cdn/shop/files/Logo_1296x.png?v=1614725898 1296w, //vsoulsmx.com/cdn/shop/files/Logo_1512x.png?v=1614725898 1512w, //vsoulsmx.com/cdn/shop/files/Logo_1728x.png?v=1614725898 1728w, //vsoulsmx.com/cdn/shop/files/Logo_2048x.png?v=1614725898 2048w" />
      </div>
      <div className="container-fluid contBarra">
        <Navbar expand="lg">
          <Navbar.Toggle aria-controls="navbarTogglerDemo01" />
          <Navbar.Collapse id="navbarTogglerDemo01">
            <Nav className="navbar-nav contOp">
              <Nav.Link href="/" style={{ textDecoration: 'none' }}>
                INICIO
              </Nav.Link>
              <Nav.Link href="/cliente/catalogo" style={{ textDecoration: 'none' }}>
                PRODUCTOS
              </Nav.Link>
              <Nav.Link href="/socios/Oportunidadenegocio" style={{ textDecoration: 'none' }}>
                OPORTUNIDAD DE NEGOCIO
              </Nav.Link>
              {rolUs === null ? null : (
                <Nav.Link href="/cliente/misCompras" style={{ textDecoration: 'none' }}>
                  MIS COMPRAS
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          <div className="d-flex align-items-center">
            <Form className="search-form-menu">
              <FormControl
                type="text"
                placeholder="Buscar producto..."
                name="texto"
                value={searchTerm}
                id="texto"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button className="btn-search" type="button" onClick={handleSearch}>
                <img width="30px" height="30px" src={lupa} alt="" />
              </Button>
            </Form>
            
            {rolUs === null ? null :
              <a className="iconosC" href="/cliente/favoritos">
                <img src={heart27} />
              </a>
            }{rolUs === null ? null :
              <a className="iconosC" href="/cliente/carrito">
                <img src={shooping} />
              </a>
            }
            {rolUs === null ?
              <button className='btnAcceder' onClick={()=>accederLogin()}>
                INGRESAR
              </button>
              :
              <a className="iconosC" href="/cliente/miPerfil">
                <img src={user} />
              </a>
            }
          </div>
        </Navbar>
        <hr />
      </div>
    </>
  )
}

export default Menu