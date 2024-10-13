import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

export default ({view, map}) => {

  const zoomToLieu = (id) => {
    const urlCartoradio = "http://localhost:8080/geoserver/sig/ows?service=WFS&request=GetFeature&version=1.0.0&typeName=sig:"+data.urgenceName+"&featureID="+id+"&outputFormat=application/json";
    axios.get(urlCartoradio).then((res)=>{
      const geometry = res.data.features[0].geometry.coordinates;
      view.fit(new Point(fromLonLat(geometry)), {duration:1500, size:map.getSize(), maxZoom:17});
    });
  }

  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const initialState = {
    latitude: "",
    longitude: "",
    nom: "",
    adresse: "",
    numero: "",
    heure: "",
    service: "",
    lien: "",
    urgenceName: "csb",
  }
  const [data, setData] = useState(initialState);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    axios
        .post('http://localhost:3001/urgence/ajouter', data)
        .then((res) => {
          setShowModal(false)
          setData(initialState)
          zoomToLieu(res.data[0].id)
          Swal.fire({
            text: "Urgence ajouté avec succés",
            icon: "success",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
          });
        });
  };

  return (
    <>
      <button
        id="AddButton"
        onClick={() => setShowModal(true)}
        className="bg-white absolute w-8 h-8 ms-2 mt-52 rounded hover:shadow-lg"
      >
        <FontAwesomeIcon icon={faPlus} color="green" />
      </button>

      {showModal ? (
        <div className="inset-0 bg-black bg-opacity-50 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Ajouter Urgence
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <FontAwesomeIcon icon={faClose} color="red" />
                </button>
              </div>
              <form id="test" className="p-4 md:p-5" onSubmit={(e)=>handleSubmit(e)}>
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
                      value={data.urgenceName}
                      onChange={(e) => setData({ ...data, urgenceName: e.target.value })}
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
                      value={data.nom}
                      onChange={(e) => setData({ ...data, nom: e.target.value })}
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
                      value={data.adresse}
                      onChange={(e) => setData({ ...data, adresse: e.target.value })}
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
                      value={data.numero}
                      onChange={(e) => setData({ ...data, numero: e.target.value })}
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
                      value={data.lien}
                      onChange={(e) => setData({ ...data, lien: e.target.value })}
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
                      value={data.heure}
                      onChange={(e) => setData({ ...data, heure: e.target.value })}
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
                      value={data.longitude}
                      onChange={(e) => setData({ ...data, longitude: e.target.value })}
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
                      value={data.latitude}
                      onChange={(e) => setData({ ...data, latitude: e.target.value })}
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
                      value={data.service}
                      onChange={(e) => setData({ ...data, service: e.target.value })}
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
                  Ajouter
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
