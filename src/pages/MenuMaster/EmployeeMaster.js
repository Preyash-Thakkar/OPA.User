import React,{useState,useEffect,useContext} from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteModal from "../../common/DeleteModal";
import { ToastContainer } from "react-toastify";
import SearchComponent from "../../common/SearchComponent";

import logo from "../../assets/images/brands/slack.png";
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
import { SignState } from "../../contextAPI/State/SignState";
import SignContext from "../../contextAPI/Context/SignContext";
import { useNavigate } from "react-router-dom";

const EmployeeMaster = () => {
  const navigate=useNavigate();
  const {GetallEmployeeName,DeleteEmployeeName}=useContext(SignContext)
  const [employeename,setemployeename]=useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedForUpdate, setselectedForUpdate] = useState(null);
  const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  const [originalEmployeeMaster, setOriginalEmployeeMaster] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
 const id=localStorage.getItem("DepartmentTypeID");
 console.log(id);
  const getemployeename=async()=>{
     const res=await axios.get(`${process.env.REACT_APP_BASE_URL}/employeename/getemployeebyrole/${id}`)
     console.log("This is it",res); 
     setemployeename(res.data);    
     console.log("Hiii",res.data);
     setOriginalEmployeeMaster(res.data);
  }
  // const handleDelete=async(id)=>{
  //  const confirm=window.confirm("Are U sure You want to delete this page");
  //  if(confirm){
  //   const res=await DeleteEmployeeName(id);
  //   getemployeename();
  //  }
  //  console.log(id);
  // }
  const handleDelete = (previewImage) => {
    setselectedForUpdate(previewImage);
    setDeleteModal(true);
  };
  const handleDeleteEmployee = async () => {
    if (selectedForUpdate) {
      setIsDeletebuttonLoading(true);
  
      try {
        await DeleteEmployeeName(selectedForUpdate);
        getemployeename();
      } catch (error) {
        // Handle error if needed
        console.error("Error deleting employee:", error);
      } finally {
        setIsDeletebuttonLoading(false);
        setDeleteModal(false);
      }
    }
  };

  const handleEdit=async(id)=>{
    console.log(">>>id",id)
    navigate(`/edit-employeename/${id}`)
  }

  
  useEffect(()=>{
    getemployeename()
},[])
const searchList = (e) => {
  let inputVal = e.toLowerCase();
  let filterData = originalEmployeeMaster.filter(
    (el) =>
      el.name.toLowerCase().indexOf(inputVal) !== -1 ||
      el.isActive.toString().toLowerCase().indexOf(inputVal) !== -1
  );
  setemployeename(filterData);
};
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = employeename.slice(indexOfFirstItem, indexOfLastItem);

const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <><ToastContainer closeButton={false} />
    <DeleteModal
      show={deleteModal}
      isLoading={isDeletebuttonLoading}
      onDeleteClick={() => handleDeleteEmployee()}
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
                  <PreviewCardHeader title="Employee Master" />
                  <div className="mt-3 mb-2">
                    {/* <Link to="/add-employee">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        style={{ marginRight: "9px" }}
                      >
                        Add Employee
                      </button>
                    </Link> */}
                  </div>
                </div>
                <CardBody>
                  <div className="live-preview">
                  <SearchComponent searchList={searchList}  />
                    <div className="table-responsive">
                      <Table className="align-middle table-nowrap mb-0">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Employee Name</th>
                            <th scope="col">Location</th>
                            <th scope="col">Department Group Name</th>
                            <th scope="col">Department Type Name</th>
                            <th scope="col">Employee Role</th>
                           
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            currentItems.map((type, index) => {
                              return (
                                <tr key={type._id}>
                                  <td>{index+1}</td>
                                  <td>{type.name}</td>
                                  <td>{type.location.name}</td>
                                  <td>{type.departmentGroup.name}</td>
                                  <td>{type.departmentType.name}</td>
                                  <td>{type.employeeRole.EmployeeRole}</td>
                                  
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
                                          // onClick={()=>handleEdit(type._id)}
                                        >
                                          <i className="ri-pencil-fill"></i>
                                        </button>
                                      </div>
                                      <div className="flex-grow-1">
                                        <button
                                          type="button"
                                          className="btn btn-danger btn-icon waves-effect waves-light"
                                          // onClick={() => handleDelete(type._id)}
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
                    <nav>
                      <ul className="pagination">
                        {Array.from(
                          { length: Math.ceil(employeename.length / itemsPerPage) },
                          (_, i) => (
                            <li
                              key={i}
                              className={`page-item ${
                                currentPage === i + 1 ? "active" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => paginate(i + 1)}
                              >
                                {i + 1}
                              </button>
                            </li>
                          )
                        )}
                      </ul>
                    </nav>
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

export default EmployeeMaster;

