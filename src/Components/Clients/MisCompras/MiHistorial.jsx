import React, {useState, useEffect} from 'react'
import './styleshistorialcompra.css'

const MiHistorial = () => {
    const [compras,setCompras]=useState([])
    const [listUpdateC, setListUpdateC] = useState(false);
    const [listaCompras, setListaCompras] = useState([]);

    useEffect(() => {
        const getProds = () => {
          const userId = sessionStorage.getItem('userId');
          fetch('https://apivsoulsapi8-production.up.railway.app/miscompras/'+ userId)
          .then(res => res.json())
          .then(res => setCompras(res))
        }
        getProds()
        setListUpdateC(false);
    }, [listUpdateC])

    useEffect(() => {
        const datosPorID = {};

        compras.forEach((producto) => {
          if (!datosPorID[producto.ID_VENTA]) {
            datosPorID[producto.ID_VENTA] = {
              productos: [],
              FECHA_VENTA: producto.FECHA_VENTA,
              TOTAL_VENTA:producto.TOTAL_VENTA,
              GUIA_VENTA:producto.GUIA_VENTA,
              STATUS_VENTA:producto.STATUS_VENTA,
            };
          }
          datosPorID[producto.ID_VENTA].productos.push({
            CLAVE_P: producto.CLAVE_P,
            NOMBRE_P: producto.NOMBRE_P,
            PRECIO_P: producto.PRECIO_P,
            CANTIDAD:producto.CANTIDAD,
          });
        });
    
        // Convertir el objeto en un array y almacenarlo en el estado
        const productosArray = Object.keys(datosPorID).map((ID_VENTA) => ({
          ID_VENTA: parseInt(ID_VENTA, 10),
          ...datosPorID[ID_VENTA],
        }));
    
        setListaCompras(productosArray);
        
      }, [compras]);

  return (
    <>
    {listaCompras.length === 0 ? <div className='ListVacia'> No cuentas con un historial</div>:
        <div className='contHis'>
            <h1 class='titleHistorial'>HISTORIAL DE COMPRAS</h1>
            {listaCompras.map((item) => (
            <div className='wrapperList' key={item.ID_VENTA}>
                <div className='wrapperEstado'>
                    <div className='estadoCompra'>

                    </div>
                    {item.STATUS_VENTA=== 1?
                    <h5>Enviado</h5>:<h5>En preparacion</h5>}
                </div>
                <table className='tableHistorial'>
                    <tr>
                        <th>---</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                    </tr>
                    {item.productos.map(( prod) => (
                    <tr key={prod.CLAVE_P}>
                        <td><img src={'https://apivsoulsapi8-production.up.railway.app/products/'+ prod.CLAVE_P+ '-IMG_PRINCIPAL.png'} alt="" /></td>
                        <td>{prod.NOMBRE_P}</td>
                        <td>${prod.PRECIO_P}</td>
                        <td>{prod.CANTIDAD}</td>
                    </tr>
                    ))}
                </table>
                <div className='wrapperInfo'>
                    <div> 
                        <h2>Fecha: {item.FECHA_VENTA.slice(0, 10)}</h2>
                    </div>
                    <div>
                        <h2>Total: {item.TOTAL_VENTA}</h2>
                    </div>
                    <div>
                        <h2>NUM de Guia: {item.GUIA_VENTA}</h2>
                    </div>

                </div>
            </div>
            ))}
        </div>}
    </>
  )
}

export default MiHistorial