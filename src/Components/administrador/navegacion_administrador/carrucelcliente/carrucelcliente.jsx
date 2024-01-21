import React from 'react'
import Carrucelcliente from '../../crudcarrucelcliente/agregarcarrucel'
import Menumonedas from '../../menuadministrador/menudenavegacion/carrucelcliente/carrucelcliente'

const carrucelcli = () => {
  return (
    <div className="App">
        <Menumonedas></Menumonedas>
        <Carrucelcliente></Carrucelcliente>
    </div>
  )
}

export default carrucelcli