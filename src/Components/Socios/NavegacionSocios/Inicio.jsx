import React from 'react'
import Footer from '../../Footer/footer'
import Menu from '../Menu/menusocios'
import Tarjetas from '../inicio/TarjetasProductos/tarjetas_socios'
import Carousel from '../inicio/carrucel'

const Inicio = () => {
  return (
    <div>
      <Menu></Menu>
      <Carousel/>
      <Tarjetas></Tarjetas>
      <Footer></Footer>
    </div>
  )
}

export default Inicio