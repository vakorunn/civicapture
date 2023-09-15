import React from 'react'

import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const TeamDetails = () => {
  const location = useLocation()
  const { teamData } = location.state
  return (
    <div className="container">
      <div className="main-title">
        <h2>Informacion del Equipo</h2>
      </div>
      <div className="row border border-primary">
        <div className="main-title">
          <p>Datos del Lider</p>
        </div>
        <div className="row p-2 m-auto">
          <div className="row p-3 m-auto">
            <div className="col-6 border border-primary d-flex justify-content-center">
              <p className='m-auto p-2'>Codigo del Equipo: {teamData.teamCode}</p>
            </div>
            <div className="col-6 border border-primary d-flex justify-content-center">
              <p className='m-auto p-2'>Cargo: {teamData.leader.charge}</p>
            </div>
          </div>
          <div className="col-6 border border-primary d-flex justify-content-center">
            <p className='m-auto p-2'>DNI: {teamData.leader.dni}</p>
          </div>
          <div className="col-6 border border-primary d-flex justify-content-center">
            <p className='m-auto p-2'>Apellido y Nombre: {teamData.leader.lastName} {teamData.leader.firstName}</p>
          </div>
        </div>
      </div>
      <div className="row border border-success mt-3">
        <div className="main-title">
          <p>Datos de la Fiscalizacion</p>
        </div>
        <div className="row p-2 m-auto">
          <div className="col-6 border border-success d-flex justiy-content-center">
            <p className="m-auto p-2">Circuito: {teamData.circuit}</p>
          </div>
          <div className="col-6 border border-success d-flex justiy-content-center">
            <p className="m-auto p-2">Establecimiento: {teamData.establishment}</p>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="main-title">
          <p>Miembros del Equipo</p>
        </div>
        <table className="table table-info">
          <thead>
            <tr>
              <th scope='col'>DNI</th>
              <th scope='col'>Apellido</th>
              <th scope='col'>Nombre</th>
              <th scope='col'>Cargo</th>
              <th scope='col'>Info</th>
            </tr>
          </thead>
          <tbody>
            {
              teamData.members.map(item => (
                <tr key={item.memDni}>
                  <td>{item.memDni}</td>
                  <td>{item.memLastName}</td>
                  <td>{item.memFirstName}</td>
                  <td>{item.memCharge}</td>
                  <td>
                    <Link to={`/listaFiscales/${item.memDni}`} state={{ memberData: item }}>
                      <button className='btn btn-primary'>
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <Link to={`/añadirMiembro`}>
        <button className='btn btn-success'>Añadir Miembro al Equipo</button>
      </Link>
    </div>
  )
}

export default TeamDetails