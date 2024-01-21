import React from 'react'
import '../css/publicidadestilos.css';
import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';

export const Rol_A = () => {

    const [rol, setRol] = useState({
        NOMBRE: '',
        DESCRIPCION: ''
    })


    const handleChange = e => {

        const { name, value } = e.target;
        setRol(prevRol => ({
          ...prevRol,
          [name]: value
        }));
    }



    const handleSubmit = () => {
        if (rol.NOMBRE === '' || rol.DESCRIPCION === '' ) {
            alert('Todos los campos son obligatorios')
            return
        }

        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(rol)
        }

        fetch('https://apivsoulsapi8-production.up.railway.app/rol', requestInit)
        .then(res => res.json())
        .then(res => {
            setRol(res);
          })
          .catch(error => console.error('Error:', error));


        setRol({
            NOMBRE: '',
            DESCRIPCION: ''
        })


    }

  return (
    <>
        
        <div class='todopublicidad todobodypublicidad'>
        <div class='menudepublidad'>
      
        </div>
        <br /><br />
        <section class="containerpubli">  
        <header class='headerpubli'>ROL</header>    
        <div >

        <form class="form" onSubmit={handleSubmit}>
           
            <div className="input-box moveratras">
            
            
                <label for="inputEmail4" className='labelpubli'>NOMBRE DEL ROL</label>
                <input value={rol.NOMBRE} name="NOMBRE" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputEmail4" required></input>
            </div>
            <div className="input-box moveratras">
                <label for="inputPassword4" className='labelpubli'></label>DESCRIPCION
                <input value={rol.DESCRIPCION} name="DESCRIPCION" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputPassword4" required></input>
            </div>
            
            
            <div className="input-box moveratras">
                <button type='submit' class='butonpubli sizefont'>REGISTRAR</button>
            </div>
        </form>
        
            </div>
            </section>
        </div>

    </>
  )
}

export default Rol_A;