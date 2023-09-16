import React, { useState } from 'react';

import { collection, addDoc } from 'firebase/firestore';
import db from '../../database/Database';
import Swal from 'sweetalert2';

const UploadForm = () => {
  const initialFormData = {
    dni: '',
    firstName: '',
    lastName: '',
    birthday: '',
    phoneNumber: '',
    city: '',
    state: '',
    streetAddress: '',
    circuit: '',
    charge: '',
    placeOfInspection: '',
    establishment: '',
    votingAddress: '',
    district: '',
    electoralCircuit: '',
    electoralSection: '',
    table: '',
    order: ''
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.toUpperCase()
    }));
  };

  const addNewDocument = async () => {
    try {
      const collectionRef = collection(db, 'miembros');

      const newDocumentData = {
        dni: formData.dni,
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthday: formData.birthday,
        phoneNumber: formData.phoneNumber,
        city: formData.city,
        state: formData.state,
        streetAddress: formData.streetAddress,
        circuit: formData.circuit,
        charge: formData.charge,
        placeOfInspection: formData.placeOfInspection,
        establishment: formData.establishment,
        votingAddress: formData.votingAddress,
        district: formData.district,
        electoralCircuit: formData.electoralCircuit,
        electoralSection: formData.electoralSection,
        table: formData.table,
        order: formData.order
      };

      await addDoc(collectionRef, newDocumentData);

      setFormData(initialFormData);
      Swal.fire({
        title: 'Nuevo Fiscal agregado correctamente',
        icon: 'success'
      })
    } catch (error) {
      console.error('Error al agregar el nuevo Fiscal:', error);
      Swal.fire({
        title: 'No se pudo añadir al fiscal',
        icon: 'error',
        text: `Error:${error}`
      })
    }
  };
  return (
    <>
      <div className="container">
        <div className="main-title">
          <h2>Alta de Fiscal</h2>
        </div>
        <form>
          <div className="main-title mt-3">
            <p>Datos Personales</p>
          </div>
          <div className="form-group col-md-auto mb-3">
            <label htmlFor='dni'>DNI</label>
            <input type="text" className='form-control' name='dni' id='dni' placeholder='XXXXXXXX' value={formData.dni} onChange={handleInputChange} />
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='lastName'>Apellido</label>
            <input type="text" className='form-control' name='lastName' id='lastName' placeholder='VANEGAS' value={formData.lastName} onChange={handleInputChange} />
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='firstName'>Nomber</label>
            <input type="text" className='form-control' name='firstName' id='firstName' placeholder='ALVARO' value={formData.firstName} onChange={handleInputChange} />
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='birthday'>Cumpleaños</label>
            <input type="text" className='form-control' name='birthday' id='birthday' placeholder='26-02-1999' value={formData.birthday} onChange={handleInputChange} />
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='phoneNumber'>Numero de Telefono</label>
            <input type="text" className='form-control' name='phoneNumber' id='phoneNumber' placeholder='3855990104' value={formData.phoneNumber} onChange={handleInputChange} />
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='city'>Ciudad</label>
            <input type="text" className='form-control' name='city' id='city' placeholder='CAPITAL' value={formData.city} onChange={handleInputChange} />
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='state'>Provincia</label>
            <input type="text" className='form-control' name='state' id='state' placeholder='SANTIAGO DEL ESTERO' value={formData.state} onChange={handleInputChange} />
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='streetAddress'>Calle</label>
            <input type="text" className='form-control' name='streetAddress' id='streetAddress' placeholder='AV. LIBERTAD 1620' value={formData.streetAddress} onChange={handleInputChange} />
          </div>

          <div className="main-title mt-3">
            <p>Datos de la Fiscalizacion</p>
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='circuit'>Circuito</label>
            <input type="text" className='form-control' name='circuit' id='circuit' placeholder='A1' value={formData.circuit} onChange={handleInputChange} />
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='charge'>Cargo</label>
            <input type="text" className='form-control' name='charge' id='charge' placeholder='FISCAL DE MESA' value={formData.charge} onChange={handleInputChange} />
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='placeOfInspection'>Lugar de Fiscalizacion</label>
            <input type="text" className='form-control' name='placeOfInspection' id='placeOfInspection' placeholder='ESC 281 HENRI DUNANT' value={formData.placeOfInspection} onChange={handleInputChange} />
          </div>

          <div className="main-title mt-3">
            <p>Datos Padronales</p>
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='establishment'>Establecimiento</label>
            <input type="text" className='form-control' name='establishment' id='establishment' placeholder='ESC.1240-SECUND.BICENTENARIO' value={formData.establishment} onChange={handleInputChange} />
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='votingAddress'>Direccion de la Votacion</label>
            <input type="text" className='form-control' name='votingAddress' id='votingAddress' placeholder='B°SIGLO XXI-SECTOR DUPLEX S/N - SANTIAGO DEL ESTERO' value={formData.votingAddress} onChange={handleInputChange} />
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='district'>Districto</label>
            <input type="text" className='form-control' name='district' id='district' placeholder='SANTIAGO DEL ESTERO' value={formData.district} onChange={handleInputChange} />
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='electoralCircuit'>Circuito Electoral</label>
            <input type="text" className='form-control' name='electoralCircuit' id='electoralCircuit' placeholder='7C - CAMPO CONTRERAS' value={formData.electoralCircuit} onChange={handleInputChange} />
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='electoralSection'>Seccion Electoral</label>
            <input type="text" className='form-control' name='electoralSection' id='electoralSection' placeholder='1 - CAPITAL' value={formData.electoralSection} onChange={handleInputChange} />
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='table'>Mesa</label>
            <input type="text" className='form-control' name='table' id='table' placeholder='487' value={formData.table} onChange={handleInputChange} />
          </div>

          <div className="form-group col-md-auto mb-3">
            <label htmlFor='order'>Orden</label>
            <input type="text" className='form-control' name='order' id='order' placeholder='176' value={formData.order} onChange={handleInputChange} />
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

export default UploadForm