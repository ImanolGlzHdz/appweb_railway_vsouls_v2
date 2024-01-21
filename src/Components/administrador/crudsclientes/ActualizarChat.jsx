import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import '../crudpublicidad/publicidadestilos.css';
import Menumonedas from '../menuadministrador/menudenavegacion/chatbot/chatbot'

export const ActualizarChat = () => {

    const { id } = useParams();
    console.log(id);

    const [preguntasU, setPreguntasU] = useState({
        id: '',
        pregunta: '',
        respuesta: ''
    });

    
    useEffect(() => {
        const getPreguntas = async () => {
            try {
                const response = await fetch(`https://apivsoulsapi8-production.up.railway.app/chat/getId/${id}`);
                const data = await response.json();
                console.log(data[0][0]);
                setPreguntasU(data[0][0]);
            } catch (error) {
                console.error('Error:', error);
               
            }
        }

        getPreguntas();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPreguntasU(prevPreguntasU => ({
            ...prevPreguntasU,
            [name]: value
        }));

    }
    

    const handleUpdate= () => {
 
        if ( preguntasU.pregunta === '' || preguntasU.respuesta === '' ) {
            alert('Todos los campos son obligatorios')
            return
        }

        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(preguntasU)
        }

        fetch('https://apivsoulsapi8-production.up.railway.app/chat/Actualizar', requestInit)
        .then(res => res.text())
        .then(res => {
            console.log(res);
            setPreguntasU(res);
            alert('Datos Actualizados');
          })
          .catch(error => console.error('Error:', error));

    }


  return (
    <>
     <Menumonedas></Menumonedas>
        <div className='todopublicidad todobodypublicidad '>
        <div class='limitetabla moveratras'>
        
        
        <section class="containerpubli">  
        <h1 className='titulomio'>ACTUALIZAR CHATBOT</h1>  
        <div >

        <form class="form" onSubmit={handleUpdate}>

           
            <div class="input-box moveratras">
                    <label for="inputEmail4" className="moveratras labelpubli">PREGUNTA</label>
                    <input  value={preguntasU?.pregunta || ''} name="pregunta" onChange={handleChange}  type="text" className='moveratras sizefont inputpubli moveratras' id="inputEmail4" required></input>
            </div>
            
            <div class="input-box moveratras">
                    <label for="inputPassword4" className="moveratras labelpubli">RESPUESTA</label>
                    <input value={preguntasU?.respuesta || ''} name="respuesta" onChange={handleChange}  type="text" className='moveratras sizefont inputpubli moveratras' id="inputPassword4" required></input>
            </div>
            
            
            <div className="input-box moveratras">
                <button type='submit' class='butonpubli sizefont moveratras'>ACTUALIZAR</button>
            </div>
        </form>
        
            </div>
            </section>
        </div>
        </div>

    </>
  )
}

export default ActualizarChat;