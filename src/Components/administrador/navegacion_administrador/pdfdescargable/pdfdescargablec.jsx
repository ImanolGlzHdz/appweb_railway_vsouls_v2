import React from 'react'
import Menu from '../../menuadministrador/menudenavegacion/pdfdescargable/pdfdescargable'
import Pdfd from '../../crudpdfdescargable/pdfdescargable'
import '../menustilos.css'

const pdfdes = () => {
  return (
    <div>
      <Menu/>
      <Pdfd/>
    </div>
  )
}

export default pdfdes