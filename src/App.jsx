import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//links de inicio
// import Login from './Components/Login'
// import InicioClientes from './Components/Clients/inicioClientes'
//Links de los socios
import InicioSociosrender from './Components/Socios/NavegacionSocios/Inicio'
import Estadisticassociosrender from './Components/Socios/NavegacionSocios/estadisticas'
import Foro_sociosrender from './Components/Socios/NavegacionSocios/foro'
import MisSociosrender from './Components/Socios/NavegacionSocios/missocios'
import Nivelessociosrender from './Components/Socios/NavegacionSocios/niveles'
import Paquetessociosrender from './Components/Socios/NavegacionSocios/paquetes'
import Carritosociorender from './Components/Socios/NavegacionSocios/carrito'
import Miscomprassociorender from './Components/Socios/NavegacionSocios/miscompras'
import Detalleproductosocio from './Components/Socios/NavegacionSocios/detalleproducto'
import Favoritossocios from './Components/Socios/NavegacionSocios/favoritos'
import Catalogosocios from './Components/Socios/NavegacionSocios/catalogo'

//menuadministrador
import InicioAdmin from './Components/administrador/inicioAdmin'
// publicidad
import MenupublicidadAgregaradmin from './Components/administrador/navegacion_administrador/publicidad/menuadminpublicidadagregar'
import MenupublicidadListaadmin from './Components/administrador/navegacion_administrador/publicidad/menuadminpublicidadlista'
// socios
import Menusociosadmin from './Components/administrador/navegacion_administrador/socios/socioslista'
// perfil
import Menuperfilsocios from './Components/Socios/miperfilsocios/miperfilsocios'
//Niveles
import Menunivelesadmin from './Components/administrador/navegacion_administrador/niveles/nivelesinicio'
import Menuniveleseditaradmin from './Components/administrador/navegacion_administrador/niveles/niveleseditar'
import Menuniveleslistaadmin from './Components/administrador/navegacion_administrador/niveles/niveleslista'
// usuarios

//monedas
import Menumonedasinicioademin from './Components/administrador/navegacion_administrador/monedas/monedasinicio'

// primeravez - menuventa
import Menuprimeravezcrear from './Components/administrador/navegacion_administrador/primeravez/primeraveznavegacioncrear'
import Menuprimeravezeditar from './Components/administrador/navegacion_administrador/primeravez/primeraveznavegacioneditar'
import MenuprimeravezLista from './Components/administrador/navegacion_administrador/primeravez/primeraveznavegacion'

import MenuVentavisualizacion from './Components/administrador/navegacion_administrador/ventas/ventasnavegacion'
//paquetes
import Menupaquetessociosadmin from './Components/administrador/navegacion_administrador/paquetes/paquetesinicio'
import Menupaqueteseditaradmin from './Components/administrador/navegacion_administrador/paquetes/paqueteseditar'
import Menupaqueteslistaademin from './Components/administrador/navegacion_administrador/paquetes/paqueteslista'
// ventas
import Menuvalidacionventas from './Components/administrador/navegacion_administrador/validacionventa/validacionventa'
import Menuhistorialventa from './Components/administrador/navegacion_administrador/historialventa/historialventa'
import Menustatusventa from './Components/administrador/navegacion_administrador/statusventa/statusventa'
import Menucomisionventa from './Components/administrador/navegacion_administrador/comisiones/comisiones'
import Menudetallecomision from './Components/administrador/navegacion_administrador/comisiones/comisionesdet'

// usuarios
import Menusuarioregistro from './Components/administrador/navegacion_administrador/usuarios/usuarios'
import Menuusuariosusuarios from './Components/administrador/navegacion_administrador/usuarios/usuariosregistros'
import Menuusauarioactualizar from './Components/administrador/navegacion_administrador/usuarios/usuarioeditar'

import Menuusuariosrol from './Components/administrador/navegacion_administrador/rol/rol'
// inicio
// carrucelcliente
import Menuiniciocarrucel from './Components/administrador/navegacion_administrador/carrucelcliente/carrucelcliente'
import Menuiniciocarrucellista from './Components/administrador/navegacion_administrador/carrucelcliente/lsitacarrucel'

// ofertas
import Menuinicioofertas from './Components/administrador/navegacion_administrador/ofertas/ofertas'
import Menulistaofertas from './Components/administrador/navegacion_administrador/ofertas/ofertaslista'
import Menuactualizarofertas from './Components/administrador/navegacion_administrador/ofertas/ofertaseditar'

// chatbot
import Menuiniciochatbot from './Components/administrador/navegacion_administrador/chatbot/chatbot'
import Menulistachatbot from './Components/administrador/navegacion_administrador/chatbot/chatbotlista'
import Menuactualizarchatbot from './Components/administrador/navegacion_administrador/chatbot/chatbotactualizar'
// vlaidacionventasocios
import Menuventavalidacionsocios from './Components/administrador/navegacion_administrador/validacionventasocios/validacionventasocios'

// productos
import Menuproductosadmin from './Components/administrador/navegacion_administrador/productos/productos'
 
import Carrito from './Components/Clients/NavegacionClients/Carrito';
import DetalleProducto from './Components/Clients/NavegacionClients/DetalleProduct';
import Favorito from './Components/Clients/NavegacionClients/Favorito';
import InicioClientes from './Components/Clients/NavegacionClients/Inicio';
import MisCompras from './Components/Clients/NavegacionClients/MisCompras';
import Productos from './Components/Clients/NavegacionClients/Productos';

import MenuCliente from './Components/Menu/Menu'

import Formulario from './Components/Clients/NavegacionClients/Login';
import Perfil from './Components/Clients/NavegacionClients/Usuario';

import ObtenerToken from './Components/Clients/Formulario/ObtnerToken';
import ObtenerPssw from './Components/Clients/Formulario/RecuperarContraseña'
import Registro from './Components/Clients/Formulario/Registro';
import RegistroC from './Components/Clients/Formulario/Registro_C';


import ActuPerfil from './Components/Clients/User/ActuPerfil';
import Direccion from './Components/Clients/User/Direccion';
import ActuDireccion from './Components/Clients/User/ActuDireccion';
import DireccionesC from './Components/Clients/User/DireccionesC';
import CambiarContra from './Components/Clients/User/CambiarContra';

import VentaExitosa from './Components/Clients/Venta/VentaExitosa'
import VentaRechazada from './Components/Clients/Venta/VentaRechazada'
import VentaPendiente from './Components/Clients/Venta/VentaPendiente'

import ObtenerL from './Components/Clients/PaginaPrincipal/ObtenerL';

// oportunidad de negocio
import Oportunidaddenegocxio from './Components/Clients/oportunidaddenegocio/oportunidaddenegocio'

// Cruds Cliente Roselin
import ActualizarUsuariosA from './Components/administrador/crudsclientes/ActualizarUsuarioA'
import ActualizarChat from './Components/administrador/crudsclientes/ActualizarChat'
import ActualizarOfertasA from './Components/administrador/crudsclientes/ActualizarOfertasA'
import DetallesComisiones from './Components/administrador/crudsclientes/DetallesComision'



// ventas de mercadopago funciones get
import Ventaexitosamercadopago from './Components/ventasmercadopago/ventaexitosa'
import Ventafallidamercadopago from './Components/ventasmercadopago/ventafallida'
import Ventapendientemercadopago from './Components/ventasmercadopago/ventapendiente'
// pdf descargable
import Pdfdesc from './Components/administrador/navegacion_administrador/pdfdescargable/pdfdescargablec'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Rutas socios */}
          {/* Routes Clientes */}
          {/* <Route element={<Login />} path='/' />
          <Route element={<InicioClientes />} path='/' /> */}
          {/* oportunidad de negocio */}
          <Route element={<Oportunidaddenegocxio/>} path='/socios/Oportunidadenegocio' />
          {/* Routes Socios */}
          <Route element={<InicioSociosrender/>} path='/socios/inicio' />
          <Route element={<Estadisticassociosrender />} path='/socios/estadisticas' />
          <Route element={<Foro_sociosrender />} path='/socios/foro' />
          <Route element={<MisSociosrender />} path='/socios/missocios' />
          <Route element={<Nivelessociosrender />} path='/socios/niveles' />
          <Route element={<Paquetessociosrender />} path='/socios/paquetes' />
          <Route element={<Carritosociorender />} path='/socios/carrito' />
          <Route element={<Miscomprassociorender />} path='/socios/compras' />
          <Route element={<Detalleproductosocio />} path='/socios/detalleproduct' />
          <Route element={<Favoritossocios />} path='/socios/favoritos' />
           <Route element={<Catalogosocios />} path='/socios/catalogo' />
          <Route element={<Menuperfilsocios />} path='/socios/perfil' />
          {/* Routes Admin */}
          <Route element={<Menuprimeravezeditar />} path='/menuadminprimeravezeditar' />
          <Route element={<Menuprimeravezcrear />} path='/menuadminprimeravezcrear' />
          <Route element={<MenuprimeravezLista />} path='/menuadminprimeravezlista' />
          <Route element={<MenuVentavisualizacion />} path='/ventas' />
          {/* inicio */}
          <Route element={<InicioAdmin />} path='/inicioAdmin' />
          {/* publicidad */}
          <Route element={<MenupublicidadAgregaradmin/>} path='/menupublicidadAgregar'/>
          <Route element={<MenupublicidadListaadmin/>} path='/menupublicidadLista'/>
          {/* socios */}
          <Route element={<Menusociosadmin/>} path='/menusocioslista'/>
          {/* paquetes */}
          <Route element={<Menupaquetessociosadmin/>} path='/menupaquetesinicio'/>
          <Route element={<Menupaqueteseditaradmin/>} path='/menupaqueteseditar'/>
          <Route element={<Menupaqueteslistaademin/>} path='/menupaqueteslista'/>
          {/* niveles */}
          <Route element={<Menunivelesadmin/>} path='/menunivelesinicio'/>
          <Route element={<Menuniveleseditaradmin/>} path='/menuniveleseditar'/>
          <Route element={<Menuniveleslistaadmin/>} path='/menuniveleslista'/>
          {/* monedas */}
          <Route element={<Menumonedasinicioademin/>} path='/menumonedas'/>
          {/* // ventas */}
          <Route path='/admin/validacionventas' element={<Menuvalidacionventas/>}/>
          <Route path='/admin/validacionventassocios' element={<Menuventavalidacionsocios/>}/>
          <Route path='/admin/historial' element={<Menuhistorialventa/>}/>
          <Route path='/admin/statusventa' element={<Menustatusventa/>}/>
          <Route path='/admin/comisionventa' element={<Menucomisionventa/>}/>
          <Route path='/admin/comisionventa/det' element={<Menudetallecomision/>}/>
          {/* // usuarios */} 
          <Route path='/admin/usuarios' element={<Menuusuariosusuarios/>}/>
          <Route path='/admin/usuarios/registro' element={<Menusuarioregistro/>}/>
          <Route path='/admin/usuarios/editar' element={<Menuusauarioactualizar/>}/>
          <Route path='/admin/rol' element={<Menuusuariosrol/>}/>
          {/* // inicio */}
          <Route path='/admin/carrucel' element={<Menuiniciocarrucel/>}/>
          <Route path='/admin/carrucel/lista' element={<Menuiniciocarrucellista/>}/>
          {/* ofertas */}
          <Route path='/admin/ofertas' element={<Menuinicioofertas/>}/>
          <Route path='/admin/ofertas/lista' element={<Menulistaofertas/>}/>
          <Route path='/admin/ofertas/editar' element={<Menuactualizarofertas/>}/>
          {/* chatbot */}
          <Route path='/admin/chatbot' element={<Menuiniciochatbot/>}/> 
          <Route path='/admin/chatbot/actualizar' element={<Menuactualizarchatbot/>}/> 
          <Route path='/admin/chatbot/lista' element={<Menulistachatbot/>}/> 
          {/* // productos */}
          <Route path='/admin/productosadmin' element={<Menuproductosadmin/>}/>
          {/* Routes Clientes */}
          {/*<Route element={<Login />} path='/' />*/}


        <Route element={<InicioClientes/>} path='/' />

        <Route element={<Formulario />} path='/login' />
        <Route element={<Formulario/>} path='/login/:ID_CLIENTE' />
        <Route element={<Productos />} path='/cliente/catalogo' />
        <Route element={<Favorito />} path='/cliente/favoritos' />
        <Route element={<DetalleProducto />} path='/cliente/detalleProducto' />
        <Route element={<Carrito />} path='/cliente/carrito' />
        <Route element={<Perfil />} path='/cliente/miPerfil' />
        <Route element={<MisCompras />} path='/cliente/misCompras' />
        <Route element={<ObtenerToken />} path='/user/Token' />
        <Route element={<ObtenerPssw />} path='/user/Passw' />
        <Route element={<Registro />} path='/Registro' />
        <Route element={<ObtenerL/>} path='/ObtenerLink'/>
        <Route element={<RegistroC />} path='/Registro/Info' />

        <Route element={<ActuPerfil/>} path='/ActualizarPerfil' />
        <Route element={<Direccion/>} path='/Direccion' />
        <Route element={<ActuDireccion/>} path='/ActualizarDireccion/:ID_DIRECCION' />
        <Route element={<DireccionesC/>} path='/Direcciones' />
        <Route element={<CambiarContra/>} path='/CambiarContrasena' />
        <Route element={<ActualizarUsuariosA/>} path='/ActualizarUsuariosAdministrador/:ID_USUARIO/:ID_DIRECCION' />
        <Route element={<ActualizarChat/>} path='/ActualizarChatBot/:id' />
        <Route element={<ActualizarOfertasA/>} path='/ActualizarOfertasAdministrador/:id' />
        <Route element={<DetallesComisiones/>} path='/DetallesComision/:ID_CLIENTE/:fechaInicio/:fechaFin' />

        <Route element={<VentaExitosa/>} path='/venta-exitosa'/>
        <Route element={<VentaRechazada/>} path='/venta-fallida'/>
        <Route element={<VentaPendiente/>} path='/venta-pendiente'/>
        {/* ventas mercadopago */}
        <Route element={<Ventaexitosamercadopago/>} path='/venta-exitosa-socios'/>
        <Route element={<Ventapendientemercadopago/>} path='/venta-pendiente-socios'/>
        <Route element={<Ventafallidamercadopago/>} path='/venta-fallida-socios'/>
        {/*  */}
        <Route element={<Pdfdesc/>} path='/admin/pdfdes'/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
