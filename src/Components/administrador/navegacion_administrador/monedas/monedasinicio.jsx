import React from 'react'
import Monedas from '../../crudmonedas/iniciomonedas'
import Menumonedas from '../../menuadministrador/menudenavegacion/monedas/monedasmenu'

const monedasinicio = () => {
  return (
    <div className="App">
        <Menumonedas></Menumonedas>
        <Monedas></Monedas>
    </div>
  )
}

export default monedasinicio