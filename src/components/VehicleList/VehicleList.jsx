import React, { useEffect, useState } from 'react'

import db from '../../database/Database'

import { collection, getDocs } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const VehicleList = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = collection(db, 'vehiculos')
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
          <h2>Listado de Vehiculos</h2>
        </div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>Patente</th>
              <th scope='col'>Modelo</th>
              <th scope='col'>Fabricante</th>
              <th scope='col'>Chofer</th>
              <th scope='col'>Info</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(item => (
                <tr key={item.id}>
                  <td>{item.patent}</td>
                  <td>{item.model}</td>
                  <td>{item.maker}</td>
                  <td>{item.driver.lastName} {item.driver.firstName}</td>
                  <td>
                    <Link to={`/listaVehiculos/${item.driver.dni}`} state={{ memberData: item }}>
                      <button className='more-info'>
                        <FontAwesomeIcon icon={faEye} style={{ color: "#891cc4" }} />
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

export default VehicleList