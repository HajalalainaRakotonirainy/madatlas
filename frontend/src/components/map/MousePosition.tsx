import { MousePosition } from "ol/control";
import { format } from "ol/coordinate";

export const mousePosition = new MousePosition({
  projection: "EPSG:4326",
  coordinateFormat: function (coordinate) {
    return format(coordinate, "{x}, {y}", 6);
  },
});
