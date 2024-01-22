import React from 'react'
import Menu from '../../menuadministrador/menudenavegacion/ventas/ventasmenu'
import Agregar from '../../crudventas/ventas'
import '../menustilos.css'

const primeravez = () => {
  return (
    <div>
      <Menu/>
      <Agregar/>
    </div>
  )
}

export default primeravez