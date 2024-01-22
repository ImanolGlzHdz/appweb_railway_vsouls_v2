import React, { useState, useEffect, useRef } from 'react';
import './ChatbotPopup.css';


function ChatbotPopup({close}) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const bienvenida = 'Hola, ¿cómo puedo ayudarte hoy?';
    setMessages([{ text: bienvenida, type: 'bot' }]);
  }, []);

  const handleSendMessage = (message, isUserQuestion = true) => {
    setLoading(true);
  
   
    if (isUserQuestion) {
      fetch(`${import.meta.env.VITE_API}/chat/enviarMensaje`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mensaje: message, pregunta: isUserQuestion }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Respuesta del servidor:', data);
  
         
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: message, type: isUserQuestion ? 1 : 0 },
            { text: data.mensaje, type: 0 },
          ]);
  
     
          setLoading(false);
  
          setInputMessage('');
        })
        .catch((error) => {
          console.error('Error en la solicitud fetch:', error);
  
          setLoading(false);
        });
    } else {
     
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, type: 1 },
      ]);
  
      
      setLoading(false);
  
      setInputMessage('');
    }
  };

  const handleKeyDown = (e) => {
  
    if (e.key === 'Enter') {
      
      e.preventDefault();
  
     
      handleSendMessage(inputMessage);
    }
  };

  const popupRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
   
        close();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [close]);
  
  return (
    <div className="containerChat" ref={popupRef}>
    <div>
      <div className='container-closed'>
      <button className="close-button" onClick={close} >
        
        X
      </button>
      </div>
      {messages.map((message, index) => (
        <div key={index} className={`message-container ${message.type === 1 ? 'user-container' : 'bot-container'}`}>
          <div className={`message ${message.type === 1 ? 'user-message' : 'bot-message'}`}>
            {message.text}
          </div>
        </div>
      ))}

    </div>
    <div>
    <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="input"
      />
      <button className='buttonChat' onClick={() => handleSendMessage(inputMessage)} disabled={loading}>
        Enviar
      </button>
    </div>
  </div>
  );
}

export default ChatbotPopup;
