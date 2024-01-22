import React from 'react'
import './Footer2.css'
import Imagenpago from './img/payment.png'
import { useState, useEffect } from 'react'
import { FaFacebook,FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa'

const Footer = () => {

    const [rolUs, setRolUs] = useState([]);

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
        console.error('Error:', error);
      }

    };

    getRolUs();
  }, []);

  return (
    <div>

<footer className="footer">
                <div className="waves">
                    <div className="wave" id="wave1"></div>
                    <div className="wave" id="wave2"></div>
                    <div className="wave" id="wave3"></div>
                    <div className="wave" id="wave4"></div>
                </div>
                <ul className="social-icon">
                    <li className="social-icon__item"><a className="social-icon__link" href="https://www.facebook.com/profile.php?id=100090623448731&mibextid=ZbWKwL">
                        <FaFacebook/>
                    </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="https://instagram.com/vsou.lsmexico?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr">
                        <FaInstagram/>
                    </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="https://wa.me/message/65PSFVQIIQLKL1">
                        <FaWhatsapp/>
                    </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="https://www.tiktok.com/@edwinmartinez028?_t=8h3bmLqy1FW&_r=1">
                        <FaTiktok/>
                    </a></li>
                </ul>
                {rolUs === null ? null :
                <ul className="menu">
                    <li className="menu__item"><a className="opcionesF" href="/cliente/miPerfil"><h5>Mi cuenta</h5></a></li>
                    <li className="menu__item"><a className="opcionesF" href="/cliente/misCompras"><h5>Historial de Ordenes</h5></a></li>
                    <li className="menu__item"><a className="opcionesF" href="/cliente/favoritos"><h5>Lista de Deseos</h5></a></li>
                    <li className="menu__item"><a className="opcionesF" href="https://wa.me/message/65PSFVQIIQLKL1"><h5>Reembolso</h5></a></li>
                   

                </ul>
                }
                <p>Isidro huarte #53, colonia: Centro, Morelia, Michoacán</p>
            </footer>

    </div>
  )
}

export default Footer