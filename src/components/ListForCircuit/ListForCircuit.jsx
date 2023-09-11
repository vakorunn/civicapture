import React, { useState, useEffect } from 'react';
import db from '../../database/Database';
import { collection, getDocs } from 'firebase/firestore';

const ListForCircuit = () => {
  const [circuitos, setCircuitos] = useState([]);
  const [miembros, setMiembros] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'miembros'));
        const circuitosSet = new Set();

        querySnapshot.forEach((doc) => {
          const ocupation = doc.data().ocupation;
          if (ocupation && ocupation.circuit) {
            circuitosSet.add(ocupation.circuit);
          }
        });

        const circuitosArray = Array.from(circuitosSet).sort(); // Ordenar circuitos
        setCircuitos(circuitosArray);
        setMiembros(querySnapshot.docs.map((doc) => doc.data()));
      } catch (error) {
        console.error('Error al listar circuitos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {circuitos.map((circuito) => (
        <div key={circuito}>
          <h3>Circuito: {circuito}</h3>
          <ul>
            {miembros
              .filter((miembro) => miembro.ocupation.circuit === circuito)
              .map((miembro) => (
                <li key={miembro.dni}>
                  <div>
                    <strong>DNI:</strong> {miembro.dni}
                  </div>
                  <div>
                    <strong>Apellido:</strong> {miembro.lastName}
                  </div>
                  <div>
                    <strong>Nombre:</strong> {miembro.firstName}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ListForCircuit;
