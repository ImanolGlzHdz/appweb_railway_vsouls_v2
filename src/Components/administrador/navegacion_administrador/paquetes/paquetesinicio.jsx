import React from 'react'
import Menu from '../../menuadministrador/menudenavegacion/paquetes/menupaquetes'
import Agregar from '../../crudpaquetes/creudpaquetes'
import '../menustilos.css'

const paquetesinicio = () => {
  return (
    <div>
      <Menu/>
      <Agregar/>
    </div>
  )
}

export default paquetesinicio