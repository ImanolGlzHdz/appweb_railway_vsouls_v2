import React, { useEffect, useState } from 'react';

const Pdfdescargable = () => {
  const [file, setFile] = useState(null);
  const [Pdf, setPdf] = useState([]);

  const selectedHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const sendHandler = () => {
    if (!file) {
      alert('Debes subir un archivo');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);  // Cambiar 'image' a 'pdf' según la API

    fetch(`${import.meta.env.VITE_API}/pdf/post`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.text())
      .then((res) =>{ 
      console.log(res)
      peticionapi()})
      .catch((err) => {
        console.error(err);
      });

    document.getElementById('fileinput').value = null;
    setFile(null);
    
    alert('Se agregó el PDF');
    // Puedes redirigir al usuario a otra página aquí si es necesario
  };
  const peticionapi = () =>{
    // Aquí se realiza la petición GET
    fetch(`${import.meta.env.VITE_API}/pdf/get`)
    .then(respuesta => respuesta.json())
    .then(data => setPdf(data))
    .catch(error => console.error('Error al obtener publicidad:', error));
  }
  
    useEffect(() => {
      peticionapi()
    }, []); 

    const funcionEliminar = (id) => {
      // Realiza una petición DELETE a la URL con el ID
      fetch(`${import.meta.env.VITE_API}/pdf/delete/${id}`, {
        // Especifica que es del método DELETE
        method: "DELETE"
      })
        .then(() => {
          peticionapi()
          
        })
        .catch(error => console.error('Error al eliminar:', error));
    };

  return (
    <div className='todopublicidad todobodypublicidad moveratras'>
      <section className="containerpubli moveratras toptabla">
        <input id="fileinput" onChange={selectedHandler} className="moveratras sizefont form-control" type="file" />
        <button onClick={sendHandler} type="button" className="moveratras sizefont btn btn-primary col-12">Subir PDF</button>
      </section>

      <section className="containerpubli2 moveratras toptabla">
        <div className='moveratras'>
          <table className="table table-dark text-center table-hover moveratras">
            <thead>
              <tr>
                <th scope='col'>Nombre</th>
                <th scope="col text-center">Imagen</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody className='moveratras'>
              {Pdf.map(publicidad => (
                <tr key={publicidad}>
                  <td className='tamanioletra moveratras'>{publicidad}</td>
                  <td className='moveratras'>
                  <object data={`${import.meta.env.VITE_API}/pdf/` + publicidad} type="application/pdf" width="100%" height="600px">
                      <p>El archivo PDF no puede ser mostrado. Puedes <a href={`/pdf/` + publicidad}>descargarlo aquí</a>.</p>
                  </object>
                      </td>
                  <td className='moveratras'>
                    <button className='btn btn-danger margen moveratras' onClick={() => funcionEliminar(publicidad)}><img className='imagenbutttongrandes' width="30" height="30" src="https://img.icons8.com/ios/50/delete--v1.png" alt="delete--v1" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Pdfdescargable;
