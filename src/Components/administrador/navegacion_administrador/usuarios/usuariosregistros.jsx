import React from 'react'
import Usuarios from '../../crudusuarios/crudusuariosregistros'
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