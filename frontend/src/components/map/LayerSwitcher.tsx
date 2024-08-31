import LayerSwitcher from "ol-layerswitcher";

export const layerSwitcher = new LayerSwitcher({
  activationMode: "click",
  startActive: false,
  groupSelectStyle: "children",
  tipLabel: "Montrer légende",
  collapseTipLabel: "Cacher légende",
});
