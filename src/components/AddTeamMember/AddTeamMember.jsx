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

const AddTeamMember = () => {
  const [dniToUpdate, setDniToUpdate] = useState('');
  const [docRefToUpdate, setDocRefToUpdate] = useState('');
  const [memberData, setMemberData] = useState(null);
  const [newMember, setNewMember] = useState({
    memCharge: '',
    memDni: '',
    memFirstName: '',
    memLastName: '',
  });

  const handleDniChange = (event) => {
    setDniToUpdate(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMemberData((prevData) => ({
      ...prevData,
      [name]: value.toUpperCase(),
    }));
  };

  const handleNewMemberChange = (event) => {
    const { name, value } = event.target;
    setNewMember((prevData) => ({
      ...prevData,
      [name]: value.toUpperCase(),
    }));
  };

  const searchMember = async () => {
    try {
      const memberRef = collection(db, 'equipos');
      const querySnapshot = await getDocs(query(memberRef, where('teamCode', '==', dniToUpdate)));

      if (!querySnapshot.empty) {
        MySwal.fire({
          title: 'Se encontró el Equipo',
          icon: 'success',
        });
        querySnapshot.forEach((doc) => {
          setDocRefToUpdate(doc.id);
          setMemberData(doc.data());
          console.log(doc.id);
          console.log(doc.data());
        });
      } else {
        MySwal.fire({
          title: 'No se encontró el Equipo en la base de datos',
          icon: 'info',
        });
      }
    } catch (error) {
      MySwal.fire({
        title: 'Error al realizar la consulta',
        text: error,
        icon: 'error',
      });
    }
  };

  const updateMemberData = async (event) => {
    event.preventDefault();
    const q = query(collection(db, 'equipos'), where('teamCode', '==', dniToUpdate));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const firstDocument = querySnapshot.docs[0];

      try {
        await updateDoc(doc(db, 'equipos', firstDocument.id), memberData);
        MySwal.fire({
          title: 'La información se actualizó correctamente',
          icon: 'success',
        });
      } catch (error) {
        MySwal.fire({
          title: 'Ocurrió un error en la actualización',
          text: error,
          icon: 'error',
        });
      }
    } else {
      MySwal.fire({
        title: `No se encontraron documentos que coincidan con el DNI ${dniToUpdate}`,
        icon: 'warning',
      });
    }
  };

  // Función para agregar un nuevo miembro al array 'members' del documento
  const addNewMember = async () => {
    try {
      const docRef = doc(db, 'equipos', docRefToUpdate);

      // Usa la función 'arrayUnion' para agregar el nuevo miembro al array
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
        <h2>Actualizar Miembro</h2>
        <label htmlFor="dni">Codigo de Equipo</label>
        <input type="text" value={dniToUpdate} onChange={handleDniChange} className="form-control" />
        <button className="btn btn-primary mt-2" onClick={searchMember}>
          Buscar
        </button>

        {memberData && (
          <form>
            {/* ... Resto del formulario existente */}
          </form>
        )}

        {docRefToUpdate && (
          <div className="mt-3">
            <h3>Agregar Nuevo Miembro al Equipo</h3>
            <label htmlFor="memCharge">Cargo</label>
            <input type="text" className="form-control" name="memCharge" value={newMember.memCharge} onChange={handleNewMemberChange} />

            <label htmlFor="memDni">DNI</label>
            <input type="text" className="form-control" name="memDni" value={newMember.memDni} onChange={handleNewMemberChange} />

            <label htmlFor="memFirstName">Nombre</label>
            <input type="text" className="form-control" name="memFirstName" value={newMember.memFirstName} onChange={handleNewMemberChange} />

            <label htmlFor="memLastName">Apellido</label>
            <input type="text" className="form-control" name="memLastName" value={newMember.memLastName} onChange={handleNewMemberChange} />

            <button className="btn btn-primary mt-2" onClick={addNewMember}>
              Agregar Nuevo Miembro
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AddTeamMember;
