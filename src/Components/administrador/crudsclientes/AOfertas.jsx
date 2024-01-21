import React from 'react';
import '../crudpublicidad/publicidadestilos.css';
import { useState, useEffect} from 'react';

export const AOfertas = () => {

    const [prod1, setProd] = useState([]);

    const [oferta, setOferta] = useState({
        
        NOMBRE_OFERTA: '',
        NOMBRE_P: prod1.length > 0 ? prod1[0].NOMBRE_P : '',
        PORCENTAJE_DE_OFERTA: 0,
        FECHA_INICIO: '',
        FECHA_FIN: ''
    })


    

    useEffect(() => {
        const getProd = () => {
          fetch('https://apivsoulsapi8-production.up.railway.app/cmbProd')
          .then(res => res.json())
          .then(data => {
              setProd(data);
            })
            .catch(error => console.error('Error:', error));
        
        }
        getProd()
    }, [])
  

    const handleSelectChange = (e) => {
        const { value } = e.target;
        setOferta(oferta => ({
            ...oferta,
            NOMBRE_P: value
        }));
    }

    const handleChange = e => {

        const { name, value } = e.target;
        const parsedValue = name === 'PORCENTAJE_DE_OFERTA' ? parseInt(value, 10) : value;
       

        
        setOferta(prevOferta => ({
            ...prevOferta,
            [name]: parsedValue
        }));

    }


    const handleSubmit = () => {
        let por = parseInt(oferta.PORCENTAJE_DE_OFERTA, 10)
        if (oferta.NOMBRE_OFERTA === '' || oferta.NOMBRE_P === 'Selecciona...'|| por <= 0 || oferta.FECHA_INICIO === '' || oferta.FECHA_FIN === '' ) {
            alert('Todos los campos son obligatorios')
            return
        }

        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(oferta)
        }

        fetch('https://apivsoulsapi8-production.up.railway.app/ofertaA', requestInit)
        .then(res => res.json())
        .then(res => {
            alert('Oferta Insertada');
            setOferta(res);
          })
          .catch(error => console.error('Error:', error));


        setOferta({
            NOMBRE_OFERTA: '',
            NOMBRE_P: 'Selecciona...',
            PORCENTAJE_DE_OFERTA: 0,
            FECHA_INICIO: '',
            FECHA_FIN: ''
        })


    }


  return (
    <>

        <div class='limitetabla moveratras'>
        
        <section class="containerpubli">     
        <h1 className='titulomio'>OFERTAS</h1> 
        <div >

        <form class="form" onSubmit={handleSubmit}> 
        
            <div className="input-box moveratras">
                <label for="inputEmail4" className='labelpubli'>NOMBRE OFERTA</label>
                <input value={oferta?.NOMBRE_OFERTA} name="NOMBRE_OFERTA" onChange={handleChange} type="text" className='sizefont inputpubli moveratras' id="inputEmail4" required></input>
            </div>
            <div className="input-box moveratras">
                <label for="inputState" className='labelpubli'>NOMBRE DEL PRODUCTO</label>
                <select onChange={handleSelectChange} id="inputState" class="form-select" required>
                <option value="Selecciona..." selected>Selecciona...</option>
                {console.log(prod1)}
                {Array.isArray(prod1) && prod1.map(prod => (
                    <option
                      key={prod.CLAVE_P} value={prod?.NOMBRE_P} >
                        {prod?.NOMBRE_P}
                    </option>
                ))}
                </select>
            </div>
            <div className="input-box moveratras">
                <label for="inputPassword4" className='labelpubli'></label>PORCENTAJE
                <input value={oferta?.PORCENTAJE_DE_OFERTA} name="PORCENTAJE_DE_OFERTA" onChange={handleChange} type="number" className='sizefont inputpubli moveratras' id="inputPassword4" required></input>
            </div>
            <div className="input-box moveratras">
                <label for="inputAddress" className='labelpubli'>FECHA DE INICIO</label>
                <input value={oferta?.FECHA_INICIO} name="FECHA_INICIO" onChange={handleChange} type="date" className='sizefont inputpubli moveratras' id="inputAddress" required></input>
    
                <label for="inputAddress2" className='labelpubli'>FECHA DE FIN</label>
                <input value={oferta?.FECHA_FIN} name="FECHA_FIN" onChange={handleChange} type="date" className='sizefont inputpubli moveratras' id="inputAddress2" required></input>
            </div>
          
            
            <div className="input-box moveratras">
                <button type='submit' className='butonpubli sizefont'>REGISTRAR</button>
            </div>
        </form>
        
            </div>
            </section>
        </div>

    </>
  )
}

export default AOfertas