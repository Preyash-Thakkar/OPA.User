import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, Spinner } from "reactstrap";

const DeleteModal = ({ show, onDeleteClick, onCloseClick, isLoading }) => {
  return (
    <Modal fade={true} isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <div className="mt-2 text-center">
          <lord-icon
            src="https://cdn.lordicon.com/gsqxdxog.json"
            trigger="loop"
            colors="primary:#f7b84b,secondary:#f06548"
            style={{ width: "100px", height: "100px" }}
          ></lord-icon>
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h4>Are you sure ?</h4>
            <p className="text-muted mx-4 mb-0">
              Are you sure you want to remove this record ?
            </p>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          

          {!isLoading ? (
            <button
              type="button"
              className="btn w-sm btn-danger "
              id="delete-record"
              onClick={onDeleteClick}
            >
              Yes, Delete It!
            </button>
          ) : (
            <Button color="danger" className="btn-load" outline disabled>
              <span className="d-flex align-items-center">
                <Spinner size="sm" className="flex-shrink-0">
                  {" "}
                  In process...{" "}
                </Spinner>
                <span className="flex-grow-1 ms-2">In process...</span>
              </span>
            </Button>
          )}
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            Close
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

DeleteModal.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any,
};

export default DeleteModal;