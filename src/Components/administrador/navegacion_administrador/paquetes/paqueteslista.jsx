import React from 'react'
import Menu from '../../menuadministrador/menudenavegacion/paquetes/menupaquetes'
import Lista from '../../crudpaquetes/listapaquetes'
import '../menustilos.css'

const paquetesinicio = () => {
  return (
    <div>
      <Menu/>
      <Lista/>
    </div>
  )
}

export default paquetesinicio