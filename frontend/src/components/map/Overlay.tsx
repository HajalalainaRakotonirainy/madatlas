"use client";

import { faClose, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Overlay } from "ol";
import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { refresh } from "./Refresh";
import FormUrgence from "./FormUrgence";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";

export let overlay: Overlay;

export default ({ data, urgenceName, view, map }) => {
  const [showModal, setShowModal] = useState(false);

  const zoomToLieu = (id) => {
    const urlCartoradio =
      "http://localhost:8080/geoserver/sig/ows?service=WFS&request=GetFeature&version=1.0.0&typeName=sig:" +
      urgenceName +
      "&featureID=" +
      id +
      "&outputFormat=application/json";
    axios.get(urlCartoradio).then((res) => {
      const geometry = res.data.features[0].geometry.coordinates;
      view.fit(new Point(fromLonLat(geometry)), {
        duration: 1500,
        size: map.getSize(),
        maxZoom: 17,
      });
    });
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    axios.post("http://localhost:3001/urgence/modifier", value).then((res) => {
      setShowModal(false);
      refresh(urgenceName);
      zoomToLieu(value.idUrgence);
      Swal.fire({
        text: "Urgence modifié avec succés",
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
      });
    });
  }

  const initialState = {
    idUrgence: "",
    latitude: "",
    longitude: "",
    nom: "",
    adresse: "",
    numero: "",
    heure: "",
    service: "",
    lien: "",
    urgenceName: "csb",
  };
  const [value, setData] = useState(initialState);

  const handleDelete = () => {
    Swal.fire({
      icon: "warning",
      text: "Voulez-vous vraiment supprimer?",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(`http://localhost:3001/urgence/${urgenceName}/${data.id}/`)
          .then(() => {
            refresh(urgenceName);
            overlay.setPosition(undefined);
            Swal.fire({
              text: "Urgence supprimé avec succés",
              icon: "success",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 2000,
            });
          });
      }
    });
  };
  const handleEdit = () => {
    setData({
      idUrgence: data.id,
      latitude: data.latitude,
      longitude: data.longitude,
      nom: data.nom,
      adresse: data.adresse,
      numero: data.numero,
      heure: data.heure,
      service: data.service,
      lien: data.lien,
      urgenceName: urgenceName,
    });

    overlay.setPosition(undefined);
    setShowModal(true);
  };
  const content = () => {
    return (
      <>
        <button className="mr-1">
          <FontAwesomeIcon
            icon={faTrash}
            color="red"
            onClick={() => handleDelete()}
          />
        </button>
        <button>
          <FontAwesomeIcon
            icon={faEdit}
            color="blue"
            onClick={() => handleEdit()}
          />
        </button>
        <div className="flex whitespace-nowrap gap-x-4">
          <h5 className="font-bold">Nom :</h5>
          <p className="col">{data.nom}</p>
        </div>
        <div className="flex whitespace-nowrap gap-x-4">
          <h5 className="font-bold">Adresse :</h5>
          <p className="col">{data.adresse}</p>
        </div>
        <div className="flex whitespace-nowrap gap-x-4">
          <h5 className="font-bold">Numero :</h5>
          <p className="col">{data.numero}</p>
        </div>
        <div className="flex whitespace-nowrap gap-x-4">
          <h5 className="font-bold">Lien :</h5>
          <p className="col">{data.lien}</p>
        </div>
        <div className="flex whitespace-nowrap gap-x-4">
          <h5 className="font-bold">Service :</h5>
          <p className="col">{data.service}</p>
        </div>
        <div className="flex whitespace-nowrap gap-x-4">
          <h5 className="font-bold">Heure :</h5>
          <p className="col">{data.heure}</p>
        </div>
      </>
    );
  };

  useEffect(() => {
    return () => {
      overlay = new Overlay({
        element: document.getElementById("Popup"),
        autoPan: true,
      });
    };
  }, []);

  return (
    <>
      <div
        id="Popup"
        className="ol-popup bg-white block rounded  w-auto max-w-[400px] h-auto max-h-[400px] overflow-auto"
      >
        <button className="absolute right-0 p-1">
          <FontAwesomeIcon
            icon={faClose}
            color="red"
            onClick={() => overlay.setPosition(undefined)}
          />
        </button>
        <div id="PopupContent" className="text-black card-body m-2">
          {content()}
        </div>
      </div>

      {showModal ? (
        <div className="inset-0 bg-black bg-opacity-50 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Modifier Urgence
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <FontAwesomeIcon icon={faClose} color="red" />
                </button>
              </div>
              <form className="p-4 md:p-5" onSubmit={(e) => handleSubmit(e)}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2 relative z-0 w-full mb-5 group sm:col-span-1">
                    <label
                      htmlFor="UrgenceName"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Select urgence
                    </label>
                    <select
                      id="UrgenceName"
                      name="urgenceName"
                      value={value.urgenceName}
                      onChange={(e) =>
                        setData({ ...value, urgenceName: e.target.value })
                      }
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    >
                      <option value="csb">CSB</option>
                      <option value="dispensaire">Dispensaire</option>
                      <option value="gendarmerie">Gendarmerie</option>
                      <option value="hopital">Hopital</option>
                      <option value="jirama">Jirama</option>
                      <option value="pharmacie">Pharmacie</option>
                      <option value="police">Police</option>
                    </select>
                  </div>
                  <div className="col-span-2 relative z-0 w-full mb-5 group sm:col-span-1">
                    <input
                      type="text"
                      name="nom"
                      id="Nom"
                      value={value.nom}
                      onChange={(e) =>
                        setData({ ...value, nom: e.target.value })
                      }
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="Nom"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Nom
                    </label>
                  </div>
                  <div className="col-span-2 relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="adresse"
                      id="Adresse"
                      value={value.adresse}
                      onChange={(e) =>
                        setData({ ...value, adresse: e.target.value })
                      }
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="Adresse"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Adresse
                    </label>
                  </div>
                  <div className="col-span-2 relative z-0 w-full mb-5 group sm:col-span-1">
                    <input
                      type="tel"
                      name="numero"
                      id="Numero"
                      value={value.numero}
                      onChange={(e) =>
                        setData({ ...value, numero: e.target.value })
                      }
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="Numero"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Numero
                    </label>
                  </div>
                  <div className="col-span-2 relative z-0 w-full mb-5 group sm:col-span-1">
                    <input
                      type="text"
                      name="lien"
                      id="Lien"
                      value={value.lien}
                      onChange={(e) =>
                        setData({ ...value, lien: e.target.value })
                      }
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="Lien"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Lien
                    </label>
                  </div>
                  <div className="col-span-2 relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="heure"
                      id="Heure"
                      value={value.heure}
                      onChange={(e) =>
                        setData({ ...value, heure: e.target.value })
                      }
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="Heure"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Heure
                    </label>
                  </div>
                  <div className="col-span-2 relative z-0 w-full mb-5 group sm:col-span-1">
                    <input
                      type="number"
                      name="longitude"
                      step={0.000001}
                      id="Longitude"
                      value={value.longitude}
                      onChange={(e) =>
                        setData({ ...value, longitude: e.target.value })
                      }
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="Longitude"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Longitude
                    </label>
                  </div>
                  <div className="col-span-2 relative z-0 w-full mb-5 group sm:col-span-1">
                    <input
                      type="number"
                      name="latitude"
                      step={0.000001}
                      id="Latitude"
                      value={value.latitude}
                      onChange={(e) =>
                        setData({ ...value, latitude: e.target.value })
                      }
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="Latitude"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Latitude
                    </label>
                  </div>
                  <div className="col-span-2 relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="service"
                      id="Service"
                      value={value.service}
                      onChange={(e) =>
                        setData({ ...value, service: e.target.value })
                      }
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="Service"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Service
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Modifier
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
