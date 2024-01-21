// import Footer from '../footer/footer'
import Menu from '../../menuadministrador/menudenavegacion/publicidad/publicidadlista'
import Agregar from '../../crudpublicidad/crudpublicidad'
import '../menustilos.css'


function menu(){
    return(
      <div className="App menustilo">
              <Menu/> 
              <Agregar></Agregar>
      </div>
    )
}

export default menu;