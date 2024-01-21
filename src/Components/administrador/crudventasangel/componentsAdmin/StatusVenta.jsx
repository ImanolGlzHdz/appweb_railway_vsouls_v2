import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap';

import './StatusVneta.css';

const StatusVenta = () => {
    const [data, setData] = useState([]);
    const [anioSeleccionado, setAnioSeleccionado] = useState('3');
    const tableRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [guiaVenta, setGuiaVenta] = useState('');
    const [selectedVenta, setSelectedVenta] = useState(null);

    const handleAnioChange = (event) => {
        setAnioSeleccionado(event.target.value);
    };

    const getHistorial = async () => {
        try {
            const response = await axios.get(`https://apivsoulsapi8-production.up.railway.app/ver-status-venta/${anioSeleccionado}`);
            const ventasData = response.data[0];
            setData(ventasData);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pendiente':
                return 'orange';
            case 'Enviado':
                return 'green';
            default:
                return 'red';
        }
    };

    const generatePDF = async (venta) => {
        const { jsPDF } = await import('jspdf');

        const pdf = new jsPDF();

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);

        pdf.addImage('https://cdn.shopify.com/s/files/1/0049/9790/6466/files/Logo.png?height=628&pad_color=fff&v=1614725898&width=1200', 'JPEG', 140, -5, 60, 40);
        pdf.text('Vsouls', 10, 10);
        pdf.text('Isidro Huarte #53, centro, Morelia, Michoacán', 10, 15);
        pdf.text('Teléfono: 123-456-7890', 10, 20);

        pdf.text(`Venta #${venta.ID_VENTA}`, 10, 35);

        pdf.text(`Direccion entrega: `, 10, 45);
        const direccionLines = venta.DIRECCION_COMPLETA.split(', ');
        const colWidth = 80;
        const colMargin = 10;
        const lineHeight = 5;

        direccionLines.forEach((line, index) => {
            const colIndex = index % 2;
            const x = colIndex * (colWidth + colMargin);
            const y = 50 + Math.floor(index / 2) * lineHeight;
            pdf.text(line, 10 + x, y);
        });

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);

        pdf.text(`Productos: `, 10, 85);
        pdf.text(`${venta.PRODUCTOS}`, 10, 90);
        pdf.text(`Fecha del pedido: ${venta.FECHA_FORMATEADA}`, 10, 100);
        pdf.text(`Total: ${venta.TOTAL_VENTAS}`, 10, 110);
        pdf.text(`Estado del pedido: ${venta.ESTADO_VENTA}`, 10, 120);

        pdf.save(`venta_${venta.ID_VENTA}.pdf`);
    };

    const handleAgregarGuia = (venta) => {
        setSelectedVenta(venta);
        setShowModal(true);
    };

    const handleGuardarGuia = async () => {
        try {
            const ventaId = selectedVenta.ID_VENTA;
            await axios.put(`https://apivsoulsapi8-production.up.railway.app/agregar-guia-venta/${ventaId}/${guiaVenta}`);
            setShowModal(false);
            getHistorial();
          } catch (error) {
            console.error('Error al agregar la guía de venta: ', error);
          }
    };

    return (
        <>
            <div className='contStatus'>
                <h5>Estados de ventas</h5>
                <div className='contSelectstat'>
                    <select className='selectStatus' id="selectStatus" value={anioSeleccionado} onChange={handleAnioChange}>
                        <option value="3">Ver todo</option>
                        <option value="0">Pendientes</option>
                        <option value="1">Enviados</option>
                    </select>
                    <button className='botonVerHistorial aceptarHistorial' onClick={getHistorial}>
                        Mostrar
                    </button>
                </div>
            </div>

            <table ref={tableRef} id='tablaStatus' className='table table-hover'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre del Producto(s)</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>No. guia</th>
                        <th>Descargar</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((venta, index) => (
                        <tr key={index}>
                            <td>{venta.ID_VENTA}</td>
                            <td>{venta.PRODUCTOS}</td>
                            <td>{venta.FECHA_FORMATEADA}</td>
                            <td>{venta.TOTAL_VENTAS}</td>
                            <td style={{ fontWeight: 'bold', color: getStatusColor(venta.ESTADO_VENTA) }}>{venta.ESTADO_VENTA}</td>
                            <td>
                                <p>{venta.GUIA_VENTA || 'aun no disponible'}</p>
                                {venta.GUIA_VENTA === 'aun no disponible' && (
                                    <button className='btnAddGuia' onClick={() => handleAgregarGuia(venta)}>
                                        Agregar guía
                                    </button>
                                )}
                            </td>
                            <td>
                                <button className='botonVerHistorial btnDwStatus' onClick={() => generatePDF(venta)}>
                                    ⇩
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Guía de Venta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        placeholder="Número de guía"
                        value={guiaVenta}
                        onChange={(e) => setGuiaVenta(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleGuardarGuia}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default StatusVenta;
