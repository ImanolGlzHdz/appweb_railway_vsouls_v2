import React,{useState,useRef, useEffect} from 'react'
import './stylesAdminProd.css';
import {Modal, ModalBody, ModalHeader, ModalFooter, Button }from 'reactstrap';
import { FaSearch } from 'react-icons/fa';

const AdminProductos = () => {
  const [productos, setProductos]=useState([]);
  const [imgList,setImgList]=useState([])
  const [text, setText]=useState()
  const [listUpdatedP, setListUpdatedP] = useState(false);
  const [listUpdatedIL, setListUpdatedIL] = useState(false);
  const fileInputRef = useRef(null);
  const [modalInsertar, setModalInsertar] = useState (false);
  const [modalActualizar, setModalActualizar] = useState (false);
  const [modalEditarImg, setModalEditarImg] = useState (false);
  const [modalActI, setModalActI] = useState (false);
  const imagenes=[
    {id:1, titulo: 'Imagen Principal',tipoI: 'IMG_PRINCIPAL'},
    {id:2, titulo: 'Imagen 1',tipoI: 'IMG1'},
    {id:3, titulo: 'Imagen 2',tipoI: 'IMG2'},
    {id:4, titulo: 'Imagen 3',tipoI: 'IMG3'}]
  const [imgSelect, setImgSelect]= useState({tipoI:'null'})

  const [file, setFile] = useState({image:null, img1: null, img2:null, img3: null});
  const [formData, setFormData] = useState({ clave: '', nombre: '',desc:'', benf:'',precio:null, stock:null, status:1});
  const [productSelect, setProductSelect] = useState({
    CLAVE_P: '', NOMBRE_P: '',
    DESCRIPCION_P:'', BENEFICIOS_P:'',
    PRECIO_P:null, PRECIO_SOCIO_P:null, STOCK_P:null});

  useEffect(() => {
    const getProds = () => {
      fetch(`${import.meta.env.VITE_API}/products`)
      .then(res => res.json())
      .then(res => setProductos(res))
    }
    getProds()

    setListUpdatedP(false)

  },[listUpdatedP])

  useEffect(()=>{
    fetch(`${import.meta.env.VITE_API}/imagesI`)
      .then(res => res.json())
      .then(res => setImgList(res))
      .catch(err => {
        console.error(err)
      })
      setListUpdatedIL(false)
  }, [listUpdatedIL])

  const selectedHandler = e => {
    setFile({
      ...file,
      [e.target.name]: e.target.files[0],
    });
  }

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const searchChange = (e)=>{
    e.preventDefault();
    const text = e.target.value;
    
    if(text==""){
      setListUpdatedP(true)
      console.log('No hay texto');
    }else{
      console.log(text);
      const getProds = () => {
        fetch(`${import.meta.env.VITE_API}/productos/buscador/`+ text )
        .then(res => res.json())
        .then(res => setProductos(res))
      }
      getProds()
    } 
  }

  const sendHandler = () => {
    const { clave, nombre, desc, benf, precio, stock } = formData;
    const { image, img1, img2, img3 } = file;

    const formdata = new FormData()
    formdata.append('CLAVE_P', clave);
    formdata.append('NOMBRE_P', nombre);
    formdata.append('DESCRIPCION_P', desc);
    formdata.append('BENEFICIOS_P', benf);
    formdata.append('PRECIO_P', precio);
    formdata.append('STOCK_P', stock);
    formdata.append('IMG_PRINCIPAL', image);
    formdata.append('IMG1', img1);
    formdata.append('IMG2', img2);
    formdata.append('IMG3', img3);

    console.log(formdata)
    fetch(`${import.meta.env.VITE_API}/create/product`, {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => {
      console.error(err)
    })
    setListUpdatedP(true);
    {/*setListUpdatedIL(true)*/}
    setModalInsertar(false);
}

  const abrirModalInsertar=()=>{
    setModalInsertar(true);
  }

  const seleccionarProduct=(prod)=>{
    setProductSelect(prod);
    setModalActualizar(true);
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setProductSelect((prevState)=>({
      ...prevState,
      [name]: value
    })); 
  }

  const actualizar = () =>{
    const CLAVE_P = productSelect.CLAVE_P;
    const NOMBRE_P = productSelect.NOMBRE_P;
    const DESCRIPCION_P = productSelect.DESCRIPCION_P;
    const BENEFICIOS_P = productSelect.BENEFICIOS_P;
    const PRECIO_P = productSelect.PRECIO_P;
    const PRECIO_SOCIO_P = productSelect.PRECIO_SOCIO_P;
    const STOCK_P = productSelect.STOCK_P;

    const actProducto = {"NOMBRE_P":NOMBRE_P, "DESCRIPCION_P":DESCRIPCION_P, "BENEFICIOS_P":BENEFICIOS_P, "PRECIO_P":PRECIO_P,"PRECIO_SOCIO_P":PRECIO_SOCIO_P,"STOCK_P":STOCK_P};

    const requestInit = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(actProducto)
    }
    fetch(`${import.meta.env.VITE_API}/update/productos/` + CLAVE_P, requestInit)
    .then(res => res.text())
    .then(res => res=== "Producto Actualizado" ?
    setListUpdatedP(true) : console.log('No se actualizo'));
   
    setModalActualizar(false)
  } 

  const handleButtonClick = (img) => {
    // Simula el clic en el input de tipo file
    fileInputRef.current.click();
    setImgSelect(img.tipoI)
  };

  const handleFileChange = (e) => {
    setModalActualizar(false)
    // Maneja el cambio de archivo
    const selectedFile = e.target.files[0];
    const CLAVE_P = productSelect.CLAVE_P;

    if (selectedFile) {
      const formdata = new FormData()
      formdata.append('tipoI', imgSelect);
      formdata.append(imgSelect, selectedFile);
      fetch(`${import.meta.env.VITE_API}/actualizarI/`+ CLAVE_P, {
        method: 'PUT',
        body: formdata
      })
      .then(res => res.text())
      .then(res => console.log(res))
      .catch(err => {
        console.error(err)
      })
      setListUpdatedIL(true);
      setModalEditarImg(false);

      window.location.reload(false)

    }else{
      alert ('No se selecciono');
    }
  }

  const inhabilitar =(prod)=>{
    const CLAVE_P= prod.CLAVE_P;
    const STATUS_P=({STATUS_P:0});

    const requestInit = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(STATUS_P)
    }
    fetch(`${import.meta.env.VITE_API}/update/productos/` + CLAVE_P, requestInit)
    .then(res => res.text())
    .then(res => console.log(res));

    setListUpdatedP(true);
}
const habilitar =(prod)=>{
    const CLAVE_P= prod.CLAVE_P;
    const STATUS_P=({STATUS_P:1});

  const requestInit = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(STATUS_P)
  }
  fetch(`${import.meta.env.VITE_API}/update/productos/` + CLAVE_P, requestInit)
  .then(res => res.text())
  .then(res => console.log(res));

  setListUpdatedP(true);
}

  return (
    <>
      <div className='containerAdmin limitetabla moveratras'>
        {/* <h2 class='titleAdminP'>ADMINISTRACIÓN DE PRODUCTOS</h2> */}
        <div className='wrapperHead moveratras'>
          <div className='divSearch'>
            <div class='fondo moveratras'>
              <input className='moveratras' type="text" placeholder="Buscar" name='texto' id='texto' onChange={searchChange}/>
              <FaSearch className='moveratras iconS'/>
            </div>
          </div>
          <div className='divBtn moveratras'>
            <button onClick={() => abrirModalInsertar()}>Agregar</button>
          </div>
        </div>
        <div className='wrapperAdminP moveratras'>
            {productos.map((prod)=> (
            <div className="cardAdmin" key={prod.CLAVE_P}>
              <img className="cardImgA" src={`${import.meta.env.VITE_API}/products/` + prod.CLAVE_P + '-IMG_PRINCIPAL.png'}  alt="productos" />
              <div className="card-body">
                <h6 className="card-title">{prod.CLAVE_P}</h6>
                <p className="card-text">{prod.NOMBRE_P}</p>
                </div>
                <div className='card-footer'>
                  <button  className="btn edit" onClick={()=> seleccionarProduct(prod)}> Editar</button>
                  {prod.STATUS_P == 1 ?
                    <button  className="btn inha" type='button' onClick={()=> inhabilitar(prod)}> Inhabilitar</button>:
                    <button  className="btn ha" type='button' onClick={()=> habilitar(prod)}> Habilitar</button>
                }
                  
                </div>
            </div>
            
            ))}
        </div>
      </div>
      <Modal className='modalPr' isOpen={modalInsertar} >
        <form onSubmit={sendHandler}>
        <ModalHeader style={{justifyContent:"center"}}>
          <div class="modalH">
            <h3>Agregar Nuevo Producto</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="divModal">
            <div class='divFlex'>
              <div>
                <label>CLAVE</label>
                <input className="form-control" type="text" id="clave" name="clave" style={{width:"75%"}} onChange={handleInputChange} required />
              </div>
              <div>
                <label>Nombre</label>
                <input className="form-control" type="text" name="nombre" id="nombre" onChange={handleInputChange} required /> <br/>
              </div>
            </div>
            <label>Descripción</label>
            <textarea className="form-control" name="desc" id="desc" cols="30" rows="5" onChange={handleInputChange} required ></textarea><br/>
            <label>Beneficios</label>
            <textarea className="form-control" name="benf" id="benf" cols="30" rows="5" onChange={handleInputChange} required ></textarea><br/>
            <div class='divFlex'>
              <label style={{marginLeft:"1%"}}>Precio</label>
              <input className="form-control" type="text" name="precio" id="precio" onChange={handleInputChange} required style={{width:"30%", marginLeft:"10px"}}/>
              <label>Precio Socio</label>
              <input className="form-control" type="text" name="precioSocio" id="precioSocio" onChange={handleInputChange} required style={{width:"30%", marginLeft:"10px"}}/>
            </div>
            <br/>
            <label>Stock</label>
            <input className="form-control" type="text" name="stock" id="stock" onChange={handleInputChange} required style={{width:"20%", marginLeft:"40%"}}/><br/>
            <label>Imagen Principal</label>
            <input className="form-control imgModal" type="file" id="image" name="image" onChange={selectedHandler} required />
            <label>Imagen 1</label>
            <input className="form-control imgModal" type="file" id="img1" name="img1" onChange={selectedHandler} required />
            <label>Imagen 2</label>
            <input className="form-control imgModal" type="file" id="img2" name="img2" onChange={selectedHandler} required />
            <label>Imagen 3</label>
            <input className="form-control imgModal" type="file" id="img3" name="img3" onChange={selectedHandler} required />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn enviar" type='submit'>
            Insertar
          </button>
          <button className="btn cancel" onClick={()=>setModalInsertar(false)}>
            Cancelar
          </button>
        </ModalFooter>
        </form>
      </Modal>

      <Modal className='modalPr' isOpen={modalActualizar}>
        <ModalHeader style={{justifyContent:"center"}}>
          <div className="modalH"><h3>Editar Producto </h3></div>
        </ModalHeader>
        <ModalBody className='divModal'>
          <div class='divFlex'>
            <div>
              <label> Clave: </label>
              <input  className='form-control' id="claveP" name="CLAVE_P" type="text"  value={productSelect && productSelect.CLAVE_P} onChange={handleChange} readOnly style={{width:"75%"}}/>
            </div>
            <div>
              <label> Nombre: </label>
              <input  className='form-control' id="nombreP" name="NOMBRE_P" type="text"  value={productSelect && productSelect.NOMBRE_P} onChange={handleChange} required/><br/>
            </div>
          </div>
          <label> Descripción:  </label>
          <textarea className='form-control' id="descP" name="DESCRIPCION_P" cols="30" rows="5" value={productSelect && productSelect.DESCRIPCION_P} onChange={handleChange} required/><br/>

          <label> Beneficios:  </label>
          <textarea className='form-control' id="benfP" name="BENEFICIOS_P" cols="30" rows="5" value={productSelect && productSelect.BENEFICIOS_P} onChange={handleChange} required/><br/>
          <div class='divFlex'>
              <label class='labelModal'> Precio:</label>
              <input className='form-control' id="precioP" name="PRECIO_P" type="textS" value={productSelect && productSelect.PRECIO_P} onChange={handleChange} required/><br/>

              <label> Precio Socio:  </label>
              <input className='form-control' id="precio_socio_p" name="PRECIO_SOCIO_P" type="textS"value={productSelect && productSelect.PRECIO_SOCIO_P} onChange={handleChange} required/> <br/>
          </div>
          <br/>
          <label> Stock:</label>
          <input className='form-control inputModal' id="stockP" name="STOCK_P" type="textS"value={productSelect && productSelect.STOCK_P} onChange={handleChange} required/> <br/>
          <button className="btn editarImg" onClick={() => setModalEditarImg(true)}>Editar Imagenes</button>
        </ModalBody>
        <ModalFooter>
          <button className="btn enviar" onClick={()=> actualizar()}>Actualizar</button>
          <button className="btn cancel" onClick={()=>setModalActualizar(false)}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal className='modalPr' isOpen={modalEditarImg}>
        <ModalBody>
        <div className='imagenesA'>
            <table className="table table-striped">
              {imagenes.map((img)=> (
              <tr key={img.id}>
                <td>{img.titulo}</td>
                <td><img src={`${import.meta.env.VITE_API}/products/`+ productSelect.CLAVE_P + '-'+ img.tipoI+'.png'}  alt="productos" /></td>
                <td><button className='enviarI' onClick={()=>handleButtonClick(img)}>Editar</button></td>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange}/>

              </tr>
              ))}
            </table>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn enviar" onClick={()=>setModalEditarImg(false)}>
            Listo
          </button>
        </ModalFooter>
    </Modal>
    </>
  )
}

export default AdminProductos
