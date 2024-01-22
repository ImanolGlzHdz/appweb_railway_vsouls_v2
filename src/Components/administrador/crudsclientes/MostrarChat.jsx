import React from 'react';
import '../crudpublicidad/publicidadestilos.css';
import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';

export const MostrarChat = () => {

    const [preguntasUpdate, setPreguntasUpdate] = useState(false)


    const [preguntas, setPreguntas] = useState([])

    useEffect(() => {
      const getPreguntas = () => {
        fetch(`${import.meta.env.VITE_API}/chat/get`)
        .then(res => res.json())
        .then(data => {
            setPreguntas(data[0]);
          })
          .catch(error => console.error('Error:', error));
      
      }
      getPreguntas()
      setPreguntasUpdate(false)
    }, [preguntasUpdate])


    const handleDelete = id => {


        const requestInit = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: id })
        }

        fetch(`${import.meta.env.VITE_API}/chat/delete`, requestInit)
        .then(res => res.text())
        .then(res => {
            setPreguntasUpdate(true);
            
          })
          .catch(error => console.error('Error:', error));

    }
    



  return (
    <>
    
    <div class='limitetabla moveratras'>
       
        <section class="containerpubli2 moveratras limitetabla">     
        <h1 className='titulomio'>CHATBOT</h1> 
        <div class='moveratras'>
        <table class="table table-dark table-hover moveratras">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">PREGUNTA</th>
                    <th scope="col">RESPUESTA</th>
                    <th scope="col"></th>
                    <th scope="col"></th>

                    </tr>
                </thead>
                <tbody className='moveratras'>
                    {preguntas.map(pregunta => (

                        <tr className='moveratras' key={pregunta.id}>
                            <th className='moveratras' scope="row"> {pregunta.id} </th>
                            <td className='moveratras'> {pregunta.pregunta} </td>
                            <td className='moveratras'> {pregunta.respuesta} </td>
                            <td className='moveratras'>
                                <Link to={`/ActualizarChatBot/${pregunta.id}`}>
                                    <button className='btn btn-primary margen'>
                                        <img className='imagenbutttongrandes' width="30" height="30" src="https://img.icons8.com/ios/50/edit--v1.png" alt="edit--v1" />
                                     </button>
                                </Link>
                            </td>
                            <td className='moveratras'>
                                <button className='btn btn-danger margen' onClick={() => handleDelete(pregunta.id)} >
                                <img className='imagenbutttongrandes' width="30" height="30" src="https://img.icons8.com/ios/50/delete--v1.png" alt="delete--v1" />
                                </button>
                            </td>
                        </tr>

                    ))}
                   

                   
                   
                </tbody>
                </table>   
        
            </div>
            </section>
        </div>
    
    
    </>
  )
}

export default MostrarChat;