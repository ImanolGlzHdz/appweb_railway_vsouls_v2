import React from 'react'
import Menu from '../../menuadministrador/menudenavegacion/niveles/nivelesagregar'
import EditarNivel from '../../crudniveles/editarnivel'

const nivelesinicio = () => {
  return (
    <div>
        <Menu></Menu>
        <EditarNivel></EditarNivel>
    </div>
  )
}

export default nivelesinicio