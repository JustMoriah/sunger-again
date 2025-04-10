import React, { useState, useEffect } from "react";
import axios from "axios";
import isologo from '../assets/isologo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavDropdown } from 'react-bootstrap';
import { DropdownSubmenu } from 'react-bootstrap-submenu';

const NavBar = () => {
    const id_usuario = sessionStorage.getItem("id");
    const [userRole, setUserRole] = useState(null);
    const [isNavActive, setIsNavActive] = useState(false); // To toggle the mobile menu

    useEffect(() => {
        axios.get(`http://localhost:4000/api/users/id/${id_usuario}`)
            .then((response) => {
                const storedUser = response.data;
                if (storedUser) {
                    setUserRole(storedUser.id_rol);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    window.location.href = "/login";
                } else {
                    console.error("An error occurred while fetching user data:", error);
                }
            });
    }, [id_usuario]);

    const signout = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        const loginData = {
            id_usuario: id_usuario,
            accion: "Logout",
            hora: formattedDate,
        };

        console.log('Sending logout data:', loginData);

        axios.post("http://localhost:4000/api/logins/", loginData)
            .then(() => {
                console.log("Logout registrado correctamente");
                sessionStorage.clear(); // Clear session after successful logout
                window.location.href = "/login"; // Redirect to login page
            })
            .catch(error => {
                console.error("Error al registrar logout:", error);
            });
    };

    const toggleNav = () => {
        setIsNavActive(prevState => !prevState);
    };

    return (
        <div className={`navbar ${isNavActive ? 'active' : ''}`}>
            <a href="/home" className="barLogo">
                <img src={isologo} width="100" height="40" alt="Logo" />
            </a>
            <div className="hamburger" onClick={toggleNav}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="navLinks">
                {/* Render links based on user role */}
                {userRole === 1 ? (
                    <>
                        <a href="/home">Inicio</a>
                            <NavDropdown title="Manejo de..." id="basic-nav-dropdown">
                                <DropdownSubmenu className="dropdown-submenu" title="Cargadores">
                                    <NavDropdown.Item href="/charger-manage">Cargadores</NavDropdown.Item>
                                    <NavDropdown.Item href="/maintenance">Mantenimiento</NavDropdown.Item>
                                </DropdownSubmenu>
                                <DropdownSubmenu className="dropdown-submenu" title="Usuarios">
                                    <NavDropdown.Item href="/user-manage">Usuarios</NavDropdown.Item>
                                    <NavDropdown.Item href="/role-manage">Roles</NavDropdown.Item>
                                    <NavDropdown.Item href="/login-history">Logins</NavDropdown.Item>
                                </DropdownSubmenu>
                            </NavDropdown>
                        {/* More Links */}
                    </>
                ) : userRole === 2 ? (
                    <>
                        <a href="/home">Inicio</a>
                        <a href="/maintenance">Mantenimiento</a>
                    </>
                ) : userRole === 3 ? (
                    <>
                        <a href="/home">Inicio</a>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
                <button onClick={signout} className="outButton">Cerrar Sesion</button>
            </div>
        </div>
    );
};

export default NavBar;
