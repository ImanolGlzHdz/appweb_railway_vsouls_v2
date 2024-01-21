import React from 'react'
import Footer from '../../Footer/footer'
import Menu from '../Menu/menusocios'
import Favoritos from '../favoritos/favoritos'

const fav = () => {
  return (
    <div>
      <Menu></Menu>
    <Favoritos/>
      <Footer></Footer>
    </div>
  )
}

export default fav