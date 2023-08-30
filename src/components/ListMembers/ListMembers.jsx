import React, { useState, useEffect } from 'react'

import './ListMembers.css'

import db from '../../database/Database'
import { collection, getDocs } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import Table from 'react-bootstrap/Table';

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
        <div className='members-list-container'>
            <h2 className='minor-tittle'>Listado de Fiscales</h2>
            <Table striped>
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Cargo</th>
                        <th>Lugar a Fiscalizar</th>
                        <th>Info</th>
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
                                        <button className='more-info'>
                                            <FontAwesomeIcon icon={faEye} style={{ color: "#891cc4" }} />
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default ListMembers