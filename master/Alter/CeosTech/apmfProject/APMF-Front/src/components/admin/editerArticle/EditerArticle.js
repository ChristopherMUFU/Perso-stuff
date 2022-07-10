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
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "1rem 0",
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "1rem 0",
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
    Width: "16rem",
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
      "underline",
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
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableProperties",
      "tableCellProperties",
    ],
  },
  placeholder: "Entrer votre texte ici...",
};

export default function EditerArticle() {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imageUpdated, setImageUpdated] = useState(false);
  const [documentUpdated, setDocumentUpdated] = useState(false);

  const [isSending, setIsSending] = useState(false);

  const classes = useStyles();
  const location = useLocation();
  const articleToUpdate = location.state?.articleToUpdate;

  const { imageNameToUpdate, documentNameToUpdate } =
    extractFilesNames(articleToUpdate);

  //pour la defaultValue de date d'apparution
  const today_date = `${new Date()
    .toISOString()
    .substr(0, 10)}T${new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  const initialArticle = articleToUpdate
    ? {
        titre: articleToUpdate.titre,
        auteur: articleToUpdate.auteur,
        data_apparution: articleToUpdate.data_apparution,
        description: articleToUpdate.description,
        photo: articleToUpdate.photo,
        document: articleToUpdate.document,
        text: articleToUpdate.text,
      }
    : {
        titre: "",
        auteur: "",
        date_apparution: today_date,
        description: "",
        photo: null,
        document: null,
        text: "",
      };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const estValide = (fieldValues = article) => {
    const validator = {};

    if ("titre" in fieldValues)
      validator.titre = article.titre ? null : "Le champ titre est obligatoire";

    if ("auteur" in fieldValues)
      validator.auteur = article.auteur
        ? null
        : "Le champ auteur est obligatoire";

    if ("description" in fieldValues)
      validator.description = article.description
        ? null
        : "Le champ description est obligatoire";

    // if ("date_apparution" in fieldValues)
    //   validator.date_apparution = article.date_apparution
    //     ? null
    //     : "Le champ date apparution est obligatoire";

    // if ("photo" in fieldValues)
    //   validator.photo = article.photo ? null : "Le champ photo est obligatoire";

    // if ("document" in fieldValues)
    //   validator.document = article.document ? null : "Le champ document est obligatoire";

    if ("text" in fieldValues)
      validator.text = article.text ? null : "Le champ text est obligatoire";

    setErrors({ ...validator });

    // retourne boolean si et seulement si on passe un parametre pour la fonction
    if (fieldValues === article) {
      return Object.values(validator).every((el) => !el);
    }
  };

  const {
    state: article,
    setState: setArticle,
    errors,
    setErrors,
    reinitialiserState,
  } = useForm(initialArticle, estValide);

  const handleSubmit = (e) => {
    estValide();
    e.preventDefault();
    if (estValide()) {
      setIsSending(true);
      // On utilise FormData pour envoyer un fichier vers l'api, car avec sendresquest cela ne fonctionne pas vu que ça envoie un
      let form_data = new FormData();
      form_data.append("titre", article.titre);
      form_data.append("auteur", article.auteur);
      form_data.append("date_publication", article.date_apparution);
      form_data.append("description", article.description);
      if (article.photo !== null)
        form_data.append("photo", article.photo, article.photo.name);
      if (article.document !== null)
        form_data.append("document", article.document, article.document.name);
      form_data.append("text", article.text);
      let url = URL + "articles/";

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
      form_data.append("titre", article.titre);
      form_data.append("auteur", article.auteur);
      form_data.append("date_publication", article.date_apparution);
      form_data.append("description", article.description);
      if (imageUpdated) {
        form_data.append("photo", article.photo, article.photo.name);
        setImageUpdated(false);
      }
      if (documentUpdated) {
        form_data.append("document", article.document, article.document.name);
        setDocumentUpdated(false);
      }
      form_data.append("text", article.text);
      let url = URL + "articles/" + articleToUpdate.id + "/";

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
  const hiddenDocumentInput = useRef(null);

  const handleImageClick = (event) => {
    hiddenImageInput.current.click();
  };

  const handleDocumentClick = (event) => {
    hiddenDocumentInput.current.click();
  };

  const handleImageChange = (event) => {
    const fileUploaded = event.target.files[0];
    setArticle({ ...article, photo: fileUploaded });
    if (fileUploaded) {
      // alert("Vous avez inséré une image !");
      setImageUpdated(true);
    }
  };

  const handleDocumentChange = (event) => {
    const fileUploaded = event.target.files[0];
    setArticle({ ...article, document: fileUploaded });
    if (fileUploaded) {
      // alert("Vous avez inséré un document !");
      setDocumentUpdated(true);
    }
  };

  return (
    <div className={classes.root}>
      <h2 className={classes.h2}>Editer un article</h2>
      <div className={classes.flex}>
        <div className={classes.inputsContainer}>
          <TextField
            id="dashboard-outlined-basic"
            label="Titre"
            variant="outlined"
            value={article.titre}
            onChange={(e) => setArticle({ ...article, titre: e.target.value })}
            required
          />
          <div className="errors">{errors.titre}</div>
        </div>
        <div className={classes.inputsContainer}>
          <TextField
            id="dashboard-outlined-basic"
            label="Auteur"
            variant="outlined"
            value={article.auteur}
            onChange={(e) => setArticle({ ...article, auteur: e.target.value })}
            required
          />
          <div className="errors">{errors.auteur}</div>
        </div>
        <div className={classes.inputsContainer}>
          <TextField
            id="dashboard-outlined-basic"
            label="Date d'apparution"
            type="datetime-local"
            defaultValue={
              articleToUpdate ? articleToUpdate.date_apparution : today_date
            }
            onChange={(e) =>
              setArticle({ ...article, date_apparution: e.target.value })
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className="errors">{errors.data_apparution}</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
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
              <i className="fa fa-file-image fa-3x" aria-hidden="true"></i>
            </span>
          </Button>

          <input
            type="file"
            ref={hiddenImageInput}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <p
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {errors.photo}
            {imageUpdated && article?.photo?.name}
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
            onClick={handleDocumentClick}
          >
            <span className={classes.blueIcon}>
              <i className="fa fa-file-upload fa-3x" aria-hidden="true"></i>
            </span>
          </Button>
          <input
            type="file"
            ref={hiddenDocumentInput}
            onChange={handleDocumentChange}
            style={{ display: "none" }}
          />
          <p style={{ width: "100%", textAlign: "center" }}>
            {errors.document}
            {imageUpdated && article?.document?.name}
            {documentNameToUpdate}
          </p>
        </div>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", margin: "2rem 0" }}
      >
        <TextField
          multiline
          rows={2}
          label="Description"
          variant="outlined"
          value={article.description}
          onChange={(e) =>
            setArticle({ ...article, description: e.target.value })
          }
          required
        />
        <div className="errors">{errors.description}</div>
      </div>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={articleToUpdate ? articleToUpdate.text : ""}
        onReady={(editor) => {
          editor?.editing.view.change((writer) => {
            writer.setStyle(
              "padding",
              "1.5rem",
              editor.editing.view.document.getRoot()
            );
            writer.setStyle(
              "min-height",
              "22vh",
              editor.editing.view.document.getRoot()
            );
          });
        }}
        onChange={(event, editor) => {
          setArticle({
            ...article,
            text: editor.getData(),
          });
        }}
      />
      <div className={classes.buttonContainer}>
        {!articleToUpdate ? (
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
