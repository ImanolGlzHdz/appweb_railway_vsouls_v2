import React from 'react'
import '../Catalogo/stylescatalogo.css'
import './Principal.css'
import { useState, useEffect, useRef } from 'react';
import './ChatbotPopup.css';
import ChatbotPopup from './ChatbotPopup';
import ruta3 from './img/chat.png';
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart, FaStar } from 'react-icons/fa';
export var prod = {};

export const Principal2 = ({ id }) => {
    const navigate = useNavigate();

    const [imageList, setImageList] = useState([])
    const [ofertas, setOfertas] = useState([])
    const [visible, setVisible] = useState(false);
    const [isChatbotPopupOpen, setChatbotPopupOpen] = useState(false);

    // ---------------OBTENER USUARIO -----------------------------------

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
    }, [id]);

    // ----------------------- OBTENER CARRUCEL ------------------------

    useEffect(() => {
        const getCarrucel = () => {
            fetch(`${import.meta.env.VITE_API}/carrucel/get`)
                .then(res => res.json())
                .then(data => {
                    setImageList(data);
                })
                .catch(error => console.error('Error:', error));
        }
        getCarrucel()
    }, [])

    // -----------------MOSTRAR OFERTAS ----------------------------------

    useEffect(() => {
        const getOfertas = () => {
            fetch(`${import.meta.env.VITE_API}/ofertasNew`)
                .then(res => res.json())
                .then(data => {
                    setOfertas(data);
                })
                .catch(error => console.error('Error:', error));

        }
        getOfertas()
    }, [])
    const [fav, setFav] = useState([]);
    const [user, setUser] = useState();
    const [updateFav, setUpdateFav]=useState(false)

    //------------VERIFICAR SI LOS PRODUCTOS ESTAN EN FAVORITOS------

    const getProdsF = () => {
        const userId = sessionStorage.getItem('userId');
        if(userId){
            fetch(`${import.meta.env.VITE_API}/favoritos/${userId}`)
            .then(res => res.json())
            .then(res => {
                if (Array.isArray(res)) {
                    setFav(res);
                } else {
                    console.error('Formato de respuesta no válido para favoritos:', res);
                }
            })
        }
            
    }

    useEffect(() => {
        const rol = sessionStorage.getItem('rol');
        if (rol == null) {
            setUser(rol)
        } else {
            setUser(rol)
            getProdsF()
        }
        
    },[])

    const handleChatbotClick = () => {
        setChatbotPopupOpen(true);
    };
    const irLogin = () => {
        navigate("/login")
    }
    
    const insertFav = (oferta) => {
        console.log('insert')
        let CLAVE_P = oferta.CLAVE_P
        const userId = sessionStorage.getItem('userId');
        const newFav = { CLAVE_P: CLAVE_P, ID_USUARIO: userId };
        const requestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newFav)
        }
        fetch(`${import.meta.env.VITE_API}/new/fav`, requestInit)
            .then(res => res.text())
            .then(res => (res == "Producto agregado a Favoritos")?
                getProdsF()
            :
                console.log('Algo salio mal')
            );
    }
    const handleDelete = (oferta) => {
        let CLAVE_P = oferta.CLAVE_P
        const userId = sessionStorage.getItem('userId');
        const deleteFav = { CLAVE_P: CLAVE_P, ID_USUARIO: userId };

        const requestInit = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(deleteFav)
        }
        fetch(`${import.meta.env.VITE_API}/delete/fav`, requestInit)
            .then(res => res.text())
            .then(res => (res == "Producto eliminado de Favoritos")?
            getProdsF()
        :
            console.log('Algo salio mal'))
    }
    const seleccionarProducto = (oferta) => {
        prod = oferta;
        navigate("/cliente/detalleProducto");
        getProdsF()

    }


    return (
        <>

            <section className='1'>
                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {imageList.map((image, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <img
                                    src={`${import.meta.env.VITE_API}/dbimages/${image}`}
                                    alt="..."
                                    className="img-fluid rounded mx-auto d-block"
                                />
                            </div>
                        ))}
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </section>


            <section className="u-clearfix u-section-1" id="sec-beab">
                <div className="">

                  
                    <button onClick={handleChatbotClick} className="u-active-custom-color-6 u-border-0 u-btn u-btn-round u-button-style u-custom-color-11 u-hover-custom-color-13 u-hover-feature u-radius u-btn-1">
                        <img src={ruta3} width="40" height="60" alt="ChatBot" />
                    </button>
                    {isChatbotPopupOpen && <ChatbotPopup close={() => setChatbotPopupOpen(false)} />}




                </div>
            </section>

            <section className="u-clearfix u-gradient u-section-3" id="carousel_421b">
                <div className="u-clearfix u-sheet u-sheet-1">
                    <div className="custom-expanded data-layout-selected u-clearfix u-layout-wrap u-layout-wrap-1">
                        <div className="u-layout">
                            <div className="u-layout-row">
                                <div className="u-container-style u-layout-cell u-size-60 u-layout-cell-1">
                                    <div className="u-container-layout u-container-layout-1">
                                        <h3 className="u-text u-text-default u-text-1">¿Dónde Nos Ubicamos?</h3>
                                        <div className="custom-expanded u-grey-light-2 u-map u-map-1">
                                            <div className="embed-responsive">
                                                <iframe className="embed-responsive-item" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3756.238123980493!2d-101.18649842523712!3d19.702483632007503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842d0e0d29e7ed9f%3A0xe8ef7a7b0eb0061a!2sC.%20Isidro%20Huarte%2053%2C%20Centro%20hist%C3%B3rico%20de%20Morelia%2C%2058000%20Morelia%2C%20Mich.!5e0!3m2!1ses-419!2smx!4v1696863171964!5m2!1ses-419!2smx" data-map="JTdCJTIycG9zaXRpb25UeXBlJTIyJTNBJTIybWFwLWVtYmVkJTIyJTJDJTIyYWRkcmVzcyUyMiUzQSUyMiVFMiU4MCU4QiVFMiU4MCU4QkMuJTIwSXNpZHJvJTIwSHVhcnRlJTIwNTMlMkMlMjBDZW50cm8lMjBoaXN0JUMzJUIzcmljbyUyMGRlJTIwTW9yZWxpYSUyQyUyMDU4MDAwJTIwTW9yZWxpYSUyQyUyME1pY2guJTIyJTJDJTIyem9vbSUyMiUzQTEwJTJDJTIydHlwZUlkJTIyJTNBJTIycm9hZCUyMiUyQyUyMmxhbmclMjIlM0FudWxsJTJDJTIyYXBpS2V5JTIyJTNBbnVsbCUyQyUyMm1hcmtlcnMlMjIlM0ElNUIlNUQlMkMlMjJlbWJlZCUyMiUzQSUyMmh0dHBzJTNBJTJGJTJGd3d3Lmdvb2dsZS5jb20lMkZtYXBzJTJGZW1iZWQlM0ZwYiUzRCExbTE4ITFtMTIhMW0zITFkMzc1Ni4yMzgxMjM5ODA0OTMhMmQtMTAxLjE4NjQ5ODQyNTIzNzEyITNkMTkuNzAyNDgzNjMyMDA3NTAzITJtMyExZjAhMmYwITNmMCEzbTIhMWkxMDI0ITJpNzY4ITRmMTMuMSEzbTMhMW0yITFzMHg4NDJkMGUwZDI5ZTdlZDlmJTI1M0EweGU4ZWY3YTdiMGViMDA2MWEhMnNDLiUyNTIwSXNpZHJvJTI1MjBIdWFydGUlMjUyMDUzJTI1MkMlMjUyMENlbnRybyUyNTIwaGlzdCUyNUMzJTI1QjNyaWNvJTI1MjBkZSUyNTIwTW9yZWxpYSUyNTJDJTI1MjA1ODAwMCUyNTIwTW9yZWxpYSUyNTJDJTI1MjBNaWNoLiE1ZTAhM20yITFzZXMtNDE5ITJzbXghNHYxNjk2ODYzMTcxOTY0ITVtMiExc2VzLTQxOSEyc214JTIyJTdE"></iframe>
                                            </div>
                                        </div>
                                        <div className="custom-expanded u-border-2 u-border-grey-75 u-container-style u-group u-radius u-shape-round u-group-1">
                                            <div className="u-container-layout u-container-layout-2"><span className="u-custom-color-1 u-icon u-icon-circle u-text-white u-icon-1">
                                                <svg className="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 54.757 54.757" >
                                                    <svg className="u-svg-content" viewBox="0 0 54.757 54.757" x="0px" y="0px" id="svg-e83a" style={{ enableBackground: 'new 0 0 54.757 54.757' }}>
                                                        <use xmlnsXlink="http://www.w3.org/1999/xlink" href="#svg-e83a"></use>
                                                    </svg>


                                                </svg>

                                                <svg className="u-svg-content" viewBox="0 0 54.757 54.757" x="0px" y="0px" id="svg-e83a" style={{ enableBackground: 'new 0 0 54.757 54.757' }}><g><path d="M27.557,12c-3.859,0-7,3.141-7,7s3.141,7,7,7s7-3.141,7-7S31.416,12,27.557,12z M27.557,24c-2.757,0-5-2.243-5-5
		s2.243-5,5-5s5,2.243,5,5S30.314,24,27.557,24z"></path><path d="M40.94,5.617C37.318,1.995,32.502,0,27.38,0c-5.123,0-9.938,1.995-13.56,5.617c-6.703,6.702-7.536,19.312-1.804,26.952
		L27.38,54.757L42.721,32.6C48.476,24.929,47.643,12.319,40.94,5.617z M41.099,31.431L27.38,51.243L13.639,31.4
		C8.44,24.468,9.185,13.08,15.235,7.031C18.479,3.787,22.792,2,27.38,2s8.901,1.787,12.146,5.031
		C45.576,13.08,46.321,24.468,41.099,31.431z"></path>
                                                </g></svg></span>
                                                <h5 className="u-text u-text-2"> C. Isidro Huarte 53, Centro histórico de Morelia, 58000 Morelia, Mich.</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <section className="u-clearfix u-section-4" id="sec-65a4">
                <div className="u-clearfix u-sheet u-sheet-1">
                    <h3 className="u-text u-text-default u-text-1">Nuestras Mejores Ofertas</h3>
                    <div className="u-container-style u-group u-group-1">
                        <div className="u-container-layout u-container-layout-1">
                            <div className='contC'>
                                <div className='wrapperCatalogo'>
                                    {ofertas.map(oferta => (
                                        <div className='card' key={oferta.ID_OFERTA}>
                                            <a style={{ textDecoration: "none" }} onClick={() => seleccionarProducto(oferta)}>
                                                <div className='linkOferta'>
                                                    <h2>En Oferta</h2>
                                                </div>
                                                <div className='img-box'>
                                                    <img src={`${import.meta.env.VITE_API}/products/` + oferta.CLAVE_P + '-IMG_PRINCIPAL.png'} alt="" />
                                                </div>
                                            </a>
                                            <div className='details'>
                                                <h2>{oferta.NOMBRE_P}</h2>
                                                <div className='calf'>
                                                    <span><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /> {oferta.CANT} {oferta.CANT < 2 ? 'Reseña' : 'Reseñas'} </span>
                                                </div>
                                                <div className='oferta'>
                                                    <h3>${oferta.PRECIO_P} MXN</h3>
                                                </div>
                                                <div className='price'>
                                                    <h3>$ {oferta.PRECIO_D} MXN</h3>
                                                </div>
                                                <div className='link'>
                                                    <a href="#"> Comprar Ahora</a>
                                                </div>

                                                <div className="fav">
                                                    {user === null ? <FaRegHeart onClick={() => irLogin()} /> :

                                                        fav.filter(x => x.CLAVE_P === oferta.CLAVE_P).length
                                                            ?
                                                            <FaHeart onClick={() => handleDelete(oferta)} /> :
                                                            <FaRegHeart onClick={() => insertFav(oferta)} />
                                                    }

                                                </div>

                                            </div>
                                        </div>
                                    ))}

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Principal2