import React from 'react'

import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <h2><NavLink to={'/'} className={'navbar-brand'}>CiviCapture</NavLink></h2>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to={'/'} className={'nav-link'} aria-current='page'>Inico</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to={'/listaVehiculos'} className={'nav-link'} aria-current='page'>Listar Vehiculos</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to={'/equipos'} className={'nav-link'} aria-current='page'>Equipos</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Circuitos
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink className={'dropdown-item'} to={'/listarCircuitos'}>Todos los Circuitos</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={'dropdown-item'} to={'/seleccionarCircuito'}>Seleccionar Circuito</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Listar Fiscales
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink className={'dropdown-item'} to={'/listaFiscales'}>Todos</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={'dropdown-item'} to={'/fiscalesMesa'}>Fiscales de Mesa</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={'dropdown-item'} to={'/fiscalesGenerales'}>Fiscales Generales</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Altas
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink className={'dropdown-item'} to={'/añadirFiscal'}>Alta de Fiscales</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={'dropdown-item'} to={'/añadirVehiculo'}>Alta de Vehiculos</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={'dropdown-item'} to={'/crearEquipo'}>Alta de Equipo</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Actualizaciones
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink className={'dropdown-item'} to={'/editarFiscal'}>Modificar Fiscales</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={'dropdown-item'} to={'/editarVehiculo'}>Modificar Vehiculos</NavLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar