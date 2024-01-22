import React from 'react'
import Validacionven from '../../crudvalidacionventa/crudvalidacionventa'
import Menu from '../../menuadministrador/menudenavegacion/validacionventa/validacionventa'

const validacionventas = () => {
  return (
    <div className="App">
        <Menu></Menu>
        <Validacionven></Validacionven>
    </div>
  )
}

export default validacionventas