import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import axios from 'axios';

import "../crudventasangel/componentsAdmin/ValidacionVenta.css"
import logo from '../crudventasangel/componentsAdmin/logoVsouls.png';

const ValidacionVenta = () => {

  const [datosVenta, setDatosVenta] = useState([]);

  const generatePDF = (venta) => {
    if (venta) {
      const doc = new jsPDF();

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);

      doc.addImage(logo, 'JPEG', 140, -5, 60, 40);
      doc.text('Vsouls', 10, 10);
      doc.text('Isidro Huarte #53, centro, Morelia, Michoacán', 10, 15);
      doc.text('Teléfono: 123-456-7890', 10, 20);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);

      doc.text('Datos de la venta', 10, 30);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);

      const direccionDividida = doc.splitTextToSize(venta.direccionEntrega, 180);

      const formattedData = `Número de Venta:  ${venta.numeroVenta}\n` +
        `Nombre cliente: ${venta.nombreCliente}\n` +
        `Dirección de Entrega: \n${direccionDividida.join('\n')}\n` +
        `Fecha: ${venta.fecha}\n` +
        `Productos: \n${venta.productos}\n` +
        `Total: $${venta.total}`;

      doc.text(formattedData, 10, 40);

      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      const facebookLink = 'https://www.facebook.com';
      const whatsappLink = 'https://api.whatsapp.com';
      const tiktokLink = 'https://www.tiktok.com';
      const instagramLink = 'https://www.instagram.com';

      const buttonWidth = 25;
      const buttonHeight = 10;
      const spacing = 5;

      const totalButtonWidth = 4 * buttonWidth + 3 * spacing;

      const centerX = (pageWidth - totalButtonWidth) / 2;

      const facebookX = centerX;
      const whatsappX = facebookX + buttonWidth + spacing;
      const tiktokX = whatsappX + buttonWidth + spacing;
      const instagramX = tiktokX + buttonWidth + spacing;

      const buttonY = pageHeight - buttonHeight - 10;

      doc.setFillColor(59, 89, 152); // Color de fondo de Facebook
      doc.rect(facebookX, buttonY, buttonWidth, buttonHeight, 'F');
      doc.setDrawColor(255); // Borde
      doc.textWithLink('Facebook', facebookX + 5, buttonY + 7, { url: facebookLink });

      doc.setFillColor(37, 211, 102); // Color de fondo de WhatsApp
      doc.rect(whatsappX, buttonY, buttonWidth, buttonHeight, 'F');
      doc.setDrawColor(255); // Borde
      doc.textWithLink('WhatsApp', whatsappX + 5, buttonY + 7, { url: whatsappLink });

      doc.setFillColor(255, 0, 80); // Color de fondo de TikTok
      doc.rect(tiktokX, buttonY, buttonWidth, buttonHeight, 'F');
      doc.setDrawColor(255); // Borde
      doc.textWithLink('TikTok', tiktokX + 5, buttonY + 7, { url: tiktokLink });

      doc.setFillColor(225, 48, 108); // Color de fondo de Instagram
      doc.rect(instagramX, buttonY, buttonWidth, buttonHeight, 'F');
      doc.setDrawColor(255); // Borde
      doc.textWithLink('Instagram', instagramX + 5, buttonY + 7, { url: instagramLink });

      // Guardar el PDF
      doc.save('pedido' + venta.numeroVenta + '.pdf');
    } else {
      console.error('Los datos de venta son indefinidos');
    }
  };

  const handleClickGeneratePDF = (venta) => {
    if (venta.numeroVenta !== undefined) {
      generatePDF(venta);
      axios.put(`https://apivsoulsapi8-production.up.railway.app/validar-venta-socios/${venta.idcliente}/${venta.numeroVenta}`)
        .then((response) => {
          obtenerVentasPendientes();
        })
        .catch((error) => {
          console.error('Error en la solicitud a la API', error);
        });
    } else {
      console.error('El número de venta es undefined');
    }
    obtenerVentasPendientes();
  };
  


  const obtenerVentasPendientes = () => {
    axios.get('https://apivsoulsapi8-production.up.railway.app/ventas-pendientes-socios')
      .then((response) => {
        setDatosVenta(response.data[0]);
      })
      .catch((error) => {
        // Maneja errores aquí
        console.error('Error en la solicitud GET', error);
      });
  };

  useEffect(() => {
    obtenerVentasPendientes();
  }, []);

  return (
    <>
      <div className='contValid limitetabla'>
        {/* <h4 className='txtVal'>Validación venta</h4> */}
        <table id='tablaValidacion' className='table table-hover'>
          <thead>
            <tr>
              <th>#</th>
              <th>Direccion entrega</th>
              <th>Fecha</th>
              <th>Productos</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>validación</th>
            </tr>
          </thead>
          <tbody>
            {datosVenta.map((venta, index) => (
              <tr key={index}>
                <td className='moveratras' >{venta.ID_VENTA_SOCIOS}</td>
                <td className='moveratras' >{venta.DIRECCION_SEMI}</td>
                <td className='moveratras'  style={{ width: "130px" }}>{venta.FECHA}</td>
                <td className='moveratras'  >
                  {venta.PRODUCTOS}
                </td>
                <td className='moveratras' >{venta.NOMBRECLIENTE}</td>
                <td className='moveratras' >{venta.TOTAL_VENTA}</td>
                <td className='moveratras' ><button className='botonValidar validarVenta' onClick={() => handleClickGeneratePDF({
                  nombreCliente: venta.NOMBRECLIENTE,
                  numeroVenta: venta.ID_VENTA_SOCIOS,
                  direccionEntrega: venta.DIRECCION_COMPLETA,
                  fecha: venta.FECHA,
                  productos: venta.PRODUCTOS,
                  total: venta.TOTAL,
                  idcliente: venta.ID_CLIENTE
                })}>➤</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ValidacionVenta;
