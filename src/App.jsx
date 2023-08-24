import React from 'react'

import ListMembers from './components/ListMembers/ListMembers'
import News from './components/News/News'
import UploadForm from './components/UploadForm/UploadForm'
import UpdateForm from './components/UpdateForm/UpdateForm'
import MemberDetails from './components/MemberDetails/MemberDetails'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<News />}></Route>
          <Route path='/listaFiscales' element={<ListMembers />}></Route>
          <Route path='/añadirFiscal' element={<UploadForm />}></Route>
          <Route path='/editarFiscal' element={<UpdateForm />}></Route>
          <Route path='/listaFiscales/:dni' Component={MemberDetails}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App