import React, { useState, useEffect } from 'react'

import db from '../../database/Database'

import { Link } from 'react-router-dom'
import { collection, doc, getDocs } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const Teams = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = collection(db, 'equipos')
        const allQuery = await getDocs(query)
        const document = allQuery.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setData(document)
        console.log("Datos recuperados", document);
      } catch (error) {
        console.log('Error durante la consulta ' + error);
      }
    }
    fetchData()
  }, [])
  return (
    <div className="container">
      <div className="main-title">
        <h2>Lista de Equipos</h2>
      </div>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>Circuito</th>
            <th scope='col'>Establecimiento</th>
            <th scope='col'>Coordinador</th>
            <th scope='col'>Info</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(item => (
              <tr key={item.id}>
                <td>{item.circuit}</td>
                <td>{item.establishment}</td>
                <td>{item.coordinator}</td>
                <td>
                  <Link to={`/equipos/${item.teamCode}`} state={{teamData: item}}>
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
  )
}

export default Teams