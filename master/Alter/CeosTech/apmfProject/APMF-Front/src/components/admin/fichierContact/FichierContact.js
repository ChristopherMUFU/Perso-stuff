import ContactsList from "./ContactsList";
import { useSelector } from "react-redux";
import { selectAdmin } from "../../../app/Redux-slices/adminSlice";

export default function FichierContact() {
  const contacts = useSelector(selectAdmin).contacts;

  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Gestion des contacts
      </h2>
      <ContactsList contacts={contacts} />
    </>
  );
}
