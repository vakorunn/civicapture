import React, { useEffect, useState } from 'react'

import './ListMembers.css'

import db from '../../database/Database'

import { collection, getDocs } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const ListMembers = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = collection(db, 'miembros')
        const allQuery = await getDocs(query)
        const document = allQuery.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setData(document)
      } catch (error) {
        console.log('Error durante la consulta ' + error);
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <div className="container">
        <div className="main-title">
          <h2>Listado de Fiscales</h2>
        </div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>DNI</th>
              <th scope='col'>Nombre</th>
              <th scope='col'>Apellido</th>
              <th scope='col'>Cargo</th>
              <th scope='col'>Lugar a Fiscalizar</th>
              <th scope='col'>Info</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(item => (
                <tr key={item.id}>
                  <td>{item.dni}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.ocupation.charge}</td>
                  <td>{item.ocupation.placeOfInspection}</td>
                  <td>
                    <Link to={`/listaFiscales/${item.dni}`} state={{ memberData: item }}>
                      <button className='btn btn-primary'>
                        <FontAwesomeIcon icon={faEye}/>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ListMembers