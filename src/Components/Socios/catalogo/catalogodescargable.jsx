import React, { useEffect, useState } from 'react'
// import urlpdf from './catalogovs.pdf'

const Catalogodescargable = () => {
  const [Pdf, setPdf] = useState([]);
  const peticionapi = () =>{
    // Aquí se realiza la petición GET
    fetch("https://apivsoulsapi8-production.up.railway.app/pdf/get")
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
      <object data={`https://apivsoulsapi8-production.up.railway.app/pdf/` + pdfs}  type="application/pdf" width="100%" height="600px">
    <p>El archivo PDF no puede ser mostrado. Puedes <a href={`https://apivsoulsapi8-production.up.railway.app/pdf/` + pdfs} >descargarlo aquí</a>.</p>
</object>
))}
</div>
  )
}

export default Catalogodescargable