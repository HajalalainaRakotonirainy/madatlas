"use client";

import { View, Map } from "ol";
import { fromLonLat } from "ol/proj";
import { useEffect, useState, useRef } from "react";
import { mousePosition } from "@/components/map/MousePosition";
import { layerSwitcher } from "@/components/map/LayerSwitcher";
import { baseGroup, layersGroup, csb } from "@/components/map/Layers";
import { scaleLine } from "@/components/map/ScaleLine";
import Geolocalisation from "@/components/map/Geolocalisation";
import axios from "axios";
import Overlay, { overlay } from "@/components/map/Overlay";
import FormUrgence from "@/components/map/FormUrgence";
import FormUser from "@/components/map/FormUser";
import ListUser from "@/components/map/ListUser";
import SearchNearestUrgence from "@/components/map/SearchNearestUrgence";
import { TileWMS } from "ol/source";
import HomeButton from "@/components/map/HomeButton";
import { isAuthenticated } from "@/library/IsAuthenticated";

export default () => {
  const [state, setstate] = useState(undefined);
  const [maps, setmaps] = useState(undefined);
  const [urgenceName, setUrgenceName] = useState("");
  const [overlayData, setOverlayData] = useState({
    latitude: "",
    longitude: "",
    nom: "",
    adresse: "",
    numero: "",
    heure: "",
    service: "",
    lien: "",
    id: "",
  });

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    isAuthenticated().then((res) => {      
      setAuthenticated(res);
    });
    const view = new View({
      center: fromLonLat([5194478.276629483, -2443316.874277159], "EPSG:4326"),
      zoom: 8.8,
      minZoom: 5.8,
      maxZoom: 23,
    });

    const map = new Map({
      target: "Map",
      view: view,
    });

    map.on("singleclick", (e) => {
      map.addOverlay(overlay);

      const resolution = view.getResolution();
      const projection = view.getProjection();

      layersGroup.getLayers().forEach((layer) => {
        const source = layer.getSource();

        if (source instanceof TileWMS) {
          const featureInfoUrl = source.getFeatureInfoUrl(
            e.coordinate,
            resolution,
            projection,
            {
              INFO_FORMAT: "application/json",
            }
          );

          axios
            .post("http://localhost:3001/click", { url: featureInfoUrl })
            .then((res) => {
              const data = res.data;
              const numberReturned = data.numberReturned;
              if (numberReturned > 0) {
                const feature = data.features[0];
                const id = feature.id.split(".");

                axios
                  .get("http://localhost:3001/urgence/" + id[0] + "/" + id[1])
                  .then((resp) => {
                    setOverlayData(resp.data[0]);
                    setUrgenceName(id[0]);
                    overlay.setPosition(e.coordinate);
                  });
              } else {
                overlay.setPosition(undefined);
              }
            });
        }
      });
    });

    map.addLayer(baseGroup);
    map.addLayer(layersGroup);

    map.addControl(layerSwitcher);
    map.addControl(mousePosition);
    map.addControl(scaleLine);

    setstate(view);
    setmaps(map);

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return (
    <div>
      <Overlay
        data={overlayData}
        urgenceName={urgenceName}
        view={state}
        map={maps}
      />
      <div id="Map" className="absolute h-5/6 w-full"></div>
      { authenticated ? <FormUrgence view={state} map={maps} /> : ""}
      {/* <ListUser /> */}
      <SearchNearestUrgence view={state} map={maps} />
      <HomeButton view={state}/>
      {state && maps ? <Geolocalisation view={state} map={maps} /> : ""}
    </div>
  );
};
