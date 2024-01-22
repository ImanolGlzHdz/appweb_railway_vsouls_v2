import React, {useState, useEffect} from 'react'
import './stylesfav.css'
import {FaTrashAlt, FaEye} from 'react-icons/fa';
import {useNavigate} from "react-router-dom";
export var productoF ={};

const Favoritos = ({fav}) => {
    const navigate = useNavigate();
    var o;
    const [ofertas, setOfertas] = useState([])
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
    const handleDelete = (prod) => {
        const CLAVE_P  = prod.CLAVE_P ;
        const userId = sessionStorage.getItem('userId');
        const deleteFav= {CLAVE_P: CLAVE_P, ID_USUARIO:userId};

        const requestInit = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(deleteFav)
        }
        fetch(`${import.meta.env.VITE_API}/delete/fav`, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))
    }
    const seleccionarProducto=(prod)=>{
        productoF=prod;
        navigate("/cliente/detalleProducto");
    }

    
  return (
    <>
    {fav.length === 0 ? <div className='ListVacia'> La lista se encuentra vacia</div>:
        <div className='contFav'>
            <h2 class='titleFav'>MI  LISTA  DE  FAVORITOS</h2>
            <div class='wrapperFavoritos'>
                {fav.map((prod)=>(
                <div className='cardFav'>
                    <div className='caracter' key={prod}>
                    {ofertas.filter(x=>x.CLAVE_P === prod.CLAVE_P).length ?
                    <div class='linkOferta'>
                        <h2>En Oferta</h2>
                    </div>: null }
                        <img src={`${import.meta.env.VITE_API}/products/`+ prod.CLAVE_P + '-IMG_PRINCIPAL.png'} alt="" />
                        <div class='nameProductoFav'>
                            <h4>{prod.NOMBRE_P}</h4>
                        </div>
                        {ofertas.filter(x=>x.CLAVE_P === prod.CLAVE_P).length ?
                    <div>
                        <div>
                            <h3 className='ofertaFavorito'>$ {prod.PRECIO_P} MXN</h3>
                        </div>
                        
                        <div>
                            <h3 className='priceProducto'>${o=((ofertas.find((oferta) => oferta.CLAVE_P === prod.CLAVE_P)).PRECIO_D)} MXN</h3>
                        </div>
                    </div>
                    : 
                    <div>
                        <h3 className='priceProducto'>$ {prod.PRECIO_P} MXN</h3>
                    </div>}
                       
                    </div>
                    <div className='linkF'>
                        <span onClick={()=> handleDelete(prod)}><FaTrashAlt/></span>
                        <span onClick={()=> seleccionarProducto(prod)}><FaEye/></span>
                    </div>
                </div>
                ))}

            </div>
        </div> }
    </>
  )
}

export default Favoritos
