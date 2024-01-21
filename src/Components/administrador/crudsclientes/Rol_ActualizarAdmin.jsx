import React from 'react'
import '../css/publicidadestilos.css';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';

export const Rol_Actualizar = () => {

    const { id } = useParams();

    const [rolU, setRolU] = useState({
        ID_ROL: '',
        NOMBRE: '',
        DESCRIPCION: ''
    });

    
    useEffect(() => {
        const getRoles = async () => {
            try {
                const response = await fetch(`https://apivsoulsapi8-production.up.railway.app/rolId/${id}`);
                const data = await response.json();
                setRolU(data[0]);
            } catch (error) {
                console.error('Error:', error);
               
            }
        }

        getRoles();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRolU(prevRolU => ({
            ...prevRolU,
            [name]: value
        }));

    }
    

    const handleUpdate= () => {
        if (rolU.NOMBRE === '' || rolU.DESCRIPCION === '' ) {
            alert('Todos los campos son obligatorios')
            return
        }

        // consulta
        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(rolU)
        }

        fetch('https://apivsoulsapi8-production.up.railway.app/rol', requestInit)
        .then(res => res.text())
        .then(res => {
            setRolU(res);
            alert('Datos Actualizados');
          })
          .catch(error => console.error('Error:', error));


    }


  return (
    <>
        
        <div class='todopublicidad todobodypublicidad'>
        <div class='menudepublidad'>
        
        </div>
        <br />
        <section class="containerpubli">     
        <header class='headerpubli'>ACTUALIZAR ROL</header> 
        <div >

        <form class="form" onSubmit={handleUpdate}>

           
            <div className="input-box moveratras">
                <label for="inputEmail4" className='labelpubli'>NOMBRE DEL ROL</label>
                <input  value={rolU.NOMBRE || ''} name="NOMBRE" onChange={handleChange}  type="text" className='sizefont inputpubli moveratras' id="inputEmail4" required></input>
            </div>
            <div className="input-box moveratras">
                <label for="inputPassword4" className='labelpubli'></label>DESCRIPCION
                <input value={rolU.DESCRIPCION || ''} name="DESCRIPCION" onChange={handleChange}  type="text" className='sizefont inputpubli moveratras' id="inputPassword4" required></input>
            </div>
            
            
            <div className="input-box moveratras">
                <button type='submit' className='butonpubli sizefont'>ACTUALIZAR</button>
            </div>
        </form>
        
            </div>
            </section>
        </div>

    </>
  )
}

export default Rol_Actualizar;