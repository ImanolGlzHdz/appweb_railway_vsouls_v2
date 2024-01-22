import React, { useState } from 'react';
import axios from 'axios';

import "./HstorialVentas.css";

const HistorialVentas = () => {
    const [anioSeleccionado, setAnioSeleccionado] = useState('2023');
    const [mesSeleccionado, setMesSeleccionado] = useState('0');
    const [historialVentas, setHistorialVentas] = useState([]);

    const handleAnioChange = (event) => {
        setAnioSeleccionado(event.target.value);
    };

    const handleMesChange = (event) => {
        setMesSeleccionado(event.target.value);
    };

    const getHistorial = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/ver-historialbueno/${anioSeleccionado}/${mesSeleccionado}`);
            const ventasData = response.data[0];
            setHistorialVentas(ventasData);
            console.log(ventasData);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }
    return (
        <>
            <div>
                <div className='contAnioMes'>
                    <h5>Selección de Año</h5>
                    <div className='contSelects'>
                        <select className='selectAnio' id="selectAnio" value={anioSeleccionado} onChange={handleAnioChange}>
                            <option value="2023">2023</option>
                            <option value="2022">2024</option>
                            <option value="2021">2025</option>
                        </select>
                        <select className='selectMes' value={mesSeleccionado} onChange={handleMesChange}>
                            <option value="0">Mostrar todo</option>
                            <option value="01">Enero</option>
                            <option value="02">Febrero</option>
                            <option value="03">Marzo</option>
                            <option value="04">Abril</option>
                            <option value="05">Mayo</option>
                            <option value="06">Junio</option>
                            <option value="07">Julio</option>
                            <option value="08">Agosto</option>
                            <option value="09">Septiembre</option>
                            <option value="10">Octubre</option>
                            <option value="11">Noviembre</option>
                            <option value="12">Diciembre</option>
                        </select>

                        <button className='botonHistorial aceptarHistorial' onClick={getHistorial}>Mostrar</button>
                    </div>
                </div>

                <table id='tablaHistorial' className='table table-hover'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre del Producto(s)</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historialVentas.map((venta, index) => (
                            <tr key={index}>
                                <td>{venta.ID_VENTA}</td>
                                <td>{venta.PRODUCTOS}</td>
                                <td>{venta.FECHA_FORMATEADA}</td>
                                <td>{venta.NOMBRE}</td>
                                <td>{venta.TOTAL_VENTAS}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default HistorialVentas;