import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Col, Row, Table } from "reactstrap";

function Example({ selectedItem, handleClose }) {
  const [eyeshow, setEyeshow] = useState(null);

  return (
    <React.Fragment>
      <div className="flex-grow-1 mt-3 " style={{ marginLeft: "0px" }}>
        <button
          type="button"
          className="btn btn-primary btn-icon waves-effect waves-light"
          onClick={() => setEyeshow(true)}
        >
          <i className="ri-eye-line"></i>
        </button>
      </div>

      <Modal
        size="xl"
        show={eyeshow}
        onHide={() => setEyeshow(false)}
        animation={false}
      >
        <Modal.Header closeButton>
          <h5>Task Detail of HR Policy</h5>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={6} md={12}>
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
                              <a
                                href={`${process.env.REACT_APP_BASE_URL}/${selectedItem.uploaddocument}`}
                              >
                                View Document
                              </a>
                            ) : (
                              "N/A"
                            )}
                          </td>
                        </td>
                      </tr>
                      <tr>
                        <td>Document Link</td>
                        <td>{selectedItem ? selectedItem.formlink : "N/A"}</td>
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
            <Col lg={6} md={12}>
              <div className="live-preview">
                <div className="table-responsive">
                  {/* <Table className="align-middle table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col" colSpan={2} style={{ textAlign: "center" }}>
                          Task Access
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Location</td>
                        <td>{selectedItem ? selectedItem.locationSchema : "N/A"}</td>
                      </tr>
                      <tr>
                        <td>
                          Department
                          <br></br>Group
                        </td>
                        <td>{selectedItem ? selectedItem.departmentgroup : "N/A"}</td>
                      </tr>
                      <tr>
                        <td>Employee Roles</td>
                        <td>{selectedItem ? selectedItem.employeeroles : "N/A"}</td>
                      </tr>
                      <tr>
                        <td>
                          Employee
                          <br></br> Access
                        </td>
                        <td>{selectedItem ? selectedItem.employeeaccess : "N/A"}</td>
                      </tr>
                      <tr>
                        <td>
                          Employee
                          <br></br>Roles
                        </td>
                        <td>N/A</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>{selectedItem && selectedItem.isActive ? "Active" : "Inactive"}</td>
                      </tr>
                    </tbody>
                  </Table> */}
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default Example;