import "./App.css";
import {FaSearch} from "react-icons/fa";

export default function App() {

  return (
    <>
    <div className="input-wrapper">
        <FaSearch id="search-icon"/>
        <input placeholder="Type to search..."/>
    </div>
    </>
  )
}
