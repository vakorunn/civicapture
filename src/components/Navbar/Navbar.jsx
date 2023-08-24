import React from 'react'

import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink className='link' to='/'>Inicio</NavLink>
          </li>
          <li>
            <NavLink className='link' to='/listaFiscales'>Lista de Fiscales</NavLink>
          </li>
          <li>
            <NavLink className='link' to='/añadirFiscal'>Añadir Fiscal</NavLink>
          </li>
          <li>
            <NavLink className='link' to='/editarFiscal'>Editar Fiscal</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar