import React, { useState } from 'react'

import db from '../../database/Database'

import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import MySwal from 'sweetalert2'

const UpdateVihicleForm = () => {
  const [patentToUpdate, setPatentToUpdate] = useState('');
  const [docRefToUpdate, setDocRefToUpdate] = useState('')
  const [vihicleData, setVihicleData] = useState(null)

  const handlePatentChange = (event) => {
    setPatentToUpdate = event.target.value
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setMemberData((prevData) => ({
      ...prevData,
      [name]: value.toUpperCase()
    }))
  }

  const searchVihicle = async () => {
    
  }

  return (
    <>
    </>
  )
}

export default UpdateVihicleForm