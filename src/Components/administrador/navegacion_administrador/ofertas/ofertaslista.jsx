import React from 'react'
import Menu from '../../menuadministrador/menudenavegacion/ofertas/ofertas'
import Ofertasa from '../../crudofertas/ofertaslista'
import '../menustilos.css'

const paquetesinicio = () => {
  return (
    <div>
      <Menu/>
      <Ofertasa/>
    </div>
  )
}

export default paquetesinicio