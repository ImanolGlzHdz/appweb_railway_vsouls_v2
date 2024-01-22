import React from 'react'
import Carrucelcliente from '../../crudcarrucelcliente/carrucelcliente'
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