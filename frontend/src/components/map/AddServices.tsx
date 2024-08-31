import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

export default () => {
  function click(e) {
    console.log("tonga");
  }

  return (
    <button
      id="AddButton"
      onClick={click}
      className="bg-white absolute w-8 h-8 ms-2 mt-16 rounded hover:shadow-lg"
    >
      <FontAwesomeIcon icon={faPlus} color="green"/>
    </button>
  );
};
