import React, { useContext, useState, useEffect } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import axios from "axios";
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
  Col,
  Label,
  Table,
  Container,
  Row,
} from "reactstrap";

const AssignMaster = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("DepartmentTypeID");
  const { GetallAssignTask, DeleteAssignTask } = useContext(SignContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedForUpdate, setselectedForUpdate] = useState(null);
  const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  const [originalAssignTask, setOriginalAssignTask] = useState(null);
  const [task, setTask] = useState(null);

  const getalltask = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/assigntask/getassigntaskbyDeptid/${id}`
      );
      console.log("kjgkjk5ky", res);
      setTask(res.data);
      setOriginalAssignTask(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getalltask();
  }, []);

  useEffect(() => {
    console.log(">>>>>", task);
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
    setTask(filterData);
  };

  return (
    <>
      <ToastContainer closeButton={false} />
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
          <Row>
            <Col xl={12}>
              <Card>
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
                            <th scope="col">ID</th>
                            <th scope="col">Document Name</th>
                            <th scope="col">Document Department Type</th>
                            <th scope="col">Task Type</th>
                            <th scope="col">Document Type</th>
                            <th scope="col">Access Location</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {task &&
                            task.length > 0 &&
                            task.map((type, index) => {
                              return (
                                <tr key={type._id}>
                                  <td>{index + 1}</td>
                                  <td>{type.documentname}</td>
                                  <td>{type.documentdepartmenttype.name}</td>
                                  <td>{type.tasktypes.taskName}</td>
                                  <td>
                                    {type.documenttype === ""
                                      ? "FormLink"
                                      : type.documenttype}
                                  </td>
                                  <td>
                                    {type.departmentGroup === null
                                      ? "No"
                                      : "Yes"}
                                  </td>
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
                                          className="btn btn-danger btn-icon waves-effect waves-light"
                                          onClick={() => handleEdit(type._id)}
                                        >
                                          <i className="ri-pencil-fill"></i>
                                        </button>
                                      </div>
                                      <div className="flex-grow-1">
                                        <button
                                          type="button"
                                          className="btn btn-success btn-icon waves-effect waves-light"
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
        </Container>
      </div>
    </>
  );
};

export default AssignMaster;
