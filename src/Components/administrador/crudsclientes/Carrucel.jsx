import React, {useState} from 'react';

export const Carrucel = () => {


    const [file, setFile] = useState(null)

    const selectedHandler = e => {
        setFile(e.target.files[0])
    }

    const sendHandle = () => {
        if(!file){
            alert('Debes Seleccionar Una Imagen')
            return
        }

        const formdata = new FormData()
        formdata.append('image', file)

        fetch('https://apivsoulsapi8-production.up.railway.app/carrucel', {
            method: 'POST',
            body: formdata
        })
        .then(res => res.text())
        .then(res => alert(res))
        .catch(err => {
            console.error(err)
        })

        document.getElementById('formFile').value = null

        setFile(null);
    }

  return (
    <>

        <div className='limitetabla moveratras '>
           
            <section class="containerpubli moveratras toptabla">      
            <h1 class='headerpubli moveratras'>CARRUCEL CLIENTES</h1>
            <form action="#" class="form moveratras">

                <div className="input-box moveratras">
                <label class='labelpubli moveratras' >Selecciona una foto</label>
                <input onChange={selectedHandler} className='moveratras sizefont inputpubli moveratras' type="file" id="formFile"></input> 
                </div>       
                <button onClick={sendHandle} type='submit' className='moveratras butonpubli sizefont'>Agregar</button>
            </form>
            </section>
        </div>

    </>
  )
}


export default Carrucel