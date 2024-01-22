import React from 'react'
import Comisiones from '../../crudcomisiones/crudcomisiones'
import Menumonedas from '../../menuadministrador/menudenavegacion/comisiones/comisiones'

const comisiones = () => {
  return (
    <div className="App">
        <Menumonedas></Menumonedas>
        <Comisiones></Comisiones>
    </div>
  )
}

export default comisiones