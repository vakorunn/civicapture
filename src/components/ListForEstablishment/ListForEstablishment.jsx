import React, { useState, useEffect } from 'react';
import db from '../../database/Database';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const ListForEstablishment = () => {
    const [establecimientos, setEstablecimientos] = useState([]);
    const [miembros, setMiembros] = useState([]);
    const [selectedEstablecimiento, setSelectedEstablecimiento] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'miembros'));
                const establecimientosSet = new Set();

                querySnapshot.forEach((doc) => {
                    const establishment = doc.data().establishment;
                    if (establishment) {
                        establecimientosSet.add(establishment);
                    }
                });

                const establecimientosArray = Array.from(establecimientosSet).sort();
                setEstablecimientos(establecimientosArray);
                setMiembros(querySnapshot.docs.map((doc) => doc.data()));
            } catch (error) {
                console.error('Error al listar establecimientos:', error);
            }
        };

        fetchData();
    }, []);

    const handleSelectChange = async (event) => {
        const selectedEstablishment = event.target.value;
        setSelectedEstablecimiento(selectedEstablishment);

        setMiembros([]);

        try {
            const querySnapshot = await getDocs(collection(db, 'miembros'));
            const members = querySnapshot.docs
                .map((doc) => doc.data())
                .filter((miembro) => miembro.establishment === selectedEstablishment);
            setMiembros(members);
        } catch (error) {
            console.error('Error al obtener miembros:', error);
        }
    };

    return (
        <>
            <div className="container">
                <div className="main-title mt-3">
                    <h2>Listado por Establecimiento</h2>
                </div>
                <label htmlFor="establecimiento">Selecciona un establecimiento:</label>
                <select id="establecimiento" value={selectedEstablecimiento} onChange={handleSelectChange}>
                    <option value="">Seleccionar...</option>
                    {establecimientos.map((establecimiento) => (
                        <option key={establecimiento} value={establecimiento}>
                            {establecimiento}
                        </option>
                    ))}
                </select>
                {selectedEstablecimiento && (
                    <div>
                        <div className="main-title">
                            <h3>Establecimiento: {selectedEstablecimiento}</h3>
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
