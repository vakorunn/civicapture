import React, { useState } from 'react'

import db from '../../database/Database'

import { collection, doc, getDocs, getDoc, query, updateDoc, where } from 'firebase/firestore'
import MySwal from 'sweetalert2'

const UpdateForm = () => {
    const [dniToUpdate, setDniToUpdate] = useState('')
    const [docRefToUpdate, setDocRefToUpdate] = useState('')
    const [memberData, setMemberData] = useState(null)

    const handleDniChange = (event) => {
        setDniToUpdate(event.target.value)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setMemberData((prevData) => ({
            ...prevData,
            [name]: value.toUpperCase()
        }))
    }

    const searchMember = async () => {
        try {
            const memberRef = collection(db, 'miembros')
            const querySnapshot = await getDocs(query(memberRef, where('dni', '==', '41720940')))

            if (!querySnapshot.empty) {
                MySwal.fire({
                    title: 'Se encontro el Fiscal',
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
                    title: 'No se encontro el Fiscal en la base de datos',
                    icon: 'info'
                })
            }
        } catch (error) {
            MySwal.fire({
                title: 'Error al realizar la consulta',
                text: error,
                icon: 'error'
            })
        }
    }

    const updateMemberData = async (event) => {
        event.preventDefault();
        const q = query(collection(db, 'miembros'), where('dni', '==', dniToUpdate));

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const firstDocument = querySnapshot.docs[0];

            try {
                await updateDoc(doc(db, 'miembros', firstDocument.id), memberData);
                MySwal.fire({
                    title: 'La informacion se actualizo correctamente',
                    icon: 'success'
                })
            } catch (error) {
                MySwal.fire({
                    title: 'Ocurrio un error en la actualizacion',
                    text: error,
                    icon: 'error'
                })
            }
        } else {
            MySwal.fire({
                title: `No se encontraron documentos que coincidan con el DNI ${dniToUpdate}`,
                icon: 'warning'
            })
        }
    };


    return (
        <>
            <div className="container">
                <h2>Actualizar Miembro</h2>
                <label htmlFor="dni">DNI</label>
                <input type="text" value={dniToUpdate} onChange={handleDniChange} className='form-control' />
                <button className='btn btn-primary mt-2' onClick={searchMember}>Buscar</button>

                {
                    memberData && (
                        <form>
                            <div className="row border border-primary m-4 p-2">
                                <div className="main-title">
                                    <p>Datos Personales</p>
                                </div>
                                <label htmlFor="dni">DNI</label>
                                <input type="text" className="form-control" name='dni' id='dni' value={memberData.dni} onChange={handleInputChange} />

                                <label htmlFor="firstName">Nombre</label>
                                <input type="text" className='form-control' name='firstName' id='firstName' value={memberData.firstName} onChange={handleInputChange} />

                                <label htmlFor="lastName">Apellido</label>
                                <input type="text" className='form-control' name='lastName' id='lastName' value={memberData.lastName} onChange={handleInputChange} />

                                <label htmlFor="birthday">Fecha de Nacimiento</label>
                                <input type="text" className='form-control' name='birthday' id='birthday' value={memberData.birthday} onChange={handleInputChange} />

                                <label htmlFor="phoneNumber">Telefono</label>
                                <input type="text" className='form-control' name='phoneNumber' id='phoneNumber' value={memberData.phoneNumber} onChange={handleInputChange} />

                                <label htmlFor="city">Ciudad</label>
                                <input type="text" className='form-control' name='city' id='city' value={memberData.city} onChange={handleInputChange} />

                                <label htmlFor="state">Provincia</label>
                                <input type="text" className='form-control' name='state' id='state' value={memberData.state} onChange={handleInputChange} />

                                <label htmlFor="streetAddress">Calle</label>
                                <input type="text" className='form-control' name='streetAddress' id='streetAddress' value={memberData.streetAddress} onChange={handleInputChange} />
                            </div>

                            <div className="row border border-success m-4 p-2">
                                <label htmlFor="charge">Cargo</label>
                                <input type="text" className='form-control' name='charge' id='charge' value={memberData.charge} onChange={handleInputChange} />

                                <label htmlFor="circuit">Circuito</label>
                                <input type="text" className='form-control' name='circuit' id='circuit' value={memberData.circuit} onChange={handleInputChange} />

                                <label htmlFor="placeOfInspection">Lugar de Fiscalizacion</label>
                                <input type="text" className='form-control' name='placeOfInspection' id='placeOfInspection' value={memberData.placeOfInspection} onChange={handleInputChange} />

                            </div>

                            <div className="row border border-info m-4 p-2">
                                <label htmlFor="district">Districto</label>
                                <input type="text" className='form-control' name='district' id='district' value={memberData.district} onChange={handleInputChange} />

                                <label htmlFor="electoralCircuit">Circuito Electoral</label>
                                <input type="text" className='form-control' name='electoralCircuit' id='electoralCircuit' value={memberData.electoralCircuit} onChange={handleInputChange} />


                                <label htmlFor="order">Orden</label>
                                <input type="text" className='form-control' name='order' id='order' value={memberData.order} onChange={handleInputChange} />

                                <label htmlFor="table">Mesa</label>
                                <input type="text" className='form-control' name='table' id='table' value={memberData.table} onChange={handleInputChange} />

                                <label htmlFor="votingPlace">Direccion del Establecimiento</label>
                                <input type="text" className='form-control' name='votingPlace' id='votingPlace' value={memberData.votingAddress} onChange={handleInputChange} />

                                <label htmlFor="establishment">Establecimiento</label>
                                <input type="text" className='form-control' name='establishment' id='establishment' value={memberData.establishment} onChange={handleInputChange} />
                            </div>

                            <button className="btn btn-primary mt-3" onClick={updateMemberData}>Actualizar Informacion</button>
                        </form>
                    )
                }
            </div>
        </>
    )
}

export default UpdateForm