import React from 'react'
import Validacionven from '../../crudvalidacionventasocios/crudvalidacionventasocioss'
import Menu from '../../menuadministrador/menudenavegacion/validacionventasocios/validacionventasocios'

const validacionventas = () => {
  return (
    <div className="App">
        <Menu></Menu>
        <Validacionven></Validacionven>
    </div>
  )
}

export default validacionventas