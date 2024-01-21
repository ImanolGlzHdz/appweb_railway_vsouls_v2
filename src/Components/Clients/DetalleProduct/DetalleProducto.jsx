import React, {useState, useEffect} from 'react'
import './stylesdetalleprod.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Modal, ModalBody, ModalHeader, ModalFooter }from 'reactstrap';
import { FaRegHeart,FaCartPlus,FaCheckCircle, FaStar,FaRegStar } from 'react-icons/fa';
import StarRating from './StarRating';
import Catalogo, {product,o} from '../Catalogo/Catalogo';
import Favoritos,{productoF} from '../Favoritos/Favoritos';
import {prod} from '../PaginaPrincipal/Principal2';
import { prodCarrito } from '../NavegacionClients/Carrito';

const DetalleProducto = () => {
    var o;
    const [ofertas, setOfertas] = useState([])
    const [carritoData, setCarritoData] = useState([]);
    const [cantidades, setCantidades] = useState({});
    const navigate = useNavigate();
    const [user,setUser]=useState();
    useEffect(() => {
        const rol = sessionStorage.getItem('rol');
        setUser(rol)
        //console.log(user)
    })
    useEffect(() => {
        const getOfertas = () => {
            fetch('https://apivsoulsapi8-production.up.railway.app/ofertaC')
                .then(res => res.json())
                .then(data => {
                    setOfertas(data);
                })
                .catch(error => console.error('Error:', error));
        }
        getOfertas()
    }, [])
    useEffect(() => {
        const fetchCarritoData = async () => {
          try {
            const userId = sessionStorage.getItem('userId');
            const response = await axios.get(`https://apivsoulsapi8-production.up.railway.app/ver-carrito/${userId}`);
    
            if (response.data.length > 0) {
              const cantidadesIniciales = {};
    
              response.data[0].forEach(item => {
                cantidadesIniciales[item.CLAVEPRODUCTO] = item.CANTIDADC;
              });
    
              setCarritoData(response.data[0]);
              setCantidades(cantidadesIniciales);
            } else {
              console.error('La respuesta del servidor no contiene datos.');
            }
          } catch (error) {
            console.error('Error al recuperar datos del carrito:', error);
          }
        };
    
        fetchCarritoData();
      });
    var producto;
    const irLogin = ()=>{
        navigate("/login")
    }
    if(Object.keys(productoF).length === 0 && Object.keys(product).length === 0 && Object.keys(prodCarrito).length === 0){
        //console.log(prod);
        producto = prod;
    }else if(Object.keys(productoF).length === 0 && Object.keys(prod).length === 0 && Object.keys(prodCarrito).length === 0){
        //console.log(product,o);
        producto= product;
    }else if(Object.keys(product).length === 0 && Object.keys(prod).length === 0 && Object.keys(prodCarrito).length === 0){
        //console.log(prod);
        producto= productoF;
    }else{
        producto=prodCarrito
    }
    const contentOptions = [
        {id:1, n:'Descripcion', text:(producto.DESCRIPCION_P)},
        {id:2, n:'Beneficios', text:(producto.BENEFICIOS_P)}
    ];
    const [comentarios, setCometarios]=useState([]);
    const cantComentarios = comentarios.length;
    console.log(producto)
    const [mensaje, setMensaje]= useState([]);

    const [modalInsertar, setModalInsertar] = useState (false);
    const [modalMsj, setModalMsj] = useState (false);
    const [modalExist, setModalExist] = useState (false);
    const [modalAdd, setModalAdd] = useState (false);
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
          fetch('https://apivsoulsapi8-production.up.railway.app/review/'+ producto.CLAVE_P)
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
                fetch('https://apivsoulsapi8-production.up.railway.app/reviewRecientes/'+ producto.CLAVE_P)
                .then(res => res.json())
                .then(res => setCometarios(res))
              }
              getProds()
        }else if (a === 'max'){
            const getProds = () => {
                fetch('https://apivsoulsapi8-production.up.railway.app/reviewMax/'+ producto.CLAVE_P)
                .then(res => res.json())
                .then(res => setCometarios(res))
              }
              getProds()
        }else {
            const getProds = () => {
                fetch('https://apivsoulsapi8-production.up.railway.app/reviewMin/'+ producto.CLAVE_P)
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
        if(cantidad >= producto.STOCK_P) {
            setCantidad(cantidad)
        }else{
            setCantidad(cantidad+1)
        }
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
            const userId = sessionStorage.getItem('userId');
            const newReview={CLAVE_P:(producto.CLAVE_P), ID_USUARIO: userId, DESCRIPCION_R:desc, CALIFICACION_R:rating, FECHA_R:FECHA_R};
            console.log(newReview);
            const requestInit = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newReview)
            }
            fetch('https://apivsoulsapi8-production.up.railway.app/new/review', requestInit)
            .then(res => res.json())
            .then(res => setMensaje(res));
            setRating(0);
            setModalInsertar(false);
            setListUpdateR(true);
            setModalMsj(true);
            
        }
    }
    const addCarrito = ()=>{

        console.log(carritoData)
        if(carritoData.filter(x=>x.CLAVEPRODUCTO === producto.CLAVE_P).length){
            setModalExist(true)
        }else{
            console.log('No existe')
            const userId = sessionStorage.getItem('userId');    
            const clavep = producto.CLAVE_P
            const cantc = cantidad
            console.log(userId,clavep,cantc)
            const requestInit = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
            }
            fetch(`https://apivsoulsapi8-production.up.railway.app/insertarProductCarro/${userId}/${clavep}/${cantc}`, requestInit)
            .then(res => res.json())
            .then(res => console.log(res));
            setModalAdd(true)
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
        <div class='contDp'>
            <div class='wrapperDp' key={producto.CLAVE_P}>
                <div class='wrapperI'>
                    <div class='image-wrapper'>
                        <img class='imgContent' src={'https://apivsoulsapi8-production.up.railway.app/products/'+ producto.CLAVE_P + '-IMG_PRINCIPAL.png'} alt="" />
                        <img class='imgContent' src={'https://apivsoulsapi8-production.up.railway.app/products/'+ producto.CLAVE_P + '-IMG1.png'} alt="" />
                        <img class='imgContent' src={'https://apivsoulsapi8-production.up.railway.app/products/'+ producto.CLAVE_P + '-IMG2.png'} alt="" />
                        <img class='imgContent' src={'https://apivsoulsapi8-production.up.railway.app/products/'+ producto.CLAVE_P + '-IMG3.png'} alt="" />
                    </div>
                    <div class='imgPrincipal'>
                        <img  id='mainPhoto' src={'https://apivsoulsapi8-production.up.railway.app/products/'+ producto.CLAVE_P + '-IMG_PRINCIPAL.png'} alt="" />
                    </div>
                </div>
                <div className='wrapperF'>
                    <div className='detalles'>
                        <h2>{producto.NOMBRE_P}</h2>
                        {ofertas.filter(x=>x.CLAVE_P === producto.CLAVE_P).length ?
                        <div className='precio'>
                            <h4>${producto.PRECIO_P} MXN</h4>
                            <h3>${o=((ofertas.find((oferta) => oferta.CLAVE_P === producto.CLAVE_P)).PRECIO_D)}MXN</h3>
                        </div>:
                        <div className='precio'>
                            <h3>${producto.PRECIO_P} MXN</h3>
                        </div>
                        }<hr/>
                        <div className='carr'>
                            <div className='cant'>
                                <h4>Cantidad: </h4>

                                <div className='cantidad-input'>
                                    <div className='botonCantidadD' onClick={disminuirCantidad}>-</div>
                                        <input type="number" value={cantidad} onChange={handleCantidadChange} min={1} />
                                    <div className='botonCantidadD' onClick={aumentarCantidad}>+</div>
                                </div>
                            </div>{user==='null'?
                            <div class='btn'>
                                <button className='btnAdd  boton-carga' onClick={()=> irLogin()}>
                                    <FaCartPlus class='iconC'/>
                                    <span> Agregar</span>
                                </button>
                            </div>:                            <div class='btn'>
                                <button class='btnAdd' onClick={()=> addCarrito()}>
                                    <FaCartPlus class='iconC'/>
                                    <span> Agregar</span>
                                </button>
                            </div>}
                        </div>
                        <div className='descB'>
                            <div class='division'>  
                                {contentOptions.map((option) => (
                                    <li style={{listStyle:'none'}}
                                        key={option.id}
                                        className={option === selectedOption ? 'active' : ''}
                                        onClick={() => handleOptionClick(option)}
                                    >
                                        <div class='d'>
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
            <div class='wrapperCal'>
                <div class='review'>
                    <h2>Lo que dicen nuestros Clientes</h2>
                    <div class='review-div'>
                        <span><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/> Basado en {cantComentarios} {cantComentarios<2 ? 'reseña' : 'reseñas'} </span>
                        <button className='boton-carga' onClick={()=>setModalInsertar(true)}>Escribir una reseña</button>
                    </div>
                </div>
                {cantComentarios === 0 ?
                <div></div>:
                <div class='coment'>
                    <hr />
                    <select name='filtro' onChange={filtroChange}>
                        <option value="reciente"> Mas recientes</option>
                        <option value="max"> Mejor Puntuación</option>
                        <option value="min"> Menor Puntuación</option>
                    </select>
                    <hr/>
                    <div class='comen'>
                        {comentarios.map((com)=>(
                            <div class='rev' key={com.ID_REVIEW}>
                                <div class='divF'>
                                    <StarRating rating={com.CALIFICACION_R}/>
                                    <h6>{com.FECHA_R.slice(0, 10)}</h6>
                                </div>
                                <div class='divUser'>
                                    <div class='divC'>
                                        <h5>{com.NOMBRE[0]}</h5>
                                    </div>
                                    <h4>{com.NOMBRE} {com.APE1} {com.APE2}</h4>
                                </div>
                                <div class='textComent'> 
                                    <h6>{com.DESCRIPCION_R}</h6>
                                </div>
                            </div>
                        ))}
                    </div>
    
                </div>}
            </div>
        </div>
        <Modal isOpen={modalInsertar}>
        <form onSubmit={insertR}>
        <ModalHeader style={{justifyContent:"center"}}>
          <div class="modalH">
            <h3>Escribir una reseña</h3>
          </div>
        </ModalHeader>
        <ModalBody>
            <div className="divModal">
                <label>Calificación</label>
                <div class='starrating' >
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
          <div class="modalH">
            {mensaje.map ((p)=> (
                <h3 style={{textTransform:"none"}}> {p.MENSAJEBD}</h3>
            ))}
          </div>
        </ModalHeader>
        <ModalFooter>
            <div>
                <button className="btn enviar  boton-carga"  style={{margin:"5%"}} onClick={()=>setModalMsj(false)}>
                Aceptar
                </button>
            </div>

        </ModalFooter>
      </Modal>

      <Modal isOpen={modalAdd}>
        <ModalBody>
          <div class="modalH">
                <h5>PRODUCTO AGREGADO</h5>
                <br></br>
                <a href="/cliente/carrito">Ver carrito</a>
          </div>
          </ModalBody>
          <button className="btn enviar boton-carga"  style={{margin:"5%"}} onClick={()=>setModalAdd(false)}>
            Aceptar
          </button>
      </Modal>

      <Modal isOpen={modalExist}>
        <ModalBody>
          <div class="modalH">
                <h5>EL PRODUCTO YA EXISTE EN EL CARRITO</h5>
                <br></br>
                <a href="/cliente/carrito">Ver carrito</a>
          </div>
          </ModalBody>
          <button className="btn enviar boton-carga" style={{margin:"5%"}} onClick={()=>setModalExist(false)}>
            Aceptar
          </button>
      </Modal>

    </>
  )
}

export default DetalleProducto
