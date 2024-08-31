import { Overlay } from "ol";

export default () => {
  const overlay = new Overlay({
    element: popup[0],
    autoPan: true,
  });
  return (
    <div id="Popup" className="card shadow">
      <button id="PopupCloser" className="btn btn-sm btn-closer border-0">
        <i className="fa fa-window-close text-danger"></i>
      </button>
      <div id="PopupContent" className="card-body"></div>
    </div>
  );
};
