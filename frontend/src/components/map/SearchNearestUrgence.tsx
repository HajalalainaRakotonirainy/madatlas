import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { transformCoordinate } from "./Geolocalisation";

export default ({ view, map }) => {
  const zoomToLieu = (id) => {
    const urlCartoradio =
      "http://localhost:8080/geoserver/sig/ows?service=WFS&request=GetFeature&version=1.0.0&typeName=sig:" +
      data.urgenceName +
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

  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState({
    urgenceName: "csb",
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (transformCoordinate) {
      const dataToSend = {
        latitude: transformCoordinate[1],
        longitude: transformCoordinate[0],
        urgenceName: data.urgenceName,
      };

      axios
        .post("http://localhost:3001/urgence/proche", dataToSend)
        .then((res) => {
          const data = res.data;

          if (data.length > 0) {
            zoomToLieu(data[0].id);
          } else {
            Swal.fire({
              text: "Aucun urgence proche",
              icon: "error",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 2000,
            });
          }
        });
    } else {
      Swal.fire({
        text: "Localisation non trouvé",
        icon: "error",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
      });
    }
  }

  return (
    <>
      <button
        onClick={() => setShowModal(!showModal)}
        className="bg-white absolute w-8 h-8 ms-2 mt-40 rounded hover:shadow-lg"
      >
        <FontAwesomeIcon icon={faSearch} color="green" />
      </button>

      {showModal ? (
        <div className="bg-[rgba(255,255,255,0.7)] absolute ms-14 mt-40 max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-lg mb-2">Rechercher</div>
            <form
              className="flex items-center space-x-4"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="flex-grow">
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
                  onChange={(e) =>
                    setData({ ...data, urgenceName: e.target.value })
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
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-200 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">
              #tag1
            </span>
            <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">
              #tag2
            </span>
            <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">
              #tag3
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};
