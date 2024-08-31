import Image from "next/image";
import { Feature, Geolocation } from "ol";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Fill, Stroke, Circle } from "ol/style";
import { useState } from "react";

export default ({ view, map }) => {
  const [source, setsource] = useState("images/crosshairs.svg");
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
  new VectorLayer({
    map: map,
    source: new VectorSource({
      features: [accuracyFeature, positionFeature],
    }),
  });

  function click() {
    const coordinates = geolocation.getPosition();
    const accuracy = geolocation.getAccuracyGeometry();

    if (source == "images/crosshairs_active.svg") {
      setsource("images/crosshairs.svg");
      positionFeature.setGeometry(undefined);
      accuracyFeature.setGeometry(undefined);
    } else {
      if (coordinates) {
        setsource("images/crosshairs_active.svg");
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
      <Image src={source} alt="" fill />
    </button>
  );
};
