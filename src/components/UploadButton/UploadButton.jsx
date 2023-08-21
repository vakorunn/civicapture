import React, { useState } from 'react';
import { collection, addDoc, doc } from 'firebase/firestore';
import db from '../../database/Database';

const UploadButton = () => {
    const [message, setMessage] = useState('');

    const addNewDocument = async () => {
        try {
            const collectionRef = collection(db, 'miembros');

            const newDocumentData = {
                dni: '24189810',
                firstName: 'Sonia Viviana',
                lastName: 'Leiva',
                birthday: '1974/09/01',
                phoneNumber: '3854858941',
                address: {
                    city: 'Loreto',
                    state: 'Santiago del Estero',
                    streetAddress: 'B. Remanzo'
                }
            };

            await addDoc(collectionRef, newDocumentData);

            setMessage('Nuevo documento agregado correctamente');
        } catch (error) {
            console.error('Error al agregar el nuevo documento:', error);
            setMessage('Error al agregar el nuevo documento');
        }
    };

    return (
        <div>
            <h2>Agregar Nuevo Documento</h2>
            <button onClick={addNewDocument}>Agregar Documento</button>
            <p>{message}</p>
        </div>
    )
}

export default UploadButton