import { csb, dispensaire, gendarmerie, hopital, jirama, pharmacie, police } from "./Layers";

export function refresh(layer: String) {
  let source;
  switch (layer) {
    case "csb":
      source = csb.getSource();
      break;
    case "dispensaire":
      source = dispensaire.getSource();
      break;
    case "gendarmerie":
      source = gendarmerie.getSource();
      break;
    case "hopital":
      source = hopital.getSource();
      break;
    case "jirama":
      source = jirama.getSource();
      break;
    case "pharmacie":
      source = pharmacie.getSource();
      break;
    case "police":
      source = police.getSource();
      break;
    default:
  }
  const params = source.getParams();
  params.temp = new Date().getMilliseconds();
  source.updateParams(params);
}
