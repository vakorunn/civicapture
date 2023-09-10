import React from 'react'

import { useLocation } from 'react-router-dom'

const MemberDetails = () => {
  const location = useLocation()
  const { memberData } = location.state
  return (
    <>
      <div className="container">
        <div className="main-title">
          <h2>Información del Fiscal</h2>
        </div>
        <div className="row">
          <div className="main-title">
            <p>Información Personal</p>
          </div>
          <div className="col">
            <p>DNI: {memberData.dni}</p>
            <p>Apellido y Nombre: {memberData.lastName} {memberData.firstName}</p>
            <p>Fecha de Nacimiento: {memberData.birthday}</p>
            <p>Numero de Telefono: {memberData.phoneNumber}</p>
            <p>Ciudad: {memberData.address.city}</p>
            <p>Provincia: {memberData.address.state}</p>
            <p>Calle: {memberData.address.streetAddress}</p>
          </div>
        </div>
        <div className="row">
          <div className="main-title">
            <p>Información de Fiscalización</p>
          </div>
          <div className="col">
            <p>Cargo: {memberData.ocupation.charge}</p>
            <p>Circuito: {memberData.ocupation.circuit}</p>
            <p>Lugar a Fiscalizar: {memberData.ocupation.placeOfInspection}</p>
          </div>
        </div>
        <div className="row">
          <div className="main-title">
            <p>Informacion Padronal</p>
          </div>
          <div className="col">
            <p>Establecimiento: {memberData.votingPlace.establishment}</p>
            <p>Dirección: {memberData.votingPlace.votingAddress}</p>
            <p>Districto: {memberData.votingPlace.district}</p>
            <p>Circuito Electoral: {memberData.votingPlace.electoralCircuit}</p>
            <p>Seccion Electoral: {memberData.votingPlace.electoralSection}</p>
            <p>Orden: {memberData.votingPlace.order}</p>
            <p>Table: {memberData.votingPlace.table}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MemberDetails