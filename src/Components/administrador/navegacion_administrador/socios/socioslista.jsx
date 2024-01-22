// import Footer from '../footer/footer'
import Menu from '../../menuadministrador/menudenavegacion/socios/socioslista'
import Socios from '../../crudsocios/listasocios'
import '../menustilos.css'


function menu(){
    return(
      <div className="App menustilo">
              <Menu/> 
              <Socios></Socios>
      </div>
    )
}

export default menu;