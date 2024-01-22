import React from 'react'
import Menu from '../../menuadministrador/menudenavegacion/niveles/nivelesagregar'
import Listaniveles from '../../crudniveles/listaniveles'

const nivelesinicio = () => {
  return (
    <div>
        <Menu></Menu>
        <Listaniveles></Listaniveles>
    </div>
  )
}

export default nivelesinicio