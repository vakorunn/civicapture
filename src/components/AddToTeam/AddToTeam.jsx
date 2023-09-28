import React, { useState } from 'react';
import db from '../../database/Database';
import {
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
    arrayUnion, // Agregamos esta función para actualizar el array
} from 'firebase/firestore';
import MySwal from 'sweetalert2';

const AddToTeam = () => {
    const [teamCodeToUpdate, setTeamCodeToUpdate] = useState('')
    const [docRefToUpdate, setDocRefToUpdate] = useState('')
    const [memberData, setMemberData] = useState(null)
    const [newMember, setNewMember] = useState({
        memCharge: '',
        memLastName: '',
        memFirtsName: '',
        memDni: ''
    })
    const [searchDni, setSearchDni] = useState('')
    const [fiscalDocRef, setFiscalDocRef] = useState('')
    const [fiscalData, setFiscalData] = useState(null)

    const [fiscalLastName, setFiscalLastName] = useState('')
    const [fiscalFirstName, setFiscalFirstName] = useState('')
    const [fiscalCharge, setFiscalCharge] = useState('')

    const handleTeamCodeChange = (event) => {
        setTeamCodeToUpdate(event.target.value)
    }

    const handleDniChange = (event) => {
        setSearchDni(event.target.value)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setNewMember((prevData) => ({
            ...prevData,
            [name]: value.toUpperCase()
        }))
    }

    const searchFiscalData = async () => {
        try {
            const fiscalRef = collection(db, 'miembros')
            const querySnapshot = await getDocs(query(fiscalRef, where('dni', '==', searchDni)))

            if (!querySnapshot.empty) {
                MySwal.fire({
                    title: 'Se encontro el fiscal',
                    icon: 'success'
                })
                querySnapshot.forEach((doc) => {
                    setFiscalDocRef(doc.id)
                    setFiscalData(doc.data())
                    console.log(doc.id);
                    console.log(doc.data());
                })
            } else {
                MySwal.fire({
                    title: 'No se encontro el fiscal',
                    icon: 'warning'
                })
            }
        } catch (error) {
            MySwal.fire({
                title: 'Error al buscar en la base de datos',
                text: error,
                icon: 'error'
            })
        }
    }

    const searchTeam = async () => {
        try {
            const memRef = collection(db, 'equipos')
            const querySnapshot = await getDocs(query(memRef, where('teamCode', '==', teamCodeToUpdate)))

            if (!querySnapshot.empty) {
                MySwal.fire({
                    title: 'Se encontro el Equipo',
                    icon: 'success'
                })
                querySnapshot.forEach((doc) => {
                    setDocRefToUpdate(doc.id)
                    setMemberData(doc.data())
                    console.log(doc.id);
                    console.log(doc.data());
                })
            } else {
                MySwal.fire({
                    title: 'No se encontro el equipo',
                    icon: 'warning'
                })
            }
        } catch (error) {
            MySwal.fire({
                title: 'Error al buscar en la base de datos',
                text: error,
                icon: 'error'
            })
        }
    }

    // Función para agregar un nuevo miembro al array 'members' del documento
    const addNewMember = async () => {
        try {
            const docRef = doc(db, 'equipos', docRefToUpdate);

            // Usa la función 'arrayUnion' para agregar el nuevo miembro al array
            const newFiscal = {
                dni: fiscalData.dni,
                charge: fiscalData.charge,
                lastName: fiscalData.lastName,
                firstName: fiscalData.firstName
            }
            setNewMember(newFiscal)
            console.log(newMember);
            await updateDoc(docRef, {
                members: arrayUnion(newMember),
            });

            MySwal.fire({
                title: 'Nuevo miembro agregado con éxito',
                icon: 'success',
            });
        } catch (error) {
            MySwal.fire({
                title: 'Error al agregar el nuevo miembro',
                text: error,
                icon: 'error',
            });
        }
    };

    return (
        <>
            <div className="container">
                <h2>Añadir Miembro al equipo</h2>
                <label htmlFor="teamCode">Codigo de Equipo</label>
                <input type="text" value={teamCodeToUpdate} name='teamCode' onChange={handleTeamCodeChange} className='form-control' />
                <button className="btn btn-primary mt-2" onClick={searchTeam}>Buscar</button>
            </div>

            {docRefToUpdate && (
                <div className="container">
                    <div className="mt-3">
                        <h2>Ingrese el DNI del fiscal a Agregar</h2>
                        <label htmlFor="dni">DNI del Fiscal</label>
                        <input type="text" value={searchDni} name='dni' onChange={handleDniChange} className="form-control" />
                        <button className="btn btn-primary mt-2" onClick={searchFiscalData}>Buscar Fiscal</button>
                    </div>
                </div>
            )}

            {fiscalDocRef && (
                <div className="container">
                    <div className="mt-3">
                        <label htmlFor="fiscalCharge">Cargo</label>
                        <input type="text" className="form-control" name="fiscalCharge" value={memberData.charge} onChange={handleInputChange} />

                        <label htmlFor="fiscalDNI">DNI</label>
                        <input type="text" className="form-control" name="fiscalDNI" value={searchDni} onChange={handleInputChange} />

                        <label htmlFor="fiscalFirstName">Nombre</label>
                        <input type="text" className="form-control" name="fiscalFirstName" value={memberData.firstName} onChange={handleInputChange} />

                        <label htmlFor="fiscalLastName">Apellido</label>
                        <input type="text" className="form-control" name="fiscalLastName" value={memberData.lastName} onChange={handleInputChange} />
                        <button className="btn btn-primary mt-2 mb-2" onClick={addNewMember}>Agregar Nuevo Miembro</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddToTeam