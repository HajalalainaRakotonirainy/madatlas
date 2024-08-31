"use client";

import { View, Map } from "ol";
import { fromLonLat } from "ol/proj";
import { useEffect, useState, useRef } from "react";
import { mousePosition } from "@/components/map/MousePosition";
import { layerSwitcher } from "@/components/map/LayerSwitcher";
import { baseGroup, layersGroup, csb } from "@/components/map/Layers";
import AddServices from "@/components/map/AddServices";
import { scaleLine } from "@/components/map/ScaleLine";
import Geolocalisation from "@/components/map/Geolocalisation";
import axios from "axios";
import axiosInstance from "@/services/axiosInstance";

export default () => {
  const [state, setstate] = useState(undefined);
  const [maps, setmaps] = useState(undefined);
  // const state = useRef("")

  useEffect(() => {
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
      const resolution = view.getResolution();
      const projection = view.getProjection();

      const urlCsb = csb
        .getSource()
        .getFeatureInfoUrl(e.coordinate, resolution, projection, {
          INFO_FORMAT: "application/json",
        });
      axiosInstance.get(urlCsb).then((res) => {
        console.log(res);
      });
    });

    map.addLayer(baseGroup);
    map.addLayer(layersGroup);

    map.addControl(layerSwitcher);
    map.addControl(mousePosition);
    map.addControl(scaleLine);

    // map.addOverlay(Overlay)

    setstate(view);
    setmaps(map);

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return (
    <>
      <div id="Map" className="absolute h-5/6 w-full"></div>
      <AddServices />
      {state && maps ? <Geolocalisation view={state} map={maps} /> : ""}
    </>
  );
};
