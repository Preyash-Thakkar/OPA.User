import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Col, Row, Table } from "reactstrap";
import { Link } from 'react-router-dom';
function Example({ selectedItem, handleClose }) {
  const [eyeshow, setEyeshow] = useState(null);

  return (
    <React.Fragment>
      <div className="flex-grow-1 mt-3 " >
        <button
          type="button"
          className="btn btn-primary btn-icon waves-effect waves-light"
          onClick={() => setEyeshow(true)}
        >
          <i className="ri-eye-line" style={{ marginTop: "-11px" }}></i>
        </button>
      </div>

      <Modal
        size="l"
        show={eyeshow}
        onHide={() => setEyeshow(false)}
        animation={false}
      >
        <Modal.Header closeButton>
          <h4>Task Detail of HR Policy</h4>
        </Modal.Header>
        <Modal.Body>
          
            <Col lg={12} md={6}>
              <div className="live-preview">
                <div className="table-responsive">
                  <Table className="align-middle table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th
                          scope="col"
                          colSpan={2}
                          style={{ textAlign: "center" }}
                        >
                          Task Detail
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Assigned By</td>
                        <td>
                          {selectedItem ? selectedItem.assignedby : "Admin"}
                        </td>
                      </tr>
                      <tr>
                        <td>Task Name</td>
                        <td>
                          {selectedItem ? selectedItem.documentname : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Document Department Type
                          <br></br>Type
                        </td>
                        <td>
                          {selectedItem
                            ? selectedItem.documentdepartmenttype.name
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td>Document File</td>
                        <td>
                          <td>
                            {selectedItem ? (
  selectedItem.uploaddocument ? (
    <a
      href={`${process.env.REACT_APP_BASE_URL}/${selectedItem.uploaddocument}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      View Document
    </a>
  ) : (
    "N/A"
  )
) : (
  "N/A"
)}

                          </td>
                        </td>
                      </tr>
                      <tr>
                        <td>Form Link</td>
                        <td>
  <a href={selectedItem ? `https://www.${selectedItem.formlink}` : "http://www.google.com"} target="_blank">
    {selectedItem ? selectedItem.formlink : "N/A"}
  </a>
</td>

                      </tr>
                      <tr>
                        <td>Document Link</td>
                        <td>
  <a href={selectedItem ? `https://www.${selectedItem.documentlink}.com` : "http://www.google.com"} target="_blank">
    {selectedItem ? selectedItem.documentlink : "N/A"}
  </a>
</td>

                      </tr>
                      <tr>
                        <td>
                          Text
                          <br></br>Description
                        </td>
                        <td>
                          {selectedItem
                            ? selectedItem.documentdescription
                            : "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
           
        
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default Example;
