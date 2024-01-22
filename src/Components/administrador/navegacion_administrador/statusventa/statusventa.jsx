import React from 'react'
import Statusventa from '../../crudstatusventa/crudstatusventa'
import Menumonedas from '../../menuadministrador/menudenavegacion/statusventa/statusventa'

const statusventaa = () => {
  return (
    <div className="App">
        <Menumonedas></Menumonedas>
        <Statusventa></Statusventa>
    </div>
  )
}

export default statusventaa