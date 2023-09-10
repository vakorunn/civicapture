import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import Swal from 'sweetalert2';

import db from '../../database/Database'

const AddVihicle = () => {
  const initialFormData = {
    patent: '',
    model: '',
    maker: '',
    color: '',
    dni: '',
    lastName: '',
    firstName: ''
  }
  const [formData, setFormData] = useState(initialFormData)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.toUpperCase()
    }));
  };

  const navigate = useNavigate()

  const addNewDocument = async () => {
    try {
      const collectionRef = collection(db, 'vehiculos');

      const newDocumentData = {
        patent: formData.patent,
        model: formData.model,
        maker: formData.maker,
        color: formData.color,
        driver: {
          dni: formData.dni,
          lastName: formData.lastName,
          firstName: formData.firstName
        }
      };

      console.log(newDocumentData);

      await addDoc(collectionRef, newDocumentData);

      setFormData(initialFormData);
      Swal.fire({
        title: 'Nuevo vehiculo agregado correctamente',
        icon: 'success'
      })
    } catch (error) {
      console.error('Error al agregar el nuevo vehiculo:', error);
      Swal.fire({
        title: 'No se pudo añadir el vehiculo',
        icon: 'error',
        text: `Error:${error}`
      })
    }
  };

  return (
    <>
      <div className="container">
        <div className="main-title">
          <h2>Alta de Vehiculo</h2>
        </div>
        <form>
          <div className="main-title mt-3">
            <p>Datos del Vehiculo</p>
          </div>
          <div className="form-group col-md-auto mb-3">
            <label htmlFor='patent'>Patente</label>
            <input type="text" className='form-control' name='patent' id='patent' placeholder='AB012CD' value={formData.patent} onChange={handleInputChange} />
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='model'>Modelo</label>
            <input type="text" className='form-control' name='model' id='model' placeholder='UP' value={formData.model} onChange={handleInputChange} />
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='maker'>Fabricante</label>
            <input type="text" className='form-control' name='maker' id='maker' placeholder='VOLKSWAGEN' value={formData.maker} onChange={handleInputChange} />
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='color'>Color</label>
            <input type="text" className='form-control' name='color' id='color' placeholder='ROJO' value={formData.color} onChange={handleInputChange} />
          </div>

          <div className="main-title mt-3">
            <p>Datos del Chofer</p>
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='dni'>DNI</label>
            <input type="text" className='form-control' name='dni' id='dni' placeholder='XXXXXXXX' value={formData.dni} onChange={handleInputChange} />
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='lastName'>Apellido</label>
            <input type="text" className='form-control' name='lastName' id='lastName' placeholder='ZURITA' value={formData.lastName} onChange={handleInputChange} />
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='firstName'>Nombre</label>
            <input type="text" className='form-control' name='firstName' id='firstName' placeholder='MARTIN' value={formData.firstName} onChange={handleInputChange} />
          </div>
        </form>
        <button onClick={addNewDocument} className='btn btn-primary mb-4'>
          <span>Añadir Fisal</span>
          <span></span>
        </button>
      </div>
    </>
  )
}

export default AddVihicle