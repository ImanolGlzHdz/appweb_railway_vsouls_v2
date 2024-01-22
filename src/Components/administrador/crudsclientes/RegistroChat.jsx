import React from 'react'
import { useState, useEffect} from 'react';
import '../crudpublicidad/publicidadestilos.css';

export const RegistroChat = () => {


    const [preguntas, setPreguntas] = useState({
        pregunta: '',
        respuesta: ''
    })

   
    // --------------------------------- INSERTAR CHAT -------------------------------


    const handleChange = e => {
        const { name, value } = e.target;
        setPreguntas(prevPreguntas => ({
            ...prevPreguntas,
            [name]: value
        }));


    }

    // ----------------INSERTAR REGISTRO -----------------------------------

    
    const handleSubmit = () => {

        if ( preguntas.pregunta === '' || preguntas.respuesta === '' ) {
            alert('Todos los campos son obligatorios')
            return
        }

        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(preguntas)
        }

        fetch(`${import.meta.env.VITE_API}/chat/post`, requestInit)
        .then(res => res.text())
        .then(res => {
            alert('Registro Insertado');
            setPreguntas(res);

          })
          .catch(error => console.error('Error:', error));

    }



  return (
    <>
         <div class='limitetabla moveratras'>
        
        <section class="containerpubli">  
        <h1 className='titulomio'>CHATBOT</h1>  
        <div >

            <form class="form" onSubmit={handleSubmit}>
                <div class="input-box moveratras">
                    <label for="inputEmail4" className="moveratras labelpubli">PREGUNTA</label>
                    <input name="pregunta" onChange={handleChange} type="text" className="moveratras sizefont inputpubli moveratras" id="inputEmail4" required></input>
                </div>
                <div class="input-box moveratras">
                    <label for="inputPassword4" className="moveratras labelpubli">RESPUESTA</label>
                    <input name="respuesta" onChange={handleChange} type="text" className="moveratras sizefont inputpubli moveratras" id="inputPassword4" required></input>
                </div>
                
                <div class="input-box moveratras">
                    <button type='submit' className='butonpubli sizefont moveratras'>REGISTRAR</button>
                </div>
            </form>
            
                </div>
                </section>
        </div>

    </>
  )
}

export default RegistroChat;
