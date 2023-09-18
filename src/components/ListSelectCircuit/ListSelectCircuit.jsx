import React, { useState, useEffect } from 'react';
import db from '../../database/Database';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const ListSelectCircuit = () => {
    const [circuitos, setCircuitos] = useState([]);
    const [miembros, setMiembros] = useState([]);
    const [selectedCircuito, setSelectedCircuito] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'miembros'));
                const circuitosSet = new Set();

                querySnapshot.forEach((doc) => {
                    const ocupation = doc.data();
                    circuitosSet.add(ocupation.circuit)
                });

                const circuitosArray = Array.from(circuitosSet).sort();
                setCircuitos(circuitosArray);
                setMiembros(querySnapshot.docs.map((doc) => doc.data()));
            } catch (error) {
                console.error('Error al listar circuitos:', error);
            }
        };

        fetchData();
    }, []);

    const handleSelectChange = async (event) => {
        const selectedDistrict = event.target.value;
        setSelectedCircuito(selectedDistrict);

        // Limpiar los miembros al cambiar de distrito
        setMiembros([]);

        try {
            const querySnapshot = await getDocs(collection(db, 'miembros'));
            const members = querySnapshot.docs
                .map((doc) => doc.data())
                .filter((miembro) => miembro.circuit === selectedDistrict); // Corregido aquí
            setMiembros(members);
        } catch (error) {
            console.error('Error al obtener miembros:', error);
        }
    };

    return (
        <>
            <div className="container">
                <div className="main-title mt-3">
                    <h2>Listado por</h2>
                </div>
                <label htmlFor="circuito">Selecciona un circuito:</label>
                <select id="circuito" value={selectedCircuito} onChange={handleSelectChange}>
                    <option value="">Seleccionar...</option>
                    {circuitos.map((circuito) => (
                        <option key={circuito} value={circuito}>
                            {circuito}
                        </option>
                    ))}
                </select>
                {selectedCircuito && (
                    <div>
                        <div className="main-title">
                            <h3>Circuito: {selectedCircuito}</h3>
                        </div>
                        <ul>
                            {miembros.map((miembro) => (
                                <div className="row border border-primary mb-2 p-2" key={miembro.dni}>
                                    <div className="col-4 m-auto">
                                        <p className='m-auto'>Apellido y Nombre: {miembro.lastName} {miembro.firstName}</p>
                                    </div>
                                    <div className="col-3 m-auto">
                                        <p>Cargo: {miembro.charge}</p>
                                    </div>
                                    <div className="col-3 m-auto">
                                        <p>Telefono: {miembro.phoneNumber}</p>
                                    </div>
                                    <div className="col-2 m-auto">
                                        <p className='m-auto'>
                                            <Link to={`/listaFiscales/${miembro.dni}`} state={{ memberData: miembro }}>
                                                <button className='btn btn-primary'>
                                                    <FontAwesomeIcon icon={faEye} />
                                                </button>
                                            </Link>
                                        </p>
                                    </div>
                                </div>

                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default ListSelectCircuit;
