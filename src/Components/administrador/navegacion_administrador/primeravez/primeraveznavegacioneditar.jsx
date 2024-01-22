import React from 'react'
import Menu from '../../menuadministrador/menudenavegacion/primeravez/primeravezmenu'
import Agregar from '../../crudprimeravez/primeravezeditar'
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