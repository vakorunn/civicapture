import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import db from '../../database/Database';


const UploadForm = () => {
    const [message, setMessage] = useState('');
    const initialFormData = {
        dni: '',
        firstName: '',
        lastName: '',
        birthday: '',
        phoneNumber: '',
        city: '',
        state: '',
        streetAddress: '',
        circuit: '',
        charge: '',
        placeOfInspection: '',
        establishment: '',
        votingAddress: '',
        district: '',
        electoralCircuit: '',
        electoralSection: '',
        table: '',
        order: ''
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const addNewDocument = async () => {
        try {
            const collectionRef = collection(db, 'miembros');

            const newDocumentData = {
                dni: formData.dni,
                firstName: formData.firstName,
                lastName: formData.lastName,
                birthday: formData.birthday,
                phoneNumber: formData.phoneNumber,
                address: {
                    city: formData.city,
                    state: formData.state,
                    streetAddress: formData.streetAddress
                },
                ocupation: {
                    circuit: formData.circuit,
                    charge: formData.charge,
                    placeOfInspection: formData.placeOfInspection
                },
                votingPlace: {
                    establishment: formData.establishment,
                    votingAddress: formData.votingAddress,
                    district: formData.district,
                    electoralCircuit: formData.electoralCircuit,
                    electoralSection: formData.electoralSection,
                    table: formData.table,
                    order: formData.order
                }
            };

            await addDoc(collectionRef, newDocumentData);

            setMessage('Nuevo documento agregado correctamente');
            setFormData(initialFormData);
            setTimeout(() => {
                setMessage('')
            },2000)
        } catch (error) {
            console.error('Error al agregar el nuevo documento:', error);
            setMessage('Error al agregar el nuevo documento');
        }
    };

    return (
        <div>
            <h2>Agregar nuevo Miembro</h2>
            <form>
                <h3>Datos Personales</h3>
                <br />
                <label>DNI </label>
                <input type="text" name='dni' value={FormData.dni} onChange={handleInputChange} />
                <br />

                <label>Nombre/s </label>
                <input type="text" name='firstName' value={FormData.firstName} onChange={handleInputChange} />
                <br />

                <label>Apellido/s </label>
                <input type="text" name='lastName' value={FormData.lastName} onChange={handleInputChange} />
                <br />

                <label>Fecha Nacimiento </label>
                <input type="text" name='birthday' value={FormData.birthday} onChange={handleInputChange} />
                <br />

                <label>Telefono </label>
                <input type="text" name='phoneNumber' value={FormData.phoneNumber} onChange={handleInputChange} />
                <br />

                <label>Departamento </label>
                <input type="text" name='city' value={FormData.city} onChange={handleInputChange} />
                <br />

                <label>Provincia </label>
                <input type="text" name='state' value={FormData.state} onChange={handleInputChange} />
                <br />

                <label>Direccion </label>
                <input type="text" name='streetAddress' value={FormData.streetAddress} onChange={handleInputChange} />
                <br />

                <h3>Datos de la Fiscalización</h3>
                <br />
                <label>Circuito </label>
                <input type="text" name='circuit' value={FormData.circuit} onChange={handleInputChange} />
                <br />

                <label>Cargo </label>
                <input type="text" name='charge' value={FormData.charge} onChange={handleInputChange} />
                <br />

                <label>Lugar a Fiscalizar </label>
                <input type="text" name='placeOfInspection' value={FormData.placeOfInspection} onChange={handleInputChange} />
                <br />
                
                <h3>Datos Padronales</h3>
                <br />
                <label>Establecimiento </label>
                <input type="text" name='establishment' value={FormData.establishment} onChange={handleInputChange} />
                <br />

                <label>Dirección </label>
                <input type="text" name='votingAddress' value={FormData.votingAddress} onChange={handleInputChange} />
                <br />

                <label>Districto </label>
                <input type="text" name='district' value={FormData.district} onChange={handleInputChange} />
                <br />

                <label>Circuito Electoral </label>
                <input type="text" name='electoralCircuit' value={FormData.electoralCircuit} onChange={handleInputChange} />
                <br />

                <label>Seccion Electoral </label>
                <input type="text" name='electoralSection' value={FormData.electoralSection} onChange={handleInputChange} />
                <br />

                <label>Mesa </label>
                <input type="text" name='table' value={FormData.table} onChange={handleInputChange} />
                <br />

                <label>Orden </label>
                <input type="text" name='order' value={FormData.order} onChange={handleInputChange} />
                <br /><br />
            </form>
            <button onClick={addNewDocument}>Agregar Documento</button>
            <p>{message}</p>
        </div>
    )
}

export default UploadForm