import React from 'react'
import Historialventa from '../../crudhistorialventa/crudhistorialventa'
import Menumonedas from '../../menuadministrador/menudenavegacion/historialventa/historialventa'

const historialventaa = () => {
  return (
    <div className="App">
        <Menumonedas></Menumonedas>
        <Historialventa></Historialventa>
    </div>
  )
}

export default historialventaa