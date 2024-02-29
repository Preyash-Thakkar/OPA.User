import React ,{useState,useContext,useEffect}from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import logo from "../../assets/images/brands/slack.png";
import axios from "axios";
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
import SignContext from "../../contextAPI/Context/SignContext";

import { useNavigate } from "react-router-dom";
const id = localStorage.getItem("DepartmentTypeID");



const AddTaskMaster = () => {

  const navigate=useNavigate();
  const { GetallAddTask,DeleteAddTask } = useContext(SignContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedForUpdate, setselectedForUpdate] = useState(null);
  const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  const [originalAddtask, setOriginalAddTask] = useState(null);
  const [task, setTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  
  
  const gettask = async () => {
    // window.location.reload();
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/addtask/getallspecifictaskbydtype/${id}`);


    setTask(response.data);
    setOriginalAddTask(response.data);
  };
//   const handleDelete=async (abc)=>{
//     const abc1= window.confirm("Are you sure you want to delete?");
//     if(abc1){  
//     const res=await DeleteAddTask(abc);
//     gettask();
//     }
//  }
 const handleDelete = (previewImage) => {
  setselectedForUpdate(previewImage);
  setDeleteModal(true);
};

const handleDeleteAddTask = async () => {
  if (selectedForUpdate) {
    setIsDeletebuttonLoading(true);

    try {
      await DeleteAddTask(selectedForUpdate);
      gettask();
    } catch (error) {
      // Handle error if needed
      // console.error("Error deleting department group:", error);
    } finally {
      setIsDeletebuttonLoading(false);
      setDeleteModal(false);
    }
  }
};

 const handleEdit=async(id)=>{

  navigate(`/edit-task/${id}`)
}
  useEffect(() => {
    gettask();
  }, []);
  const searchList = (e) => {
    let inputVal = e.toLowerCase();
    let filterData = originalAddtask.filter(
      (el) =>
        el.departmentType.name.toLowerCase().indexOf(inputVal) !== -1 ||
        el.taskName.toLowerCase().indexOf(inputVal) !== -1 ||
        el.taskType.toLowerCase().indexOf(inputVal) !== -1 ||
        el.accessLocation.toLowerCase().indexOf(inputVal) !== -1 ||
        el.isActive.toString().toLowerCase().indexOf(inputVal) !== -1
    );
    setTask(filterData);

  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = task && task.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <ToastContainer closeButton={false} />
      <DeleteModal
        show={deleteModal}
        isLoading={isDeletebuttonLoading}
        onDeleteClick={() => handleDeleteAddTask()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <UiContent />
      <div className="page-content">
        <Container fluid={true}>
          <BreadCrumb title="Form Validation" pageTitle="Forms" />

          <Row>
          <Col xl={12}>
              <Card>
                {/* <div className="d-flex">
                  <PreviewCardHeader title="User Detail" />
                  <button className="btn btn-primary float-end mt-3 mb-2 " type="submit" style={{marginLeft:'880px'}} >Add Admin User</button>
                </div> */}

                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <PreviewCardHeader title="Add Task" />
                  <div className="mt-3 mb-2">
                    <Link to='/add-task'><button className="btn btn-primary" type="submit" style={{marginRight:'9px'}}>
                      Add Task
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

                            <th scope="col">Department Types Name</th>
                            <th scope="col">Task Name </th>
                            <th scope="col">Task Types </th>
                            <th scope="col">Access Location</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems &&
                            currentItems.length > 0 &&
                            currentItems.map((type, index) => {
                              {/* window.location.reload();    */}
                              return (
                                <tr key={type._id}>
                                  <td>{index+1}</td>
                                  <td>{type.departmentType.name}</td>
                                  <td>{type.taskName}</td>
                                  <td>{type.taskType}</td>
                                  <td>{type.accessLocation}</td>
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

export default AddTaskMaster;