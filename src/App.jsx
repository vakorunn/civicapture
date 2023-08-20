import React, {useEffect, useState} from 'react'

import db from './database/Database'
import { collection, getDocs } from 'firebase/firestore'

const App = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = collection(db,'miembros')
        const allQuery = await getDocs(query)
        const document = allQuery.docs.map(doc => ({id: doc.id, ...doc.data()}))
        setData(document)
      } catch (error) {
        console.log('Error durante la consulta ' + error);
      }
    }
    fetchData()
  },[])
  return (
    <div>
      <h2>Mis datos de Firebase</h2>
      <ul>
        {
          data.map(item => (
            <li key={item.id}>{item.firstName} - {item.lastName}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default App