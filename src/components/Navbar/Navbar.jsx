import React from 'react'

import './Navbar.css'

import { NavLink } from 'react-router-dom'
import MainTittle from  '../MainTittle/MainTittle'

const Navbar = () => {
  return (
    <header>
      <MainTittle />
      <nav>
        <ul className='navbar'>
          <li className='navbar-element'>
            <NavLink className='navbar-element__link' to='/'>Inicio</NavLink>
          </li>
          <li className='navbar-element'>
            <NavLink className='navbar-element__link' to='/listaFiscales'>Lista de Fiscales</NavLink>
          </li>
          <li className='navbar-element'>
            <NavLink className='navbar-element__link' to='/fiscalesGenerales'>Fiscales Generales</NavLink>
          </li>
          <li className='navbar-element'>
            <NavLink className='navbar-element__link' to='/fiscalesMesa'>Fiscales Mesa</NavLink>
          </li>
          <li className='navbar-element'>
            <NavLink className='navbar-element__link' to='/añadirFiscal'>Añadir Fiscal</NavLink>
          </li>
          <li className='navbar-element'>
            <NavLink className='navbar-element__link' to='/editarFiscal'>Editar Fiscal</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar