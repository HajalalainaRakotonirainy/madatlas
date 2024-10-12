"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
const Cookies = require("js-cookie");
import axios from "axios";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
// import "datatables.net-select-dt";
// import "datatables.net-responsive-dt";
// import "/public/css/tailwind.css";
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

DataTable.use(DT);

export default () => {
  const router = useRouter();

  const [user, setUser] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
      text: "Voulez-vous vraiment supprimer?",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(`http://localhost:3001/utilisateur/${id}/`, {
            headers: {
              Authorization: `Token ${Cookies.get("token")}`,
            },
          })
          .then(() => {
            loadData();
            Swal.fire({
              // title: "Error!",
              text: "Utilisateur supprimé avec succés",
              icon: "success",
              // confirmButtonText: 'Cool'
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 2000,
            });
          });
      }
    });
  }

  function handleModify(e: any, id: number) {
    e.preventDefault();
    router.push(`/form/user?id=${id}`);
  }

  return (
    <DataTable
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
            <button className="modify-btn" onClick={() => handleDelete(row.id)}>
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
                href="/form/user"
                className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <FontAwesomeIcon icon={faAdd} /> Ajouter
              </a>
            </div>
          </th>
        </tr>
      </thead>
    </DataTable>
  );
};
