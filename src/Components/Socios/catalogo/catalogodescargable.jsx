import React, { useEffect, useState } from 'react'
// import urlpdf from './catalogovs.pdf'

const Catalogodescargable = () => {
  const [Pdf, setPdf] = useState([]);
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

  return (
    <div>
      {Pdf.map(pdfs => (
      <object data={`${import.meta.env.VITE_API}/pdf/` + pdfs}  type="application/pdf" width="100%" height="600px">
    <p>El archivo PDF no puede ser mostrado. Puedes <a href={`${import.meta.env.VITE_API}/pdf/` + pdfs} >descargarlo aquí</a>.</p>
</object>
))}
</div>
  )
}

export default Catalogodescargable