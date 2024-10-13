import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"

export default ({view}) => {
  function click() {
    view.setZoom(8.8);
    view.setCenter([5194478.276629483, -2443316.874277159]);
  }

  return (
    <button
      id="AddButton"
      onClick={()=>click()}
      className="bg-white absolute w-8 h-8 ms-2 mt-16 rounded hover:shadow-lg"
    >
      <FontAwesomeIcon icon={faHome} color="green"/>
    </button>
  );
};
