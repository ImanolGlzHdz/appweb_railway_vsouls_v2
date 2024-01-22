import React, {useState, useEffect} from 'react';

export const MostrarCarrucel = () => {

  const [imageList, setImageList] = useState([])
  const [listUpdate, setListUpdate] = useState(false)


  const [currentImage, setCurrentImage] = useState(null)

  useEffect(() => {
    const getCarrucel = () => {
      fetch(`${import.meta.env.VITE_API}/carrucel/get`)
      .then(res => res.json())
      .then(data => {
          setImageList(data);
        })
        .catch(error => console.error('Error:', error));

    }
    getCarrucel()
    setListUpdate(false)
  }, [listUpdate])


  const modalHandler = (image) => {
    setCurrentImage(image);
      handleModalDelete()
    
  };

  const handleModalDelete = () => {
    if (currentImage) {
      const imageID = currentImage.split('-');
      

      if (imageID.length > 0) {
        const imageId = parseInt(imageID[0]);


      fetch(`${import.meta.env.VITE_API}/carrucel/delete/`+ imageId,{
        method: 'DELETE'
      })
      .then(res => res.text())
      .then(res => {
          // Actualizar el estado con los datos de la base de datos
          alert(res);
          setListUpdate(true);
          
        })
        .catch(error => console.error('Error:', error));
        }
      }
      
      
      
      
  };

  return (
    <>
    
    <div class='limitetabla'>
      
    <section className="containerpubli2 moveratras limitetabla ">  
    <h1 className='titulomio'>CARRUCEL CLIENTES</h1>    
    <div className=' moveratras '><br />

    <table className="table table-dark table-hover moveratras">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">IMAGEN</th>
                    <th scope="col"></th>

                    </tr>
                </thead>
                <tbody className='moveratras'>
                {imageList.map((image, index) => 

                        <tr className='moveratras' key={index}>
                            <th className='moveratras' scope="row">{index + 1}</th>
                            <td className='moveratras'>
                            <img width="150" height="100" src={`https://apivsoulsa}pi8-production.up.railway.app/dbimages/${image}`} alt="..."/>
                            </td>
                            <td className='moveratras' >
                                <button className='btn btn-danger margen' onClick={() => modalHandler(image)}>
                                  <img className='imagenbutttongrandes' width="30" height="30" src="https://img.icons8.com/ios/50/delete--v1.png" alt="delete--v1" />
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
                </table>   
    </div>
    </section>
  </div>
    
    </>
  )
}
export default MostrarCarrucel