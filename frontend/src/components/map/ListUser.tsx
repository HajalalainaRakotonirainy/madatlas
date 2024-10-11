"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
const Cookies = require("js-cookie");
import axios from "axios";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
// import "datatables.net-select-dt";
// import "datatables.net-responsive-dt";
import "/public/css/tailwind.css"
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
    <>
      <button
        id="AddUserButton"
        onClick={() => setShowModal(true)}
        className="bg-white absolute w-8 h-8 ms-2 mt-28 rounded hover:shadow-lg"
      >
        <FontAwesomeIcon icon={faUserGroup} color="green" />
      </button>

      {showModal && user ? (
        <div className="inset-0 bg-black bg-opacity-50 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-4xl max-h-full">
            {" "}
            {/* Max width increased */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Product
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <FontAwesomeIcon icon={faClose} color="red" />
                </button>
              </div>
              <div className="p-4 overflow-auto max-h-[500px]">
                {" "}
                {/* Scrollable container */}
                <DataTable
                  data={user}
                  className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bootstrap-container"
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
                    columns: [
                      { data: "nom" },
                      { data: "prenom" },
                      { data: "email" },
                    ],
                  }}
                >
                  <thead>
                    <tr>
                      <th className="px-6 py-3">Nom</th>
                      <th className="px-6 py-3">Prénom</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">
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
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
