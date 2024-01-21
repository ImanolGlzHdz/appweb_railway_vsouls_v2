import React from 'react'
import Comisiones from '../../crudcomisiones/cruddetallecomision'
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