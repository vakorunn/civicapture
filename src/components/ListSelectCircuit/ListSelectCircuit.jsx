import React, { useState, useEffect } from 'react';
import db from '../../database/Database';
import { collection, getDocs } from 'firebase/firestore';

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
                    const ocupation = doc.data().ocupation;
                    if (ocupation && ocupation.circuit) {
                        circuitosSet.add(ocupation.circuit);
                    }
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
                .filter((miembro) => miembro.ocupation.circuit === selectedDistrict); // Corregido aquí
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
                        <h3>Circuito: {selectedCircuito}</h3>
                        <ul>
                            {miembros.map((miembro) => (
                                <li key={miembro.dni}>
                                    <div>
                                        <strong>DNI:</strong> {miembro.dni}
                                    </div>
                                    <div>
                                        <strong>Apellido:</strong> {miembro.lastName}
                                    </div>
                                    <div>
                                        <strong>Nombre:</strong> {miembro.firstName}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default ListSelectCircuit;
