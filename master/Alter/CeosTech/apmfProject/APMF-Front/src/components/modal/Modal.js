import { Modal } from "react-bootstrap";
import "./styles.css";

function ModalBootsrap({ children, show, handleClose, title, img  }) {
  return (
    <Modal
      show={show} 
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
          <img
                src={img}
                alt=''
                style={{ maxWidth: "80%", objectFit: "contain" }}
            />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
}


export default ModalBootsrap;
