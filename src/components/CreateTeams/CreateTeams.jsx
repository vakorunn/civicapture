import React, { useState } from 'react'

import { collection, addDoc } from 'firebase/firestore';
import db from '../../database/Database';
import Swal from 'sweetalert2';

const CreateTeams = () => {
    const initialFormData = {
        circuit: '',
        establishment: '',
        teamCode: '',
        charge: '',
        dni: '',
        firstName: '',
        lastName: '',
        members:[]
    }
    const [formData, setFormData] = useState(initialFormData)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value.toUpperCase()
        }));
    };

    const addNewDocument = async () => {
        try {
            const collectionRef = collection(db, 'equipos');

            const newDocumentData = {
                circuit: formData.circuit,
                establishment: formData.establishment,
                teamCode: formData.teamCode,
                charge: formData.charge,
                dni: formData.dni,
                firstName: formData.firstName,
                lastName: formData.lastName,
                members: formData.members
            };

            await addDoc(collectionRef, newDocumentData);

            setFormData(initialFormData);
            Swal.fire({
                title: 'Nuevo Equipo agregado correctamente',
                icon: 'success'
            })
        } catch (error) {
            console.error('Error al agregar el nuevo Equipo:', error);
            Swal.fire({
                title: 'No se pudo añadir al equipo',
                icon: 'error',
                text: `Error:${error}`
            })
        }
    };
    return (
        <div className="container">
            <div className="main-title">
                <h2>Alta de Equipos</h2>
            </div>
            <form>
                <div className="main-title mt-3">
                    <p>Informacion del Equipo</p>
                </div>
                <div className='form-group col-md-auto mb-3'>
                    <label htmlFor="circuit">Circuito</label>
                    <input type="text" className='form-control' name='circuit' id='circuit' value={formData.circuit} onChange={handleInputChange} />
                </div>

                <div className='form-group col-md-auto mb-3'>
                    <label htmlFor="establishment">Establecimiento</label>
                    <input type="text" className='form-control' name='establishment' id='establishment' value={formData.establishment} onChange={handleInputChange} />
                </div>

                <div className='form-group col-md-auto mb-3'>
                    <label htmlFor="teamCode">Codigo de Equipo</label>
                    <input type="text" className='form-control' name='teamCode' id='teamCode' value={formData.teamCode} onChange={handleInputChange} />
                </div>

                <div className="main-title mt-3">
                    <p>Informacion del Lider</p>
                </div>

                <div className='form-group col-md-auto mb-3'>
                    <label htmlFor="dni">DNI</label>
                    <input type="text" className='form-control' name='dni' id='dni' value={formData.dni} onChange={handleInputChange} />
                </div>

                <div className='form-group col-md-auto mb-3'>
                    <label htmlFor="charge">Cargo</label>
                    <input type="text" className='form-control' name='charge' id='charge' value={formData.charge} onChange={handleInputChange} />
                </div>

                <div className='form-group col-md-auto mb-3'>
                    <label htmlFor="firstName">Nombre</label>
                    <input type="text" className='form-control' name='firstName' id='firstName' value={formData.firstName} onChange={handleInputChange} />
                </div>

                <div className='form-group col-md-auto mb-3'>
                    <label htmlFor="lastName">Apellido</label>
                    <input type="text" className='form-control' name='lastName' id='lastName' value={formData.lastName} onChange={handleInputChange} />
                </div>
            </form>
            <button onClick={addNewDocument} className='btn btn-primary mb-4'>
                <span>Añadir Equipo</span>
                <span></span>
            </button>
        </div>
    )
}

export default CreateTeams