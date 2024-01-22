import React, { useEffect, useState } from 'react';
import '../crudpublicidad/tablaestilos.css';
import * as XLSX from 'xlsx';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import lupa from './img/lupa.png';
import {format} from 'date-fns'

const InicioPaquetes = () => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  const formattedDate2 = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [ventas, setVentas] = useState([]);
  const [ventasxlx, setVentasxlx] = useState([]);
  const [excelHeader, setExcelHeader] = useState([
    'ID Venta Finalizada',
    'Fecha Venta',
    'ID Venta',
    'ID Producto',
    'Nombre',    
    'Nombre Producto',
    'Precio',
    'Cantidad',
    'Total',
  ]);

  const ventaexcel = () => {
    // Verificar si selectedDate y selectedDate2 son nulos
    
const startDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : formattedDate;
const endDate = selectedDate2 ? format(selectedDate2, 'yyyy-MM-dd') : formattedDate2;
// console.log(startDate, endDate)
    // Realizar la solicitud a la API para obtener las ventas
    fetch(`${import.meta.env.VITE_API}/ventas/${startDate}/${endDate}`)
      .then(response => response.json())
      .then(data => {
      console.log(`${import.meta.env.VITE_API}/ventas/${formattedDate2}/${formattedDate2}`)
      // Verificar si data es un array y tiene elementos
      if (Array.isArray(data) && data.length > 0) {
        // Actualizar el estado con las ventas
        setVentasxlx(data[0]);
      } else {
        console.error('Formato de datos no esperado:', data);
      }
    })
    .catch(error => console.error('Error al obtener las ventas:', error));
};

const ventanormaldeinicio = () => {
  const startDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : formattedDate;
  const endDate = selectedDate2 ? format(selectedDate2, 'yyyy-MM-dd') : formattedDate2;

  fetch(`${import.meta.env.VITE_API}/ventas/${startDate}/${endDate}`)
    .then(response => response.json())
    .then(data => {
      if (data && Array.isArray(data[0])) {
        const ventasProcesadas = data[0].reduce((result, venta) => {
          const { ID_VENTA_SOCIOS, TOTAL, ...rest } = venta;
          const existingVenta = result.find(item => item.ID_VENTA_SOCIOS === ID_VENTA_SOCIOS);

          if (existingVenta) {
            existingVenta.productos.push(rest);
            existingVenta.total = venta.TOTAL; // Corregido a minúscula
          } else {
            result.push({
              ID_VENTA_SOCIOS,
              nombre: venta.NOMBRE, // Corregido a minúscula
              total: venta.TOTAL,
              productos: [rest],
            });
          }

          return result;
        }, []);

        setVentas(ventasProcesadas);
      } else {
        console.error('Formato de datos no esperado:', data);
      }
    })
    .catch(error => console.error('Error al obtener las ventas:', error));
};


  useEffect(() => {
    ventaexcel();
    ventanormaldeinicio();
  }, []); // El segundo argumento es un array de dependencias, en este caso, está vacío para que se ejecute solo una vez al montar el componente.

const buscarventas = () =>{
  ventaexcel();
    ventanormaldeinicio();
}


  const exportToExcel = () => {
    if (!ventasxlx || !Array.isArray(ventasxlx)) {
      console.error('No hay datos de ventas para exportar a Excel.');
      return;
    }

    const wb = XLSX.utils.book_new();
    // Obtener la fecha actual y formatearla
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    // Crear la hoja de cálculo con el encabezado y los datos de ventas
    const ws_data = [excelHeader, ...ventasxlx.map(venta => [
      venta.ID_VENTA_SOCIOS,
      new Date(venta.FECHA_VENTA).toLocaleString(),
      venta.ID_VENTAFINZALIZADA,
      venta.ID_VENTA_SOCIOS,
      venta.NOMBRE,
      venta.NOMBRE_PRODUCTO,
      venta.PRECIO,        
      venta.CANTIDAD,
      venta.PRECIO * venta.CANTIDAD,
    ])];
    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    // Agregar la hoja de cálculo al libro
    XLSX.utils.book_append_sheet(wb, ws, 'Ventas');

    // Descargar el archivo Excel
    XLSX.writeFile(wb, `VENTAS_${formattedDate}.xlsx`);
  };

  return (
    <div className='todopublicidad todobodypublicidad moveratras'>
      <section className="limitetabla containerpubli2 moveratras">
      <div className="container2 mt-5 moveratras">
      <div className="col moveratras">
      <h1 className='h1estilos limitetabla moveratras'>Ventas</h1>
    </div>
  <div className="row align-items-center moveratras">
    
    <div className="d-flex tableqery2 justify-content-between moveratras">
      <h2>Rango de:</h2>
      <DatePicker
  selected={selectedDate}
  onChange={(date) => setSelectedDate(date)}
  className='custom-datepicker'
  dateFormat="yyyy/MM/dd" // Establece el formato del DatePicker
  placeholderText={formattedDate}
/>
      <h2> a </h2>
      <DatePicker
  selected={selectedDate2}
  onChange={(date) => setSelectedDate2(date)}
  className='custom-datepicker'
  dateFormat="yyyy/MM/dd" // Establece el formato del DatePicker
  placeholderText={formattedDate}
/>
      <button className='sizefont btn btn-primary' onClick={buscarventas}>
        <img className='imagenbutttongrandes' src={lupa} alt="" />
      </button>
      <button className='sizefont btn btn-success' onClick={exportToExcel}>Exportar a Excel</button>
    </div>
  </div>
</div>

{ventas.map(venta => (
  <div className='moveratras' key={venta.ID_VENTA_SOCIOS}>
    <h2 className='moveratras'>Usuario: {venta.nombre}</h2>
    <h3 className='moveratras'>Total de la compra: ${venta.total}</h3>
    <table className="table moveratras table-dark table-hover moveratras">
      <thead>
        <tr>
          <th>ID Venta Finalizada</th>
          <th>ID Producto</th>
          <th>Nombre Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Fecha Venta</th>
        </tr>
      </thead>
      <tbody className='moveratras'>
        {venta.productos.map(producto => (
          <tr className='moveratras' key={producto.ID_VENTAFINZALIZADA}>
            <td className='moveratras'>{producto.ID_VENTAFINZALIZADA}</td>
            <td className='moveratras'>{producto.ID_PRODUCTO}</td>
            <td className='moveratras'>{producto.NOMBRE_PRODUCTO}</td>
            <td className='moveratras'>{producto.PRECIO}</td>
            <td className='moveratras'>{producto.CANTIDAD}</td>
            <td className='moveratras'>{new Date(producto.FECHA_VENTA).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
))}

      </section>
    </div>
  );
}

export default InicioPaquetes;
