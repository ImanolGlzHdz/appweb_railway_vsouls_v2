import React from 'react'
import Chat from '../../crudchatbot/listachar'
import Menumonedas from '../../menuadministrador/menudenavegacion/chatbot/chatbot'

const chatbot = () => {
  return (
    <div className="App">
        <Menumonedas></Menumonedas>
        <Chat></Chat>
    </div>
  )
}

export default chatbot