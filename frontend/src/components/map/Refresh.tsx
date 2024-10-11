import { csb } from "./Layers";

export function refresh(layer: String) {
  let source;
  switch (layer) {
    case "csb":
      source = csb.getSource();
      break;
    default:
  }
  const params = source.getParams();
  params.temp = new Date().getMilliseconds();
  source.updateParams(params);
}
