import React from 'react'
import Productos from '../../crudproductos/crudproductos'
import Menumonedas from '../../menuadministrador/menudenavegacion/productos/productos'

const CRUDproductos = () => {
  return (
    <div className="App">
        <Menumonedas></Menumonedas>
        <Productos></Productos>
    </div>
  )
}

export default CRUDproductos