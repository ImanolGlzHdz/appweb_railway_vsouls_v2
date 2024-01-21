import React from 'react'
import Usuarios from '../../crudusuarios/crudusuarios'
import Menumonedas from '../../menuadministrador/menudenavegacion/usuarios/usuarios'

const usuarioscr = () => {
  return (
    <div className="App">
        <Menumonedas></Menumonedas>
        <Usuarios></Usuarios> 
        </div>
  )
}

export default usuarioscr