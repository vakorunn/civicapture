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
        <div className="row border border-primary">
          <div className="main-title">
            <p>Informacion Personal</p>
          </div>
          <div className="row p-2 m-auto">
            <div className="row p-3 m-auto">
              <div className='col-6 border border-primary d-flex justify-content-center'>
                <p>Apellido y Nombre: {memberData.lastName} {memberData.firstName}</p>
              </div>
              <div className='col-6 border border-primary d-flex justify-content-center'>
                <p>DNI: {}</p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="main-title">
            <p>Información Personal</p>
          </div>
          <div className="col">
            <p>DNI: {memberData.dni}</p>
            <p>Apellido y Nombre: {memberData.lastName} {memberData.firstName}</p>
            <p>Fecha de Nacimiento: {memberData.birthday}</p>
            <p>Numero de Telefono: {memberData.phoneNumber}</p>
            <p>Ciudad: {memberData.city}</p>
            <p>Provincia: {memberData.state}</p>
            <p>Calle: {memberData.streetAddress}</p>
          </div>
        </div>
        <div className="row">
          <div className="main-title">
            <p>Información de Fiscalización</p>
          </div>
          <div className="col">
            <p>Cargo: {memberData.charge}</p>
            <p>Circuito: {memberData.circuit}</p>
            <p>Lugar a Fiscalizar: {memberData.placeOfInspection}</p>
          </div>
        </div>
        <div className="row">
          <div className="main-title">
            <p>Informacion Padronal</p>
          </div>
          <div className="col">
            <p>Establecimiento: {memberData.establishment}</p>
            <p>Dirección: {memberData.votingAddress}</p>
            <p>Districto: {memberData.district}</p>
            <p>Circuito Electoral: {memberData.electoralCircuit}</p>
            <p>Seccion Electoral: {memberData.electoralSection}</p>
            <p>Orden: {memberData.order}</p>
            <p>Table: {memberData.table}</p>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default MemberDetails