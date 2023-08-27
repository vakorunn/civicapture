import React from 'react'

import { useLocation, useParams } from 'react-router-dom'

const MemberDetails = () => {
    const location = useLocation()
    //const { dni } = useParams()
    //const member = {id: dni, firstName: `Miembro ${dni}`, description: 'Lorem'}
    const { memberData } = location.state
    return (
        <div>
            <h2>Datos del Miembro</h2>
            <br />
            <h2>Información Personal</h2>
            <h3>Apellido y Nombre:{memberData.lastName} {memberData.firstName}</h3>
            <h3>DNI:{memberData.dni}</h3>
            <p>Fecha de Nacimiento:{memberData.birthday}</p>
            <p>Numero de Telefono:{memberData.phoneNumber}</p>
            <p>Dirección:{memberData.address.streetAddress}</p>
            <p>Provincia:{memberData.address.state}</p>
            <p>Departamento:{memberData.address.city}</p>

            <br />
            <h2>Datos de la Fiscalización</h2>
            <p>Cargo:{memberData.ocupation.charge}</p>
            <p>Circuito:{memberData.ocupation.circuit}</p>
            <p>Lugar de Fiscalización:{memberData.ocupation.placeOfInspection}</p>

            <br />
            <h2>Datos Padronales</h2>
            <p>Estableciento:{memberData.votingPlace.establishment}</p>
            <p>Direccion del Establecimiento:{memberData.votingPlace.votingAddress}</p>
            <p>Districto:{memberData.votingPlace.district}</p>
            <p>Circuito Electoral:{memberData.votingPlace.electoralCircuit}</p>
            <p>Sección Electoral:{memberData.votingPlace.electoralSection}</p>
            <p>Mesa:{memberData.votingPlace.table}</p>
            <p>Orden:{memberData.votingPlace.order}</p>
            {/* <p>{member.description}</p> */}
        </div>
    )
}

export default MemberDetails