import React, { useState } from 'react'

import db from '../../database/Database'

import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import MySwal from 'sweetalert2'

const UpdateForm = () => {
    const [dniToUpdate, setDniToUpdate] = useState('')
    const [docRefToUpdate, setDocRefToUpdate] = useState('')
    const [memberData, setMemberData] = useState(null)

    const handleDniChange = (event) => {
        setDniToUpdate(event.target.value)
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target
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
                    MySwal.fire({
                        title: 'Informacion del Fiscal',
                        text: memberData.dni,
                        icon: 'info'
                    })
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
        try {
            const memberToUpdateRef = doc(db, 'miembros', dniToUpdate);
            await updateDoc(memberToUpdateRef, memberData);
    
            MySwal.fire({
                title: 'Se actualizaron los datos correctamente',
                icon: 'success'
            });
        } catch (error) {
            MySwal.fire({
                title: 'Error al actualizar los datos',
                text: error.message,
                icon: 'error'
            });
        }
    };
    

    return (
        <>
            <div className="container">
                <h2>Actualizar Miembro</h2>
                <label htmlFor="dni">DNI</label>
                <input type="text" value={dniToUpdate} onChange={handleDniChange} className='form-control' />
                <button className='btn btn-primary' onClick={searchMember}>Buscar</button>

                {
                    memberData && (
                        <form>
                            <div className="row">
                                <div className="main-title">
                                    <p>Datos Personales</p>
                                </div>
                                <label htmlFor="dni">DNI</label>
                                <input type="text" className="form-control" name='dni' id='dni' value={memberData.dni} onChange={handleInputChange} />

                                <label htmlFor="firstName">Nombre</label>
                                <input type="text" className='form-control' name='firstName' id='firstName' value={memberData.firstName} onChange={handleInputChange}/>
                            </div>
                            <button className="btn btn-primary" onClick={updateMemberData}>Actualizar Informacion</button>
                        </form>
                    )
                }
            </div>
        </>
    )
}

export default UpdateForm