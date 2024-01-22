import React from 'react';
import { useState, useEffect} from 'react';
import Menu from '../../Menu/Menu'
import Footer from '../../Footer/footer'

import './Link.css'

export const OLink = () => {
    

    
    const [ID_CLIENTE, setID_CLIENTE] = useState('');
    const [link, setLink] = useState('');

    const sendHandle = async (e) => {
        e.preventDefault()
        try {
        const userId = sessionStorage.getItem('userId');
        

        const response = await fetch(`${import.meta.env.VITE_API}/vendedor/get/${userId}`);
        const data = await response.json();
      
        if (data[0] && data[0][0]) {

            const lin = 'http://localhost:3000/login/';
            setLink(`${lin}${String(data[0][0].ID_CLIENTE)}`);
            
            setID_CLIENTE(data[0][0].ID_CLIENTE);

        }
        } catch (error) {
        console.error('Error:', error);
        }
    };


      const copyToClipboard = () => {
        const inputElement = document.createElement('input');
        inputElement.value = link;
        document.body.appendChild(inputElement);
        inputElement.select();
        document.execCommand('copy');
        document.body.removeChild(inputElement);
        alert('Enlace copiado al portapapeles');
      };
      
    
    
   

  return (
    <>

    <Menu/>
        
<section className='borde'>
    <div class="rowL g-3">
        <div class="col-md-11">
            <center><h1 className='misTitulos'>OBTENER MI LINK</h1>
           </center>
        </div>
        
    </div>
    <br />
    <form class="row g-3"  onSubmit={sendHandle}>

        <div class="containerL text-center">
            <br />
                <div class="row">
                    <div class="col">
                    </div>
                    
                    <div class="col botonAN" className='containerL text-center'>
                    <label style={{ textAlign: 'justify' }}>
                        <p>Presiona el botón Para obtener tu link</p>
                    
                        
                    </label>
                    <button onClick={copyToClipboard} class="btn btn-outline-info N">
                            Copiar al Portapapeles    
                    </button>

                    <a href={link} target="_blank" className="link-container" rel="noopener noreferrer">
                        {link}
                    </a>
                    
                    
                    </div>
                    <div class="col">
                    </div>
                
            </div>
        
        </div>
        <br /><br />
            <div class="row">
                <div class="col" className='botonA '>
                <button type="submit" className="aceptar">Obtener</button>
                </div>
            </div>

    </form>    

        </section>

  
<Footer/>
    </>
  )
}


export default OLink