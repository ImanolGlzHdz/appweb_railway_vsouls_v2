import React from 'react';
import { useState, useEffect} from 'react';
import MenuPerfil from '../Menu/menusocios'
import MenuPerfilruedita from '../../Clients/User/menuPerfil'
import '../../Clients/User/Perfil.css'
import ruta from '../../Clients/User/iconoUsuario.png'


export const Perfil = () => {

    useEffect(() => {
        const getPerfil = async () => {
            try {
                const userId = sessionStorage.getItem('userId');
                console.log(userId);

                const response = await fetch(`https://apivsoulsapi8-production.up.railway.app/cliente/${userId}`);
                const data = await response.json();
                console.log(data);
                setPerfilM(data[0][0]);
            } catch (error) {
                console.error('Error:', error);
               
            }
        }

        getPerfil();
    }, []);

    const [perfilM, setPerfilM] = useState([]);

    //-------------- OBTENER IMAGEN--------------------

    const [imageList, setImageList] = useState([])
    const [listUpdate, setListUpdate] = useState(false)
    const [currentImage, setCurrentImage] = useState(null)
  
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        const getCarrucel = () => {
            if (currentImage) {
                // Asegúrate de que currentImage no sea nulo antes de intentar dividirlo
                const imageID = currentImage.split('-');
                console.log(imageID[0])
        
                if (imageID.length > 0) {
                const imageId = parseInt(imageID[0]);
        
                    console.log(imageId)
            
                    fetch(`https://apivsoulsapi8-production.up.railway.app/imgCliente/get/${userId}`)
                    .then(res => res.json())
                    .then(data => {
                        // Actualizar el estado con los datos de la base de datos
                        console.log(data);
                        setImageList(data);
                    })
                    .catch(error => console.error('Error:', error));
            
                    console.log('imageList'+imageList);
                }
            }
        }
        getCarrucel()
        setListUpdate(false)
        }, [listUpdate])

   console.log(imageList.length)


  return (
    <>
<MenuPerfil/>
        <section className='borde'>
        <form class="row g-3">
            <div class="row g-3">
            
                <div class="col-md-11">
        
                    <center>
                        <h1>Perfil</h1>
                        <label >
                            <br />
                            {imageList.length > 0 ? (
                                imageList.map((image, index) => (
                                <div key={index} className='circle-image'>
                                <img width="100" height="100" className='tamaniouser' src={`https://apivsoulsapi8-production.up.railway.app/${image}`}alt="..." />
                                </div>
                                ))
                                ) : ( 
                                <div className='circle-image'>
                                    <img width="90" height="90" className='tamaniouser' src={ruta} alt="Imagen por defecto" />
                                </div>
                                )}
                            <br />
                        </label><br />

                        
                    </center>
                </div>
                
                <MenuPerfilruedita/>
            </div>
            <br />
        
            <div class="col-md-6">
                <b>
                    <label for="inputEmail4" class="form-label">RFC</label>
                </b>
                <input value={perfilM?.RFC|| ''} name="RFC" type="text" class="form-control" id="inputEmail4" disabled></input>
            </div>
            <div class="col-md-6">
                <b>
                    <label for="inputPassword4" class="form-label"></label>Nombre
                </b>
                <input value={perfilM?.NOMBRE|| ''} name="NOMBRE"  type="text" class="form-control" id="inputPassword4" disabled></input>
            </div>
            <div class="col-6">
                <b>
                    <label for="inputAddress" class="form-label">Apellido Paterno</label>
                </b>
                <input value={perfilM?.APE1|| ''} name="APE1" type="text" class="form-control" id="inputAddress"  disabled></input>
            </div>
            <div class="col-md-6">
                <b>
                    <label for="inputAddress2" class="form-label">Apellido Materno</label>
                </b>
                <input value={perfilM?.APE2|| ''} name="APE2" type="text" class="form-control" id="inputAddress2" disabled></input>
            </div>
            <div class="col-md-6">
                <b>
                    <label for="inputCity" class="form-label">Correo Electronico</label>
                </b>
                <input value={perfilM?.CORREO|| ''} name="CORREO" type="email" class="form-control" id="inputCity" disabled></input>
            </div>
            <div class="col-md-6">
                <b>
                    <label for="inputCity" class="form-label">Telefono</label>
                </b>
                <input value={perfilM?.TELEFONO|| ''} name="TELEFONO" type="tel" class="form-control" id="inputCity" disabled></input>
            </div>
            <div class="col-md-12">
                <b>
                    <label for="inputCity" class="form-label">Dirección</label>
                </b>
                <input value={perfilM?.DIRECCION|| ''} name="DIRECCION" type="text" class="form-control" id="inputCity" disabled></input>
            </div>
           
        </form>    

        </section>
    </>
  )
}


export default Perfil;