import React, {useState, useEffect} from 'react'
import './stylesdetalleprod.css';
import {Modal, ModalBody, ModalHeader, ModalFooter }from 'reactstrap';
import { FaCartPlus, FaStar } from 'react-icons/fa';
import StarRating from './StarRating';
import Tarjetas, {product} from '../inicio/TarjetasProductos/tarjetas';
import Paquetes,{productp} from '../paquetes/listapaquetes';
import favoritos ,{producft} from '../favoritos/favoritos';
import {verifcadetall} from '../inicio/TarjetasProductos/tarjetas'
import {verifcadetallf} from '../favoritos/favoritos'
import {verifcadetallp} from '../paquetes/listapaquetes'
import Menu, { idUsuarioGlobal } from '../Menu/menusocios';
import { useNavigate } from 'react-router-dom';

const DetalleProducto = ({ agregarProductoAlCarrito }) => {
    var producto;
    const navigate = useNavigate()
    // alert(verifcadetallp)
    // console.log(productp.DESCRIPCION_P)
    // console.log(verifcadetall, verifcadetallf, verifcadetallp )
    if (verifcadetall==1) {
        // console.log('b');
        // console.log(product);
        producto = product;
    }
    if (verifcadetallf==2) {
        // console.log('a')
        // console.log(productp.BENEFICIOS_P);
        producto = producft;
    }
    if (verifcadetallp==3) {
        // console.log('c');
        producto = productp ;
        // console.log(producft);
    }
    
    // alert(producto.DESCRIPCION_P)
 
        const contentOptions = [
            {id:1, n:'Descripcion', text:(producto.DESCRIPCION_P)},
            {id:2, n:'Beneficios', text:(producto.BENEFICIOS_P)}
        ];
   
    const [comentarios, setCometarios]=useState([]);
    const cantComentarios = comentarios.length;

    const [mensaje, setMensaje]= useState([]);

    const [modalInsertar, setModalInsertar] = useState (false);
    const [modalMsj, setModalMsj] = useState (false);
    const [selectedOption, setSelectedOption] = useState(contentOptions[0]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };
    const [, setValue] = useState(0);
    const [cantidad, setCantidad]= useState(1);
    const [rating, setRating]=useState(0);
    const [listUpdateR, setListUpdateR] = useState(false);

    useEffect(() => {
        const getProds = () => {
          fetch(`${import.meta.env.VITE_API}/review/`+ producto.CLAVE_P)
          .then(res => res.json())
          .then(res => setCometarios(res))
        }
        getProds()
        setListUpdateR(false);
    }, [listUpdateR])
    
    const filtroChange = e => {
        let a = e.target.value;
        if(a === 'reciente'){
            const getProds = () => {
                fetch(`${import.meta.env.VITE_API}/reviewRecientes/`+ producto.CLAVE_P)
                .then(res => res.json())
                .then(res => setCometarios(res))
              }
              getProds()
        }else if (a === 'max'){
            const getProds = () => {
                fetch(`${import.meta.env.VITE_API}/reviewMax/`+ producto.CLAVE_P)
                .then(res => res.json())
                .then(res => setCometarios(res))
              }
              getProds()
        }else {
            const getProds = () => {
                fetch(`${import.meta.env.VITE_API}/reviewMin/`+ producto.CLAVE_P)
                .then(res => res.json())
                .then(res => setCometarios(res))
              }
              getProds()
        }
    }
    const handleCantidadChange = (event)=> {
        const newCant = parseInt(event.target.value, 10);
        setCantidad(newCant);
    }
    const disminuirCantidad = ()=> {
        if (cantidad>1){
            setCantidad(cantidad-1)
        }
    }
    const aumentarCantidad = ()=>{
        setCantidad(cantidad+1);
    }

    const insertR = (e)=> {
        e.preventDefault();
        const desc = e.target.elements.descR.value;
        let date = new Date()
        let day = `${(date.getDate())}`.padStart(2,'0');
        let month = `${(date.getMonth()+1)}`.padStart(2,'0');
        let year = date.getFullYear();
        
        const FECHA_R = (`${year}-${month}-${day}`)
        if(rating==0){
            alert('Calificanos para cotinuar');
        }else{
            const newReview={CLAVE_P:(producto.CLAVE_P), ID_USUARIO: 362468, DESCRIPCION_R:desc, CALIFICACION_R:rating, FECHA_R:FECHA_R};
            console.log(newReview);
            const requestInit = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newReview)
            }
            fetch(`${import.meta.env.VITE_API}/new/review`, requestInit)
            .then(res => res.json())
            .then(res => setMensaje(res));
            setRating(0);
            setModalInsertar(false);
            setListUpdateR(true);
            setModalMsj(true);
            
            
            
        }
    }

    function inicio (){
        let images = Array.from(document.getElementsByClassName("imgContent"));
        let mainPhoto = document.getElementById("mainPhoto")
        

        images.forEach(function (image){
            image.addEventListener("click", updateImage);
        })

        function updateImage (event){
            let image = event.target;
            mainPhoto.src = image.src;
        }
    }
    inicio()

  return (
    <>
        <div className='contDp'>
            <div className='wrapperDp' key={producto.CLAVE_P}>
                <div className='wrapperI'>
                    <div className='image-wrapper'>
                        <img className='imgContent' src={`${import.meta.env.VITE_API}/products/`+ producto.CLAVE_P + '-IMG_PRINCIPAL.png'} alt="" />
                        <img className='imgContent' src={`${import.meta.env.VITE_API}/products/`+ producto.CLAVE_P + '-IMG1.png'} alt="" />
                        <img className='imgContent' src={`${import.meta.env.VITE_API}/products/`+ producto.CLAVE_P + '-IMG2.png'} alt="" />
                        <img className='imgContent' src={`${import.meta.env.VITE_API}/products/`+ producto.CLAVE_P + '-IMG3.png'} alt="" />
                    </div>
                    <div className='imgPrincipal'>
                        <img  id='mainPhoto' src={`${import.meta.env.VITE_API}/products/`+ producto.CLAVE_P + '-IMG_PRINCIPAL.png'} alt="" />
                    </div>
                </div>
                <div className='wrapperF'>
                    <div className='detalles'>
                        <h2>{producto.NOMBRE_P}</h2>
                        <div className='precio'>
                            <h4>$500.04</h4>
                            <h3>${producto.PRECIO_P} MXN</h3>
                        </div>
                        <div className='carr'>
                            {/* <div className='cant'>
                                <h4>Cantidad: </h4>
                                <div classNameName='cantidad-input'>
                                    <div className='boton' onClick={disminuirCantidad}>-</div>
                                        <input type="number" value={cantidad} onChange={handleCantidadChange} min={1} />
                                    <div className='boton' onClick={aumentarCantidad}>+</div>
                                </div>
                            </div> */}
                            <div className='btn'>
                                <button onClick={() => agregarProductoAlCarrito(producto.CLAVE_P)} className='btnAdd'>
                                    <FaCartPlus className='iconC'/>
                                    <span> Agregar</span>
                                </button>
                            </div>

                        </div>
                        <div className='descB'>
                            <div className='division'>  
                                {contentOptions.map((option) => (
                                    <li style={{listStyle:'none'}}
                                        key={option.id}
                                        className={option === selectedOption ? 'active' : ''}
                                        onClick={() => handleOptionClick(option)}
                                    >
                                        <div className='d'>
                                            <h4>{option.n}</h4>
                                        </div>
                                    </li>
                                ))}
                            </div>
                            <div className="desc">
                                <h5>{selectedOption.n}: {selectedOption.text}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='wrapperCal'>
                <div className='review'>
                    <h2>Lo que dicen nuestros Clientes</h2>
                    <div className='review-div'>
                        <span><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/> Basado en {cantComentarios} {cantComentarios<2 ? 'reseña' : 'reseñas'} </span>
                        <button onClick={()=>setModalInsertar(true)}>Escribir una reseña</button>
                    </div>
                </div>
                {cantComentarios === 0 ?
                <div></div>:
                <div className='coment'>
                    <hr />
                    <select name='filtro' onChange={filtroChange}>
                        <option value="reciente"> Mas recientes</option>
                        <option value="max"> Mejor Puntuación</option>
                        <option value="min"> Menor Puntuación</option>
                    </select>
                    <hr/>
                    <div className='comen'>
                        {comentarios.map((com)=>(
                            <div className='rev' key={com.ID_REVIEW}>
                                <div className='divF'>
                                    <StarRating rating={com.CALIFICACION_R}/>
                                    <h6>{com.FECHA_R.slice(0, 10)}</h6>
                                </div>
                                <div className='divUser'>
                                    <div className='divC'>
                                        <h5>{com.NOMBRE[0]}</h5>
                                    </div>
                                    <h4>{com.NOMBRE} {com.APE1} {com.APE2}</h4>
                                </div>
                                <div className='textComent'> 
                                    <h6>{com.DESCRIPCION_R}</h6>
                                </div>
                            </div>
                        ))}
                    </div>
    
                </div>}
            </div>
        </div>
        <Modal isOpen={modalInsertar} style={{width:"80%"}}>
        <form onSubmit={insertR}>
        <ModalHeader style={{justifyContent:"center"}}>
          <div className="modalH">
            <h3>Escribir una reseña</h3>
          </div>
        </ModalHeader>
        <ModalBody>
            <div className="divModal">
                <label>Calificación</label>
                <div className='starrating' >
                    {[...Array(5)].map((star, index)=>{
                        index+=1;
                        return (
                            <button  type="button"
                            key={index}
                            className={index <= rating ? "on" : "off"}
                            onClick={() => setRating(index)}>
                                <FaStar className='i'/> 
                            </button>
                        );
                    })}
                </div>
                <br/>
                <label>Reseña</label>
                <textarea className="form-control" name="descR" id="descR" cols="30" rows="5" required></textarea><br/>
            </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn enviar" type='submit' >
            Enviar Reseña
          </button>
          <button className="btn cancel" onClick={()=>setModalInsertar(false)}>
            Cancelar Reseña
          </button>
        </ModalFooter>
        </form>
      </Modal>


      <Modal isOpen={modalMsj}>
        <ModalHeader style={{justifyContent:"center"}}>
          <div className="modalH">
            {mensaje.map ((p)=> (
                <h3> {p.MENSAJEBD}</h3>
            ))}
          </div>
        </ModalHeader>
        <ModalFooter>
          <button className="btn enviar" onClick={()=>setModalMsj(false)}>
            Aceptar
          </button>
        </ModalFooter>
      </Modal>

    </>
  )
}

export default DetalleProducto
