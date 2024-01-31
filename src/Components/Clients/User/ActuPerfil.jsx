import React from 'react';
import { useState, useEffect} from 'react';
import { MenuPerfil } from './menuPerfil';
import ruta from './iconoUsuario.png'
import Menu from '../../Menu/Menu'
import Footer from '../../Footer/footer'
import './Perfil.css'
import './Botones.css'

export const ActuPerfil = () => {

    const userId = sessionStorage.getItem('userId');

    const [esVisible] = useState(false);

    const [perfilU, setPerfilU] = useState({
        ID_USUARIO: 0,
        RFC: '',
	    NOMBRE: '',
	    APE1: '',
	    APE2: '',
	    TELEFONO: ''
    });

    
    useEffect(() => {
        const getPerfil = async () => {
            try {
                const userId = sessionStorage.getItem('userId');
               
                const response = await fetch(`http://localhost:5000/cliente/${userId}`);
                const data = await response.json();
                
                setPerfilU(data[0][0]);
            } catch (error) {
                console.error('Error:', error);
               
            }
        }

        getPerfil();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerfilU(perfilU => ({
            ...perfilU,
            [name]: value
            
        }));

    }
    

    const handleUpdate= () => {
  
        if (perfilU.NOMBRE === '' || perfilU.APE1 === '' || perfilU.APE2 === '' || perfilU.TELEFONO === '') {
            alert('Todos los campos son obligatorios')
            return
        }


        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {ID_USUARIO: perfilU.ID_USUARIO,
                RFC: perfilU.RFC,
                NOMBRE: perfilU.NOMBRE,
                APE1: perfilU.APE1,
                APE2: perfilU.APE2,
                TELEFONO: perfilU.TELEFONO})
        }

        fetch('http://localhost:5000/cliente/put', requestInit)
        .then(res => res.text())
        .then(res => {
            setPerfilU(res);
            alert('Datos Actualizados');
          })
          .catch(error => console.error('Error:', error));

    }

    // ----------------------- SUBIR IMAGEN -----------------------------
            
        const [file, setFile] = useState(null);

        const [updateImage, setUpdateImage] = useState(false);

        const selectedHandler1 = (e) => {
        setFile(e.target.files[0]);
        setUpdateImage(true);
        };

        const sendImage = () => {
        if (!file) {
        alert('Debes seleccionar una imagen');
        return;
        }

        const formData = new FormData();
        formData.append('IMG_PERFIL', file);

        const userId = sessionStorage.getItem('userId');
        
        fetch(`http://localhost:5000/imgCliente/upload/${userId}`, {
        method: 'POST',
        body: formData,
        })
        .then((res) => res.json())
        .then((res) => {
            alert(res.message);
            
            setListUpdate(true);
            setUpdateImage(false); 
        })
        .catch((err) => {
            
            alert('Error al subir la imagen');
        });

     
        document.getElementById('formFile').value = null;
        setFile(null);
        };
    // ------------------------------ MOSTRAR IMAGEN -------------------------------

    const [imageList, setImageList] = useState([])
    const [listUpdate, setListUpdate] = useState(false)
    const [currentImage, setCurrentImage] = useState([])
  

        useEffect(() => {
            const getCarrucel = () => {
            fetch(`http://localhost:5000/imgCliente/get/${userId}`)
                .then((res) => res.json())
                .then((data) => {
                setImageList(data);
                })
                .catch((error) => console.error('Error:', error));
            };

            getCarrucel();
            setListUpdate(false);
        }, [listUpdate]);

            


  return (
    <>
<Menu/>

    <section className='borde'>
            <div class="row g-3">
                <div class="col-md-11">
                    <center><h1 className='misTitulos'>ACTUALIZAR DATOS PERSONALES</h1>
                        <form action="#" class="form">
                        
                        <label>
                  <br />
              
                  {imageList.length > 0 ? (
                    imageList.map((image, index) => (
                    <div key={index} className='circle-image'>
                    <img width="100" height="100" className='tamaniouser' src={`http://localhost:5000/${image}`}alt="..." />
                    </div>
                    ))
                    ) : ( 
                    <div className='circle-image'>
                        <img width="90" height="90" className='tamaniouser' src={ruta} alt="Imagen por defecto" />
                    </div>
                    )}
                  <br />
                </label>
                       <br />
                        <br />
                        <div style={{ display: 'flex', alignItems: 'center' }} class="input-group mb-3">
                        <input onChange={selectedHandler1} className="form-control" type="file" id="formFile"/>

                        <button className="e aceptar" for="inputGroupFile02" type='submit' onClick={sendImage}>
                            Subir Imagen
                        </button>
                        </div> <br /><br />
                   

                    </form>
                   </center>
                </div>
                <MenuPerfil/>
            </div>





        <form class="row g-3" onSubmit={handleUpdate}>
            <div style={{ display: esVisible ? 'block' : 'none' }} class="col-md-6">
                <label for="inputEmail4" className="form-label negritas">ID</label>
                <input value={perfilU?.ID_USUARIO|| ''} name="ID_USUARIO" onChange={handleChange} type="text" class="form-control" id="inputEmail4" required></input>
            </div>
         
            <div class="col-md-6">
                <label for="inputPassword4" className="form-label negritas">Nombre</label>
                <input value={perfilU?.NOMBRE|| ''} name="NOMBRE" onChange={handleChange} type="text" class="form-control" id="inputPassword4" required></input>
            </div>
            <div class="col-6">
                <label for="inputAddress" className="form-label negritas">Apellido Paterno</label>
                <input value={perfilU?.APE1|| ''} name="APE1" onChange={handleChange} type="text" class="form-control" id="inputAddress" required></input>
            </div>
            <div class="col-md-6">
                <label for="inputAddress2" className="form-label negritas">Apellido Materno</label>
                <input value={perfilU?.APE2|| ''} name="APE2" onChange={handleChange} type="text" class="form-control" id="inputAddress2" required></input>
            </div>
            <div class="col-md-6">
                <label for="inputCity" className="form-label negritas">Telefono</label>
                <input value={perfilU?.TELEFONO|| ''} name="TELEFONO" onChange={handleChange} type="tel" class="form-control" id="inputCity" required></input>
            </div>
           
            <div class="col-12" className='botonA'>
                <button type="submit" className="aceptar">Actualizar</button>
            </div>
        </form>    

        </section>

        <Footer/>

    </>
  )
}

export default ActuPerfil;
