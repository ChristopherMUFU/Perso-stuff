import AdhesionList from "./AdhesionList";
import { useSelector } from "react-redux";
import { selectAdmin } from "../../../app/Redux-slices/adminSlice";

export default function Adhesion() {
  const adhesions = useSelector(selectAdmin).adhesions;

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Adhésions</h1>
      <AdhesionList adhesions={adhesions} />
    </div>
  );
}
