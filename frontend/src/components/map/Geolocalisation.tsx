import {
  faCrosshairs,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Feature, Geolocation } from "ol";
import { Coordinate } from "ol/coordinate";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import { transform } from "ol/proj";
import VectorSource from "ol/source/Vector";
import { Style, Fill, Stroke, Circle } from "ol/style";
import { useState } from "react";

export let transformCoordinate: Coordinate

export default ({ view, map }) => {
  const [source, setsource] = useState(faCrosshairs);
  const geolocation = new Geolocation({
    trackingOptions: {
      enableHighAccuracy: true,
    },
    tracking: true,
    projection: view.getProjection(),
  });

  //position feature
  const positionFeature = new Feature();
  positionFeature.setStyle(
    new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({
          color: "#3399CC",
        }),
        stroke: new Stroke({
          color: "#fff",
          width: 2,
        }),
      }),
    })
  );

  //accuracy feature
  const accuracyFeature = new Feature();

  //current position user
  const test = new VectorLayer({
    // map: map,
    source: new VectorSource({
      features: [accuracyFeature, positionFeature],
    }),
  });

  function click() {
    const coordinates = geolocation.getPosition();
    const accuracy = geolocation.getAccuracyGeometry();

    if (source == faLocationCrosshairs) {      
      setsource(faCrosshairs);
      
      map.removeLayer(test)
      positionFeature.setGeometry(null);
      accuracyFeature.setGeometry(null);
    } else {
      if (coordinates) {
        transformCoordinate = transform(coordinates, "EPSG:3857", "EPSG:4326");
        
        setsource(faLocationCrosshairs);
        map.addLayer(test)
        positionFeature.setGeometry(new Point(coordinates));
        accuracyFeature.setGeometry(accuracy);
        view.fit(accuracyFeature.getGeometry(), {
          duration: 1500,
          size: map.getSize(),
          maxZoom: 11,
        });
      }
    }
  }

  return (
    <button
      id="LocalisationButton"
      onClick={click}
      className="bg-white rounded-full w-8 h-8 absolute right-5 bottom-10 hover:shadow-lg"
    >
      <FontAwesomeIcon icon={source} color="black" size="2x"/>
    </button>
  );
};
