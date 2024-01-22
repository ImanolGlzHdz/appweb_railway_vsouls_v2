import React from 'react';
import MenuAdministrador from '../../menuadministrador/menudenavegacion/publicidad/publicidadlista';
import Publicidad from '../../crudpublicidad/listapublicidad/listapublicidad';
import '../menustilos.css';

function Menu() {
    return (
        <div className="App menustilo">
            <MenuAdministrador />
            <Publicidad />
        </div>
    );
}

export default Menu;
