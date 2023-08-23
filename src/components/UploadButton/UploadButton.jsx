import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import db from '../../database/Database';


const UploadButton = () => {
    const [message, setMessage] = useState('');
    const initialFormData = {
        dni: '',
        firstName: '',
        lastName: '',
        birthday: '',
        phoneNumber: '',
        city: '',
        state: '',
        streetAddress: ''
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
                <label>DNI </label>
                <input type="text" name='dni' value={FormData.dni} onChange={handleInputChange} />
                <br />

                <label>Nombre/s </label>
                <input type="text" name='firstName' value={FormData.firstName} onChange={handleInputChange} />
                <br />

                <label>Apellido/s </label>
                <input type="text" name='lastName' value={FormData.lastName} onChange={handleInputChange} />
                <br />

                <label>Cumpleaños </label>
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
            </form>
            <button onClick={addNewDocument}>Agregar Documento</button>
            <p>{message}</p>
        </div>
    )
}

export default UploadButton