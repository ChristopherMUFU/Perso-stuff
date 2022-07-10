import axios from "axios";
import { useState, useRef } from "react";
import { URL } from "../../../middlewares/request";
import { extractFilesNames } from "../../../utilities";
import useForm from "../../../hooks/useForm";
import { TextField, Button } from "@material-ui/core";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import { makeStyles } from "@material-ui/core/styles";
import ModalBootsrap from "../../modal/Modal";
import { useLocation } from "react-router-dom";

//styles des elements html
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "300px",
    padding: "0 2rem",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "2rem 0",
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "0.5rem",
  },
  h2: {
    textAlign: "center",
  },
  button: {
    backgroundColor: "white",
    border: "2px solid blue",
  },
  blueIcon: {
    backgroundColor: "blue",
    border: "2px solid blue",
    borderRadius: "7px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1.5rem",
  },
  divTextOverflow: {
    width: "16rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

// configuration de l'editeur du texte
const editorConfiguration = {
  toolbar: {
    items: [
      "fontFamily",
      "fontColor",
      "fontBackgroundColor",
      "heading",
      "|",
      "bold",
      "italic",
      "|",
      "alignment:left",
      "alignment:center",
      "alignment:right",
      "alignment:justify",
      "|",
      "underline",
      "highlight",
      "horizontalLine",
      "pageBreak",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "outdent",
      "indent",
      "|",
      "findAndReplace",
      // "imageUpload",
      // "imageInsert",
      "blockQuote",
      "insertTable",
      // "mediaEmbed",
      "undo",
      "redo",
    ],
    shouldNotGroupWhenFull: true,
  },
  language: "fr",
  image: {
    toolbar: [
      "imageTextAlternative",
      "imageStyle:full",
      "imageStyle:side",
      "linkImage",
    ],
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  placeholder: "Entrer votre texte ici...",
};

export default function JournalFabry() {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imageUpdated, setImageUpdated] = useState(false);
  const [journalUpdated, setJournalUpdated] = useState(false);

  const [isSending, setIsSending] = useState(false);

  const classes = useStyles();
  const location = useLocation();
  const journalToUpdate = location.state?.journalToUpdate;

  const { imageNameToUpdate, documentNameToUpdate } =
    extractFilesNames(journalToUpdate);

  //pour la defaultValue de date d'apparution
  const today_date = `${new Date()
    .toISOString()
    .substr(0, 10)}T${new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  const initialJournal = journalToUpdate
    ? {
        titre: journalToUpdate.titre,
        photo: journalToUpdate.photo,
        data_apparution: journalToUpdate.data_apparution,
        journal: journalToUpdate.journal,
        text: journalToUpdate.text,
      }
    : {
        titre: "",
        photo: null,
        data_apparution: today_date,
        journal: null,
        text: "",
      };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const estValide = (fieldValues = journal) => {
    const validator = {};

    if ("titre" in fieldValues)
      validator.titre = journal.titre ? null : "Le champ titre est obligatoire";

    // if ("photo" in fieldValues)
    //   validator.photo = journal.photo ? null : "Le champ photo est obligatoire";

    // if ("date_apparution" in fieldValues)
    //   validator.date_apparution = journal.date_apparution ? null : "Le champ date_apparution est obligatoire";

    // if ("journal" in fieldValues)
    //   validator.journal = journal.journal
    //     ? null
    //     : "Le champ journal est obligatoire";

    if ("text" in fieldValues)
      validator.text = journal.text ? null : "Le champ text est obligatoire";

    setErrors({ ...validator });

    // retourne boolean si et seulement si on passe un parametre pour la fonction
    if (fieldValues === journal) {
      return Object.values(validator).every((el) => !el);
    }
  };

  const {
    state: journal,
    setState: setJournal,
    errors,
    setErrors,
    reinitialiserState,
  } = useForm(initialJournal, estValide);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (estValide()) {
      setIsSending(true);
      // On utilise FormData pour envoyer un fichier vers l'api, car avec sendresquest cela ne fonctionne pas vu que ça envoie un
      let form_data = new FormData();
      form_data.append("titre", journal.titre);
      form_data.append("date_publication", journal.date_apparution);
      if (journal.photo !== null)
        form_data.append("photo", journal.photo, journal.photo.name);
      if (journal.journal !== null)
        form_data.append("journal", journal.journal, journal.journal?.name);
      form_data.append("text", journal.text);
      let url = URL + "journaux/";

      axios
        .post(url, form_data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          setSuccess(true);
          handleShow();
          reinitialiserState();
          setIsSending(false);
        })
        .catch((err) => {
          setSuccess(false);
          handleShow();
          setIsSending(false);
        });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (estValide()) {
      setIsSending(true);
      // On utilise FormData pour envoyer un fichier vers l'api, car avec sendresquest cela ne fonctionne pas vu que ça envoie un
      let form_data = new FormData();
      form_data.append("titre", journal.titre);
      form_data.append("auteur", journal.auteur);
      form_data.append("date_publication", journal.date_apparution);
      if (imageUpdated) {
        form_data.append("photo", journal.photo, journal.photo?.name);
        setImageUpdated(false);
      }
      if (journalUpdated) {
        form_data.append("journal", journal.journal, journal.journal?.name);
        setJournalUpdated(false);
      }
      form_data.append("text", journal.text);
      let url = URL + "journaux/" + journalToUpdate.id + "/";

      axios
        .put(url, form_data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          setSuccess(true);
          handleShow();
          reinitialiserState();
          setIsSending(false);
        })
        .catch((err) => {
          setSuccess(false);
          handleShow();
          setIsSending(false);
        });
    }
  };

  const hiddenImageInput = useRef(null);
  const hiddenjournalInput = useRef(null);

  const handleImageClick = (event) => {
    hiddenImageInput.current.click();
  };

  const handlejournalClick = (event) => {
    hiddenjournalInput.current.click();
  };

  const handleImageChange = (event) => {
    const fileUploaded = event.target.files[0];
    setJournal({ ...journal, photo: fileUploaded });
    if (fileUploaded) {
      // alert("Vous avez inséré une image !");
      setImageUpdated(true);
    }
  };

  const handlejournalChange = (event) => {
    const fileUploaded = event.target.files[0];
    setJournal({ ...journal, journal: fileUploaded });
    if (fileUploaded) {
      // alert("Vous avez inséré un journal !");
      setJournalUpdated(true);
    }
  };

  return (
    <div className={classes.root}>
      <h2 className={classes.h2}>Editer un journal</h2>
      <div className={classes.flex}>
        <div className={classes.inputsContainer}>
          <TextField
            id="dashboard-outlined-basic"
            label="Titre"
            variant="outlined"
            value={journal.titre}
            onChange={(e) => setJournal({ ...journal, titre: e.target.value })}
            required
          />
          <div className="errors">{errors.titre}</div>
        </div>
        <div className={classes.inputsContainer}>
          <TextField
            id="dashboard-outlined-basic"
            label="Date d'apparution"
            type="datetime-local"
            defaultValue={
              journalToUpdate ? journalToUpdate.date_apparution : today_date
            }
            onChange={(e) =>
              setJournal({ ...journal, date_apparution: e.target.value })
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className="errors">{errors.data_apparution}</div>
        </div>
        <div className={classes.divTextOverflow}>
          <p style={{ width: "100%", textAlign: "center" }}>
            image d'illustration (*.png)
          </p>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={handleImageClick}
          >
            <span className={classes.blueIcon}>
              <i class="fa fa-file-image fa-3x" aria-hidden="true"></i>
            </span>
          </Button>
          <input
            type="file"
            ref={hiddenImageInput}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <p style={{ width: "100%", textAlign: "center" }}>
            {errors.photo}
            {imageUpdated && journal?.photo?.name}
            {imageNameToUpdate}
          </p>
        </div>

        <div className={classes.divTextOverflow}>
          <p style={{ width: "100%", textAlign: "center" }}>
            document complémentaire (*.pdf)
          </p>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={handlejournalClick}
          >
            <span className={classes.blueIcon}>
              <i class="fa fa-file-upload fa-3x" aria-hidden="true"></i>
            </span>
          </Button>
          <input
            type="file"
            ref={hiddenjournalInput}
            onChange={handlejournalChange}
            style={{ display: "none" }}
          />
          <p style={{ width: "100%", textAlign: "center" }}>
            {errors.document}
            {imageUpdated && journal?.document?.name}
            {documentNameToUpdate}
          </p>
        </div>
      </div>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={journalToUpdate ? journalToUpdate.text : ""}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          // console.log("Editor is ready to use!", editor);
          editor?.editing.view.change((writer) => {
            writer.setStyle(
              "padding",
              "1.5rem",
              editor.editing.view.document.getRoot()
            );
            writer.setStyle(
              "min-height",
              "50vh",
              editor.editing.view.document.getRoot()
            );
          });
        }}
        onChange={(event, editor) => {
          setJournal({
            ...journal,
            text: editor.getData(),
          });
        }}
      />
      <div className={classes.buttonContainer}>
        {!journalToUpdate ? (
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            {!isSending ? (
              "Publier"
            ) : (
              <>
                <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
              </>
            )}
          </Button>
        ) : (
          <Button color="primary" variant="contained" onClick={handleUpdate}>
            {!isSending ? (
              "Modifier"
            ) : (
              <>
                <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
              </>
            )}
          </Button>
        )}
      </div>
      <ModalBootsrap
        handleClose={handleClose}
        show={show}
        title={
          <>
            {success ? "Envoyé" : "Oups"}
            <i
              className={`${
                success ? " fas fa-thumbs-up" : " fas fa-thumbs-down"
              }`}
              style={{ color: "#4caf50", marginLeft: "1rem" }}
            ></i>
          </>
        }
      >
        {success
          ? "Enregistrement avec succès."
          : "Une erreur s'est produite, veuillez réessayer."}
      </ModalBootsrap>
    </div>
  );
}
