import React from 'react'
import Usuarios from '../../crudusuarios/crudusuarioseditar'
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