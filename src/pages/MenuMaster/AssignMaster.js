import React, { useContext, useState, useEffect } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/images/brands/slack.png";
import Example from "./FormOne";
import SignContext from "../../contextAPI/Context/SignContext";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../common/DeleteModal";
import { ToastContainer } from "react-toastify";
import SearchComponent from "../../common/SearchComponent";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Label,
  Table,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
const AssignMaster = () => {
  const navigate=useNavigate();
  
  const id=localStorage.getItem("DepartmentTypeID");
  console.log(id)
  const { GetallAssignTask,DeleteAssignTask } = useContext(SignContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedForUpdate, setselectedForUpdate] = useState(null);
  const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  const [originalAssignTask, setOriginalAssignTask] = useState(null);
  const [task,settask]=useState(null);
  const [paginatetask, setpaginateTask] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const getalltask = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/assigntask/getassigntaskbyDeptid/${id}`)
    console.log("kjgkjk5ky",res);
    settask(res.data);
    setOriginalAssignTask(res.data);
    setpaginateTask(res.data);
};

  useEffect(() => {
    getalltask();
  }, []);
  useEffect(() => {
    console.log(">>>>>",task)
  }, [task]);
  const handleDelete = (previewImage) => {
    setselectedForUpdate(previewImage);
    setDeleteModal(true);
  };

  const handleDeleteAssignTask = async () => {
    if (selectedForUpdate) {
      setIsDeletebuttonLoading(true);

      try {
        await DeleteAssignTask(selectedForUpdate);
        getalltask();
      } catch (error) {
        // Handle error if needed
        console.error("Error deleting department group:", error);
      } finally {
        setIsDeletebuttonLoading(false);
        setDeleteModal(false);
      }
    }
  };
  const handleEdit = async (id) => {
    console.log(">>>vaishalllllllllllllllllllll", id);
    navigate(`/edit-assigntask/${id}`);
  };
  // const searchList = (e) => {
  //   let inputVal = e.toLowerCase();
  //   let filterData = originalAssignTask.filter(
  //     (el) =>
  //       el.documentname.toLowerCase().indexOf(inputVal) !== -1 ||
  //       el.documentdepartmenttype.name.toLowerCase().indexOf(inputVal) !==
  //         -1 ||
  //       el.tasktypes.taskName.toLowerCase().indexOf(inputVal) !== -1 ||
  //       el.documenttype.toLowerCase().indexOf(inputVal) !== -1 ||
  //       el.isActive.toString().toLowerCase().indexOf(inputVal) !== -1
  //   );
  //   settask(filterData);
  // };
  const handleViewDocument = (item) => {
    setSelectedItem(item);
    console.log("selected ",item )
  };

  const handleExampleClose = () => {
    setSelectedItem(null);
  };
  const searchList = (e) => {
    let inputVal = e.toLowerCase();
    let filterData = originalAssignTask.filter(
      (el) =>
        el.documentname.toLowerCase().indexOf(inputVal) !== -1 ||
        el.documentdepartmenttype.name.toLowerCase().indexOf(inputVal) !==
          -1 ||
        el.tasktypes.taskName.toLowerCase().indexOf(inputVal) !== -1 ||
        el.documenttype.toLowerCase().indexOf(inputVal) !== -1 ||
        el.isActive.toString().toLowerCase().indexOf(inputVal) !== -1
    );
    settask(filterData);
    console.log(filterData)
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = task && task.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <><ToastContainer closeButton={false} />
    <DeleteModal
      show={deleteModal}
      isLoading={isDeletebuttonLoading}
      onDeleteClick={() => handleDeleteAssignTask()}
      onCloseClick={() => setDeleteModal(false)}
    />
      <UiContent />
      <div className="page-content">
        <Container fluid={true}>
          <BreadCrumb title="Form Validation" pageTitle="Forms" />
      {/* 9.20 to 14:30  */}
          <Row>
            <Col xl={12}>
              <Card>
                {/* <div className="d-flex">
                  <PreviewCardHeader title="User Detail" />
                  <button className="btn btn-primary float-end mt-3 mb-2 " type="submit" style={{marginLeft:'880px'}} >Add Admin User</button>
                </div> */}

                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <PreviewCardHeader title="Assign Task Detail" />
                  <div className="mt-3 mb-2">
                    <Link to="/assign-task">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        style={{ marginRight: "9px" }}
                      >
                        Add Assign Task
                      </button>
                    </Link>
                  </div>
                </div>
                <CardBody>
                  <div className="live-preview">
                  <SearchComponent searchList={searchList} />
                    <div className="table-responsive">
                      <Table className="align-middle table-nowrap mb-0">
                        <thead className="table-light">
                          <tr>
                            {/* <th scope="col" style={{ "width": "42px" }}>
                                                            <div className="form-check">
                                                                <Input className="form-check-input" type="checkbox" defaultValue="" id="responsivetableCheck" />
                                                                <Label className="form-check-label" for="responsivetableCheck"></Label>
                                                            </div>
                                                        </th> */}
                            <th scope="col">
                              <br />
                              ID
                            </th>
                            <th scope="col">
                              Document
                              <br></br> Name
                            </th>
                            <th scope="col">
                              Document
                              <br></br> Department
                              <br />
                              Type
                            </th>
                            <th scope="col">Task Type</th>
                            <th scope="col">Document Type</th>
                            <th scope="col">Access Location</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems &&
                            currentItems.length > 0 &&
                            currentItems.map((type, index) => {
                              return (
                                <tr key={type._id}>
                                  <td>{index+1}</td>
                                  <td>{type.documentname}</td>
                                  
                                  <td>{type.documentdepartmenttype.name}</td>
                                  <td>{type.tasktypes.taskName}</td>
                                  <td> {type.documenttype === ""
                                      ? "FormLink"
                                      : type.documenttype}</td>
                                  <td> {!type.departmentGroup.length
                                      ? "No"
                                      : "Yes"}</td>

                                  <td>
                                    {type.isActive ? (
                                      <span className="badge bg-success">
                                        Active
                                      </span>
                                    ) : (
                                      <span className="badge bg-danger">
                                        InActive
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    <div className="d-flex gap-2 align-items-center">
                                      <div className="flex-shrink-0">
                                        <button
                                          type="button"
                                          className="btn btn-success btn-icon waves-effect waves-light"
                                          onClick={() => handleEdit(type._id)}
                                        >
                                          <i className="ri-pencil-fill"></i>
                                        </button>
                                      </div>
                                      <div className="flex-grow-1">
                                        <button
                                          type="button"
                                          className="btn btn-danger btn-icon waves-effect waves-light"
                                          onClick={() => handleDelete(type._id)}
                                        >
                                          <i className="ri-delete-bin-5-line"></i>
                                        </button>
                                      </div>
                                      
                                      <div className="flex-grow-1">
                                        <button
                                          type="button"
                                          className="btn btn-primary btn-icon waves-effect waves-light"
                                          onClick={() => handleViewDocument(type)}
                                        >
                                          {/* <i className="ri-eye-line"></i> */}
                                          <Example
                                        selectedItem={selectedItem}
                                        handleClose={handleExampleClose}
                                      />
                                        </button>
                                      </div>
                                      
                                    </div>

                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <nav>
            <ul className="pagination">
              {task && task.length > itemsPerPage && (
                <>
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: Math.ceil(task.length / itemsPerPage) }, (_, i) => i + 1).map(pageNumber => (
                    <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                      <button onClick={() => paginate(pageNumber)} className="page-link">
                        {pageNumber}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === Math.ceil(task.length / itemsPerPage) ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === Math.ceil(task.length / itemsPerPage)}
                    >
                      Next
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </Container>
      </div>
    </>
  );
};

export default AssignMaster;
