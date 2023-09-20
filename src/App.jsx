import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import News from './components/News/News'
import Navbar from './components/Navbar/Navbar'
import ListMembers from './components/ListMembers/ListMembers'
import AttorneyGeneralList from './components/AttorneyGeneralList/AttorneyGeneralList'
import TableProsecutorList from './components/TableProsecutorList/TableProsecutorList'
import UploadForm from './components/UploadForm/UploadForm'
import MemberDetails from './components/MemberDetails/MemberDetails'
import AddVihicle from './components/AddVihicle/AddVihicle'
import UpdateVihicleForm from './components/UpdateVihicleForm/UpdateVihicleForm'
import VehicleList from './components/VehicleList/VehicleList'
import DriverDetails from './components/DriverDetails/DriverDetails'
import ListForCircuit from './components/ListForCircuit/ListForCircuit'
import ListSelectCircuit from './components/ListSelectCircuit/ListSelectCircuit'
import Teams from './components/Teams/Teams'
import TeamDetails from './components/TeamDetails/TeamDetails'
import CreateTeams from './components/CreateTeams/CreateTeams'
import AddTeamMember from './components/AddTeamMember/AddTeamMember'
import UpdateForm from './components/UpdateForm/UpdateForm'
import ListForEstablishment from './components/ListForEstablishment/ListForEstablishment'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<News/>}></Route>
          <Route path='/listaFiscales' element={<ListMembers />}></Route>
          <Route path='/listaFiscales/:dni' Component={MemberDetails}></Route>
          <Route path='/fiscalesMesa' element={<TableProsecutorList />} />
          <Route path='/fiscalesGenerales' element={<AttorneyGeneralList />} />
          <Route path='/añadirFiscal' element={<UploadForm />}></Route>
          <Route path='/añadirVehiculo' element={<AddVihicle />}></Route>
          <Route path='/editarFiscal' element={<UpdateForm />}></Route>
          <Route path='/editarVehiculo' element={<UpdateVihicleForm />}></Route>
          <Route path='/listaVehiculos' element={<VehicleList />}></Route>
          <Route path='/listaVehiculos/:dni' element={<DriverDetails />}></Route>
          <Route path='/listarCircuitos' element={<ListForCircuit />}></Route>
          <Route path='/seleccionarCircuito' element={<ListSelectCircuit />}></Route>
          <Route path='/equipos' element={<Teams />}></Route>
          <Route path='/equipos/:teamCode' element={<TeamDetails />}></Route>
          <Route path='/crearEquipo' element={<CreateTeams />}></Route>
          <Route path='/añadirMiembro' element={<AddTeamMember />}></Route>
          <Route path='/listarEstablecimiento' element={<ListForEstablishment />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App