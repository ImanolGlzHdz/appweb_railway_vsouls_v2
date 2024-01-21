import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../style_socios.css';
import '../Tarjetasprimeravez/stylescatalogo.css';
import { FaRegHeart, FaHeart, FaStar } from 'react-icons/fa';
import imagen1 from './img/imagen1.png';
import { useNavigate } from 'react-router-dom';
import estrellavacioa from './img/estrellavacia.png';
import estrellareyena from './img/estrellareyena.png';
import Menu, { idUsuarioGlobal } from '../../Menu/menusocios';
export var product={};
export var verifcadetall='';

const Tarjetasq = ({ agregarProductoAlCarrito }) => {
  const [user,setUser]=useState();
    const navigate = useNavigate();
    const [productosA,setProductosA]=useState([])
    const [fav, setFav]=useState([]);
  

      
        // const rol = sessionStorage.getItem('rol');
        const getProds = () => {
          
          if (idUsuarioGlobal) {
          fetch(`https://apivsoulsapi8-production.up.railway.app/favoritos/cli/${idUsuarioGlobal}`)
            .then((res) => {
              if (!res.ok) {
                throw new Error('Error en la solicitud');
              }
              return res.json();
            })
            .then((res) => {
              setFav(res);
              // console.log('Lista de favoritos actualizada:', res);
            })
            .catch((error) => {
              console.error('Error de la solicitud:', error);
            });
        };
      }
        useEffect(() => {        
        getProds();
      
    }, [idUsuarioGlobal]);
    

    const insertFav = (prod) => {
      let CLAVE_P = prod.CLAVE_P;
      const newFav = { CLAVE_P: CLAVE_P, ID_USUARIO: idUsuarioGlobal };
      const requestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFav),
      };
      fetch('https://apivsoulsapi8-production.up.railway.app/new/fav/socios', requestInit)
        .then((res) => res.text())
        .then((res) => {
          console.log(res);
          // Actualiza la lista después de agregar el producto a favoritos
          getProds();
        });
    };
    
    const handleDelete = (prod) => {
      const CLAVE_P = prod.CLAVE_P;
      const deleteFav = { CLAVE_P: CLAVE_P, ID_USUARIO: idUsuarioGlobal };
    
      const requestInit = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deleteFav),
      };
    
      fetch('https://apivsoulsapi8-production.up.railway.app/delete/fav/socios', requestInit)
        .then((res) => res.text())
        .then((res) => {
          console.log(res);
          // Actualiza la lista después de eliminar el producto de favoritos
          getProds();
        });
    };
    


    useEffect(() => {
        const rol = sessionStorage.getItem('rol');
        setUser(rol)
        // console.log(user)
        const getProds = () => {
          fetch('https://apivsoulsapi8-production.up.railway.app/productosActivos')
          .then(res => res.json())
          .then(res => setProductosA(res))
        }
        getProds()
    },[])


    const seleccionarProducto=(prod)=>{
        product=prod;
        verifcadetall=1
        // console.log(prod)
        navigate("/socios/detalleproduct");
        
    }


  return (
    <div className='body todo'>
      <div className='contC'>
        <div className='wrapperCatalogo'>
            {productosA.map((prod)=> (
            <div className='card' key={prod.CLAVE_P}>
                <a onClick={()=> seleccionarProducto(prod)}>  
                <div className='img-box'>
                    <img src={'https://apivsoulsapi8-production.up.railway.app/products/'+ prod.CLAVE_P+ '-IMG_PRINCIPAL.png'} alt="" />
                </div>
                </a>
                <div className='details'>
                    <h2>{prod.NOMBRE_P}</h2>
                    <div className='calf'>
                    <span><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/> {prod.CANT} {prod.CANT <2 ? 'Reseña' : 'Reseñas'} </span>
                    </div>
                    <div className='oferta'>
                        <h3>$ {prod.PRECIO_P} MXN</h3>
                    </div>
                    <div className='price'>
                        <h3>$ {prod.PRECIO_SOCIO_P} MXN</h3>
                    </div>
                    <div className='link'>
                    <a href="#" onClick={() => agregarProductoAlCarrito(prod.CLAVE_P)}>Comprar Ahora</a>
                    </div>
                    {/* {user===null?<h2>No es usuario</h2>:<h2>Si es usuario</h2>} */}
                    <div className="fav">
                    {
   Array.isArray(fav) && fav.filter(x => x.CLAVE_P === prod.CLAVE_P)?.length
      ? <FaHeart onClick={() => handleDelete(prod)} />
      : <FaRegHeart onClick={() => insertFav(prod)} />
}

                        
                    </div>
                </div>
            </div>  
            ))}
        </div>
    </div>

    </div>
  );
};

export default Tarjetasq;
