import React, {useEffect, useState} from 'react'
import MenuCliente from '../../Menu/Menu'
import Catalogo from '../Catalogo/Catalogo.jsx'
import Footer from '../../Footer/footer'

const Productos= () => {
  const [fav, setFav]=useState([]);
  const [user,setUser]=useState();
  const [ofertas, setOfertas] = useState([])
  
  useEffect(() => {
    const rol = sessionStorage.getItem('rol');
    if(rol== 'null'){
      setFav([]);
      setUser(rol)
    }else{
      const userId = sessionStorage.getItem('userId');
    if(userId){
      const getProds = () => {
       
        fetch(`${import.meta.env.VITE_API}/favoritos/${userId}`)
        .then(res => res.json())
        .then(res => setFav(res),setUser(rol))
      }
      getProds()
    }}
    
  },[])

  useEffect(() => {
    const getOfertas = () => {
        fetch(`${import.meta.env.VITE_API}/ofertaC`)
            .then(res => res.json())
            .then(data => {
                setOfertas(data);
            })
            .catch(error => console.error('Error:', error));
    }
    getOfertas()
}, [])

const updateFav = (newFav) => {
  setFav(newFav);
};
  return (
    <>
        <MenuCliente/>
        <Catalogo fav={fav} user={user} ofertas={ofertas} updateFav={updateFav} />
        <Footer/>
    </>

  )
}

export default Productos
