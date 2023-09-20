import React, { useState, useEffect } from 'react';
import db from '../../database/Database';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const ListForEstablishment = () => {
    const [placesOfInspection, setPlacesOfInspection] = useState([]);
    const [miembros, setMiembros] = useState([]);
    const [selectedPlaceOfInspection, setSelectedPlaceOfInspection] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'miembros'));
                const placesOfInspectionSet = new Set();

                querySnapshot.forEach((doc) => {
                    const placeOfInspection = doc.data().placeOfInspection;
                    if (placeOfInspection) {
                        placesOfInspectionSet.add(placeOfInspection);
                    }
                });

                const placesOfInspectionArray = Array.from(placesOfInspectionSet).sort();
                setPlacesOfInspection(placesOfInspectionArray);
                setMiembros(querySnapshot.docs.map((doc) => doc.data()));
            } catch (error) {
                console.error('Error al listar lugares de inspección:', error);
            }
        };

        fetchData();
    }, []);

    const handleSelectChange = async (event) => {
        const selectedPlace = event.target.value;
        setSelectedPlaceOfInspection(selectedPlace);

        setMiembros([]);

        try {
            const querySnapshot = await getDocs(collection(db, 'miembros'));
            const members = querySnapshot.docs
                .map((doc) => doc.data())
                .filter((miembro) => miembro.placeOfInspection === selectedPlace);
            setMiembros(members);
        } catch (error) {
            console.error('Error al obtener miembros:', error);
        }
    };

    return (
        <>
            <div className="container">
                <div className="main-title mt-3">
                    <h2>Listado por Lugar de Inspección</h2>
                </div>
                <label htmlFor="placeOfInspection">Selecciona un lugar de inspección:</label>
                <select id="placeOfInspection" value={selectedPlaceOfInspection} onChange={handleSelectChange}>
                    <option value="">Seleccionar...</option>
                    {placesOfInspection.map((place) => (
                        <option key={place} value={place}>
                            {place}
                        </option>
                    ))}
                </select>
                {selectedPlaceOfInspection && (
                    <div>
                        <div className="main-title">
                            <h3>Lugar de Inspección: {selectedPlaceOfInspection}</h3>
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
}

export default ListForEstablishment;
