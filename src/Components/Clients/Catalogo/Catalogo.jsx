import React, { useState, useEffect } from 'react'
import './stylescatalogo.css'
import { FaRegHeart, FaHeart, FaStar } from 'react-icons/fa';
import { useNavigate, useParams, useLocation } from "react-router-dom";
export var product = {};

const Catalogo = ({ fav, user, ofertas, updateFav }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const search = new URLSearchParams(location.search).get('search');
    const [productosA, setProductosA] = useState([])
    var o;
    
    useEffect(() => {
        console.log(search);
    
        const handleError = (error) => {
            console.error('Error en la solicitud:', error);
        };
    
        if (search === null || search === undefined || search === "") {
            const getProdsac = () => {
                fetch('https://apivsoulsapi8-production.up.railway.app/productosActivos')
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`¡Error HTTP! Estado: ${res.status}`);
                        }
                        return res.json();
                    })
                    .then(res => setProductosA(res))
                    .catch(handleError);
            };
            getProdsac();
        } else {
            const getProdsbc = () => {
                fetch(`https://apivsoulsapi8-production.up.railway.app/productosA/buscador/${search}`)
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`¡Error HTTP! Estado: ${res.status}`);
                        }
                        return res.json();
                    })
                    .then(res => setProductosA(res))
                    .catch(handleError);
            };
            getProdsbc();
        }
    }, [search]);

    const seleccionarProducto = (prod) => {
        product = prod;
        console.log(product)
        navigate("/cliente/detalleProducto");
    }

    const irLogin = () => {
        navigate("/login")
    }

    const insertFav = (prod) => {
        let CLAVE_P = prod.CLAVE_P
        const userId = sessionStorage.getItem('userId');
        const newFav = { CLAVE_P: CLAVE_P, ID_USUARIO: userId };
        const requestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newFav)
        }
        fetch('https://apivsoulsapi8-production.up.railway.app/new/fav', requestInit)
        .then(res => res.text())
        .then(res => {
            console.log(res);
            updateFav([...fav, prod]); // Agrega el nuevo producto a la lista de favoritos
        });
    }

    const handleDelete = (prod) => {
        let CLAVE_P = prod.CLAVE_P
        const userId = sessionStorage.getItem('userId');
        const deleteFav = { CLAVE_P: CLAVE_P, ID_USUARIO: userId };

        const requestInit = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(deleteFav)
        }
        fetch('https://apivsoulsapi8-production.up.railway.app/delete/fav', requestInit)
        .then(res => res.text())
        .then(res => {
            console.log(res);
            const updatedFav = fav.filter(item => item.CLAVE_P !== prod.CLAVE_P);
            updateFav(updatedFav); // Elimina el producto de favoritos
        });
    }

    return (
        <>
            <div class='contC'>
                {productosA.length === 0 ? <div className='NoDispo'>No hay productos disponibles</div>: 
                <div class='wrapperCatalogo'>
                    {productosA.map((prod) => (
                        <div class='card' key={prod.CLAVE_P}>
                            <a onClick={() => seleccionarProducto(prod)}>
                                {ofertas.filter(x => x.CLAVE_P === prod.CLAVE_P).length ?
                                    <div class='linkOferta'>
                                        <h2>En Oferta</h2>
                                    </div> : null}
                                <div class='img-box'>
                                    <img src={'https://apivsoulsapi8-production.up.railway.app/products/' + prod.CLAVE_P + '-IMG_PRINCIPAL.png'} alt="" />
                                </div>
                            </a>
                            <div class='details'>
                                <div className='nameP'>
                                <h5 className='nameProduct'>{prod.NOMBRE_P}</h5></div>
                                <div class='calf'>
                                    <span><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /> {prod.CANT} {prod.CANT < 2 ? 'Reseña' : 'Reseñas'} </span>
                                </div>
                                {ofertas.filter(x => x.CLAVE_P === prod.CLAVE_P).length ?
                                    <div>
                                        <div class='oferta'>
                                            <h3>$ {prod.PRECIO_P} MXN</h3>
                                        </div>

                                        <div class='price'>
                                            <h3 className='precioActivo'>$ {o = ((ofertas.find((oferta) => oferta.CLAVE_P === prod.CLAVE_P)).PRECIO_D)} MXN</h3>
                                        </div>
                                    </div>
                                    :
                                    <div className='price'>
                                        <h3 className='precioActivo'>$ {prod.PRECIO_P} MXN</h3>
                                    </div>}
                                <div className='link'>
                                    <a href="#"> Comprar Ahora</a>
                                </div>
                                <div className="favoritos">
                                    {user === 'null' ? <FaRegHeart onClick={() => irLogin()} /> :

                                        fav.filter(x => x.CLAVE_P === prod.CLAVE_P).length
                                            ?
                                            <FaHeart onClick={() => handleDelete(prod)} /> :
                                            <FaRegHeart onClick={() => insertFav(prod)} />
                                    }

                                </div>
                            </div>
                        </div>

                    ))}
                </div>}
            </div>
        </>
    )
}

export default Catalogo
