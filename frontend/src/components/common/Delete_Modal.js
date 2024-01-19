
import React from 'react'
import { Modal, Button } from "react-bootstrap";

 
const DeleteConfirmation = ({onHide, show , method , message}) => {
   
    return (
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">{message}</div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="danger" onClick={method} >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    
    )
}
 
export default DeleteConfirmation;