import DonsList from "./DonsList";
import { useSelector } from "react-redux";
import { selectAdmin } from "../../../app/Redux-slices/adminSlice";

export default function Don() {
  const dons = useSelector(selectAdmin).dons;

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Don</h1>
      <DonsList dons={dons} />
    </>
  );
}
