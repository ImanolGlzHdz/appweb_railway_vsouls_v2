import React,{useState, useEffect} from 'react'
import MenuCliente from '../../Menu/Menu'
import Favoritos from '../Favoritos/Favoritos'
import Footer from '../../Footer/footer'

function Favorito() {
  const [fav, setFav]=useState([]);

  useEffect(() => {
    const getProds = () => {
      const userId = sessionStorage.getItem('userId');
      fetch(`https://apivsoulsapi8-production.up.railway.app/favoritos/${userId}`)
      .then(res => res.json())
      .then(res => setFav(res))
    }
    getProds()
  },)
  return (
    <>
        <MenuCliente/>
        <Favoritos fav={fav}/>
        <Footer/>
    </>
  )
}

export default Favorito