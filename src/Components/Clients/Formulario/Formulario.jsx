import React, { useEffect, useState } from "react";
import "./Formulario.css";
import { Link, useNavigate, useParams} from "react-router-dom";
//import NavVacioC from "./NavVacioC";

function Formulario (){


    // --------------------INICIO DE VALIDAR USUARIO ---------------------------------------------
    const [password, setPassword] = useState('');
    const [correo, setCorreo] = useState('');
    const [usuarioId, setUsuarioId] = useState(''); 
    const navigate = useNavigate();
    const { ID_CLIENTE } = useParams();
    const [rolUs, setRolUs] = useState([]);

    
    useEffect(() => {
      const fetchData = async () => {
        try {
          sessionStorage.setItem('ID_CLIENTE', ID_CLIENTE);
        } catch (error) {
          console.error('Error al recuperar datos:', error);
        }
      };

      fetchData();
    }, []);
      
    


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API}/vUsuario`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CORREO: correo,
          PASSWORD: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        var id = data[0].ID_USUARIO;
        var idsocio = data[0].ID_CLIENTE
        if (id != undefined){
            setUsuarioId(data[0].ID_USUARIO);
            
            sessionStorage.setItem('userId', id);
            sessionStorage.setItem('socioid', idsocio)

            try {
              const response = await fetch(`${import.meta.env.VITE_API}/rolUsuario/${id}`);
              const data = await response.json();
        
              
              if (Array.isArray(data[0]) && data[0].length > 0) {
                var rol = data[0][0].ID_ROL;
                sessionStorage.setItem('rolusuario', rol)
                // alert(rol)
              } else {
                
                setRolUs(null);
              }
            } catch (error) {
              console.error('Error:', error);
            }


            
            if(rol == 1){
              navigate("/admin/validacionventassocios");
            } else if(rol == 3){
              navigate("/socios/inicio");
            }else {
              
              navigate("/");
            }
            
            

        }else {
            let err = data[0].RR;
            if (err === 'CONTRASENIA'){
                alert ('LA CONTRASEÑA ES INCORRECTA');
            } else {
                alert ('EL USUARIO ES INCORRECTO');
            }
            
        }
        
      } else {
        console.error("Error en la validación");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
    
    // --------------------FIN DE VALIDAR USUARIO ---------------------------------------------
    return(

        <div className="bodyL">
          
        <div className="formulario">
            <br /><br /> <br /> <br />
            <section className="caja">
                <br />
                <h1>Bienvenido</h1>
                <br />
                    <form onSubmit={handleSubmit}>
                            <div  className="col-md">

                                <div className="form-floating"> 
                                    <input type="email" class="form-control" id="floatingInputValue" value={correo} onChange={(e) => setCorreo(e.target.value)} required></input>
                                
                                  <label for="floatingInputValue" className="L">Correo Electronico</label>
                                
                                </div>
                            </div>
                            <br />
                        <div  className="col-md">
                        
                            <div className="form-floating">
                        
                                <input type="password" className="form-control"  value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                           
                                <label for="floatingInputValue" className="L">Contraseña</label>
                            </div>
                        </div>
                        <br />
                        <a href="/user/Token" className="mb-12"> Olvide Mi Contraseña</a>
                        <br /><br />
                    <div  class="container" className="bon">
                        <div  className="bon" class="row">
                            <div  className="col-6">
                           
                                <button type="submit" className="botonF">Iniciar Sesion</button>
                            
                            </div>
                            <div  className="col-6">
                            <Link to="/Registro">
                                <button className="botonF" >Registrarse</button>
                            </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </section>            
        </div>
        </div>
    )
}

export default Formulario;