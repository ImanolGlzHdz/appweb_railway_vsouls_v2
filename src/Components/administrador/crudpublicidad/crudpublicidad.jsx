import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ImageUploader() {
  const [file, setFile] = useState(null)
  let navigate = useNavigate();
  const selectedHandler = e => {
    setFile(e.target.files[0])
  }

  const sendHandler = () => {
    if(!file){
      alert('you must upload file')
      return
    }

    const formdata = new FormData()
    formdata.append('image', file)

    fetch('https://apivsoulsapi8-production.up.railway.app/publicidad/post', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => {
      console.error(err)
    })

    document.getElementById('fileinput').value = null
    
    setFile(null)
    alert('Se agrego la imagen')
    navigate('/menupublicidadLista')
    }
  
  return (
    <div className='todopublicidad todobodypublicidad '>
          <section className=" containerpubli moveratras toptabla">  
          <input id="fileinput" onChange={selectedHandler} className="moveratras sizefont form-control" type="file"/>
          <button onClick={sendHandler} type="button" className="moveratras sizefont btn btn-primary col-12">Upload</button>
          </section>
    </div>
  );
}

export default ImageUploader;
