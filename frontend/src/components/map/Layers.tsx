import { Tile, Group } from "ol/layer";
import { OSM, TileWMS, XYZ } from "ol/source";

function layer(src: String, title: string, layersParam: string, type: string) {
  const layer = new Tile({
    title: `<img src=${src} class='mb-3 w-5 h-5 inline'></img> ${title}`,
    type: type,
    visible: true,
    source: new TileWMS({
      url: "http://localhost:8080/geoserver/sig/wms",
      params: {
        LAYERS: layersParam,
        TILED: true,
      },
      serverType: "geoserver",
      attributions: "&copy Copyright " + new Date().getFullYear() + " MadAtlas",
    }),
  });
  return layer;
}

export const csb = layer("images/centre_sante_base.png", "CSB", "sig:csb", "none");

export const layersGroup = new Group({
  title: "Couches",
  fold: true,
  layers: [csb],
});

const baseOSM = new Tile({
  title: "Open Street Map",
  type: "base",
  visible: true,
  source: new OSM({
    attributions: false,
  }),
});

const baseSatellite = new Tile({
  title: "Satellite",
  type: "base",
  visible: true,
  source: new XYZ({
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  }),
});

const commune = layer(
  "images/centre_sante_base.png",
  "Commune",
  "sig:commune_haute_matsiatra",
  "base"
);

export const baseGroup = new Group({
  title: "Bases",
  fold: true,
  layers: [baseOSM, baseSatellite, commune],
});
