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
            <div className="row p-2 m-auto">
              <div className='col-6 border border-primary d-flex justify-content-center'>
                <p className='m-auto p-2'>Apellido y Nombre: {memberData.lastName} {memberData.firstName}</p>
              </div>
              <div className='col-6 border border-primary d-flex justify-content-center'>
                <p className='m-auto p-2'>DNI: {memberData.dni}</p>
              </div>
            </div>
            <div className="row p-2 m-auto">
              <div className="col-6 border border-primary d-flex justify-content-center">
                <p className='m-auto p-2'>Telefono: {memberData.phoneNumber}</p>
              </div>
              <div className='col-6 border border-primary d-flex justify-content-center'>
                <p className="m-auto p-2">Fecha de Nacimiento: {memberData.birthday}</p>
              </div>
            </div>
            <div className="row p-2 m-auto">
              <div className='col-6 border border-primary d-flex justify-content-center'>
                <p className="m-auto p-2">Provincia: {memberData.state}</p>
              </div>
              <div className='col-6 border border-primary d-flex justify-content-center'>
                <p className="m-auto p-2">Ciudad: {memberData.city}</p>
              </div>
            </div>
            <div className="row p-2 m-auto">
              <div className="col-12 border border-primary d-flex justiy-content-center">
                <p className="m-auto p-2">Calle: {memberData.streetAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row border border-success mt-3">
          <div className="main-title">
            <p>Informacion de Fiscalizacion</p>
          </div>
          <div className="row p-2 m-auto">
            <div className="row p-2 m-auto">
              <div className='col-6 border border-success d-flex justify-content-center'>
                <p className="m-auto p-2">Cargo: {memberData.charge}</p>
              </div>
              <div className='col-6 border border-success d-flex justify-content-center'>
                <p className="m-auto p-2">Circuito: {memberData.circuit}</p>
              </div>
            </div>
            <div className="row p-2 m-auto">
              <div className='col-12 border border-success d-flex justify-content-center'>
                <p className="m-auto p-2">Lugar de Fiscalizacion: {memberData.placeOfInspection}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row border border-info mt-3 mb-3">
          <div className="main-title">
            <p>Informacion Padronal</p>
          </div>
          <div className="row p-2 m-auto">
            <div className="row p-2 m-auto">
              <div className='col-6 border border-info d-flex justify-content-center'>
                <p className="m-auto p-2">Establecimiento: {memberData.establishment}</p>
              </div>
              <div className="col-6 border border-info d-flex justify-content-center">
                <p className="m-auto p-2">Direccion: {memberData.votingAddress}</p>
              </div>
            </div>
            <div className="row p-2 m-auto">
              <div className="col-12 border border-info d-flex justify-content-center">
                <p className="m-auto p-2">Districto: {memberData.district}</p>
              </div>
            </div>
            <div className="row p-2 m-auto">
              <div className="col-6 border border-info d-flex justify-content-center">
                <p className="m-auto p-2">Seccion Electoral: {memberData.electoralSection}</p>
              </div>
              <div className="col-6 border border-info d-flex justify-content-center">
                <p className="m-auto p-2">Circuito Electoral: {memberData.electoralCircuit}</p>
              </div>
            </div>
            <div className="row p-2 m-auto">
              <div className="col-6 border border-info d-flex justify-content-center">
                <p className="m-auto p-2">Orden: {memberData.order}</p>
              </div>
              <div className="col-6 border border-info d-flex justify-content-center">
                <p className="m-auto p-2">Mesa: {memberData.table}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MemberDetails