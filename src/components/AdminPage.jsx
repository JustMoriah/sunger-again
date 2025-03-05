import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import UsuarioList from './crud/usuarios/UsuarioList';
import NavBar from './NavBar';

export default function AdminPage() {
  const id_usuario = sessionStorage.getItem("id");
  axios.get(`http://localhost:3001/api/users/id/${id_usuario}`)
    .then((response) => {
        const storedUser = response.data;
        if (storedUser) {
          if (storedUser.id_rol != 1 && storedUser.id_rol != 2) {
            window.location.href = "/home";
          }
        }
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        window.location.href = "/login";
    } else {
        console.error("An error occurred while checking for the email:", error);
    }
    });
  return (
    <div>
      <NavBar/><br/><br/>
      <UsuarioList/>
    </div>
  )
}
