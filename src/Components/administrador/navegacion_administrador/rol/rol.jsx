import React from 'react'
import Rol from '../../crudrol/crudrol'
import Menumonedas from '../../menuadministrador/menudenavegacion/rol/rol'

const roles = () => {
  return (
    <div className="App">
        <Menumonedas></Menumonedas>
        <Rol></Rol>
    </div>
  )
}

export default roles