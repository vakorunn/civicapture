import React, { useState } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import db from '../../database/Database';

const UpdateForm = () => {
    const [dniToUpdate, setDniToUpdate] = useState('');
    const [memberData, setMemberData] = useState(null);

    const handleDniChange = (event) => {
        setDniToUpdate(event.target.value);
    };

    const searchForMember = async () => {
        try {
            const membersRef = collection(db, 'miembros');
            const q = query(membersRef, where('dni', '==', dniToUpdate));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                const memberDoc = querySnapshot.docs[0];
                setMemberData(memberDoc.data());
            } else {
                setMemberData(null);
            }
        } catch (error) {
            console.error('Error al buscar el miembro:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMemberData((prevData) => ({
            ...prevData,
            [name]: value.toUpperCase()
        }));
    };

    const updateMemberData = async () => {
        try {
            const memberDocRef = doc(db, 'miembros', dniToUpdate);
            await updateDoc(memberDocRef, memberData);

            setDniToUpdate('');
            setMemberData(null);
        } catch (error) {
            console.error('Error al actualizar el miembro:', error);
        }
    };

    return (
        <div>
            <h2>Actualizar Miembro</h2>
            <label>Ingrese DNI: </label>
            <input type="text" value={dniToUpdate} onChange={handleDniChange} />
            <button onClick={searchForMember}>Buscar</button>

            {memberData && (
                <form>
                    <h3>Datos Personales</h3>
                    <br />
                    <label>DNI </label>
                    <input type="text" name='dni' value={memberData.dni} readOnly />
                    <br />

                    <label>Nombre/s </label>
                    <input type="text" name='firstName' value={memberData.firstName} onChange={handleInputChange} />
                    <br />

                    <label>Apellido/s </label>
                    <input type="text" name='lastName' value={memberData.lastName} onChange={handleInputChange} />
                    <br />

                    <label>Fecha Nacimiento </label>
                    <input type="text" name='birthday' value={memberData.birthday} onChange={handleInputChange} />
                    <br />

                    <label>Telefono </label>
                    <input type="text" name='phoneNumber' value={memberData.phoneNumber} onChange={handleInputChange} />
                    <br />

                    <label>Departamento </label>
                    <input type="text" name='city' value={memberData.address.city} onChange={handleInputChange} />
                    <br />

                    <label>Provincia </label>
                    <input type="text" name='state' value={memberData.address.state} onChange={handleInputChange} />
                    <br />

                    <label>Direccion </label>
                    <input type="text" name='streetAddress' value={memberData.address.streetAddress} onChange={handleInputChange} />
                    <br />

                    <h3>Datos de la Fiscalización</h3>
                    <br />
                    <label>Circuito </label>
                    <input type="text" name='circuit' value={memberData.ocupation.circuit} />
                    <br />

                    <label>Cargo </label>
                    <input type="text" name='charge' value={memberData.ocupation.charge} onChange={handleInputChange} />
                    <br />

                    <label>Lugar a Fiscalizar </label>
                    <input type="text" name='placeOfInspection' value={memberData.ocupation.placeOfInspection} onChange={handleInputChange} />
                    <br />

                    <h3>Datos Padronales</h3>
                    <br />
                    <label>Establecimiento </label>
                    <input type="text" name='establishment' value={memberData.votingPlace.establishment} onChange={handleInputChange} />
                    <br />

                    <label>Dirección </label>
                    <input type="text" name='votingAddress' value={memberData.votingPlace.votingAddress} onChange={handleInputChange} />
                    <br />

                    <label>Districto </label>
                    <input type="text" name='district' value={memberData.votingPlace.district} onChange={handleInputChange} />
                    <br />

                    <label>Circuito Electoral </label>
                    <input type="text" name='electoralCircuit' value={memberData.votingPlace.electoralCircuit} onChange={handleInputChange} />
                    <br />

                    <label>Seccion Electoral </label>
                    <input type="text" name='electoralSection' value={memberData.votingPlace.electoralSection} onChange={handleInputChange} />
                    <br />

                    <label>Mesa </label>
                    <input type="text" name='table' value={memberData.votingPlace.table} onChange={handleInputChange} />
                    <br />

                    <label>Orden </label>
                    <input type="text" name='order' value={memberData.votingPlace.order} onChange={handleInputChange} />
                    <br /><br />
                    <button type="button" onClick={updateMemberData}>Actualizar Datos</button>
                </form>
            )}
        </div>
    );
}

export default UpdateForm;

