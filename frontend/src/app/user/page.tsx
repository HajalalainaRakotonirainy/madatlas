"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
const Cookies = require("js-cookie");
import axios from "axios";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
// import "datatables.net-select-dt";
// import "datatables.net-responsive-dt";
import "/public/css/tailwind.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faClose,
  faEdit,
  faInfo,
  faTrash,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Footer from "@/components/Footer";

DataTable.use(DT);

export default () => {
  const router = useRouter();

  const [user, setUser] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    axios.get("http://localhost:3001/utilisateur").then((res) => {
      setUser(res.data);
    });
  }

  function handleDelete(id: number) {
    Swal.fire({
      icon: "warning",
      showCancelButton: true,
      input: "password",
      inputLabel: "Entrer mot de passe de l'utilisateur a supprimer",
      confirmButtonText: "Supprimer",
      cancelButtonText: "Annuler",
    }).then((resp) => {
      if (resp.isConfirmed) {
        axios
          .post(`http://localhost:3001/utilisateur/check`, {
            idUtilisateur: id,
            password: resp.value,
          })
          .then((response) => {
            if (response.data.length > 0) {
              axios
                .delete(`http://localhost:3001/utilisateur/${id}/`)
                .then(() => {
                  loadData();
                  Swal.fire({
                    text: "Utilisateur supprimé avec succés",
                    icon: "success",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 2000,
                  });
                });
            } else {
              Swal.fire({
                text: "Mot de passe error",
                icon: "error",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 2000,
              });
            }
          });
      }
    });
  }

  function handleModify(e: any, id: number) {
    e.preventDefault();
    router.push(`/register?id=${id}`);
  }

  return (
    <>
      <DataTable
        className="m-2"
        data={user}
        slots={{
          3: (data: any, row: any) => (
            <>
              <button
                className="modify-btn"
                onClick={(e) => handleModify(e, row.id)}
              >
                <FontAwesomeIcon icon={faEdit} color="blue" /> Modify
              </button>
              <button
                className="modify-btn"
                onClick={() => handleDelete(row.id)}
              >
                <FontAwesomeIcon icon={faTrash} color="red" /> Delete
              </button>
            </>
          ),
        }}
        options={{
          columns: [{ data: "nom" }, { data: "prenom" }, { data: "email" }],
        }}
      >
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>
              <div className="flex flex-wrap justify-center">
                <a
                  href="/register"
                  className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  <FontAwesomeIcon icon={faAdd} /> Ajouter
                </a>
              </div>
            </th>
          </tr>
        </thead>
      </DataTable>
      <Footer />
    </>
  );
};
