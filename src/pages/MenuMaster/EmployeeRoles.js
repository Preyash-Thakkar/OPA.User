import React, { useState,useEffect,useContext } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import logo from "../../assets/images/brands/slack.png";
import DeleteModal from "../../common/DeleteModal";
import { ToastContainer } from "react-toastify";
import SearchComponent from "../../common/SearchComponent";
import axios from "axios";
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
const EmployeeRoles = () => {
  const navigate=useNavigate();      
  const { GetallEmployeeRole, DeleteEmployeeRole} = useContext(SignContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedForUpdate, setselectedForUpdate] = useState(null);
  const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  const [originalEmployeeRole, setOriginalEmployeeRole] = useState(null);
  const [employeerole,setemployeerole]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const id=localStorage.getItem("DepartmentTypeID");
  console.log("DeartmentType",id);
 
  // const getemployerole=async()=>{
  //    const res=await GetallEmployeeRole(); 
  //    console.log(res); 
  //    setOriginalEmployeeRole(res.data)
  //    setemployeerole(res.data);    
  // }
  const getemployerole=async()=>{
    const res=await axios.get(`${process.env.REACT_APP_BASE_URL}/employeerole/getEmployeeRolesByDType/${id}`)
    console.log("This is it",res); 
    setemployeerole(res.data);    
    console.log("Hiii",res.data);
    setOriginalEmployeeRole(res.data);
 }
  // const handleDelete=async(id)=>{
  //       console.log(">>id",id);
      
  //     const abc=window.confirm("Are you sure you want to delete");
  //     if(abc){
  //     const res= await DeleteEmployeeRole(id);
  //     getemployerole()
  //     console.log(res);
  //     }
  // }
  const handleDelete = (previewImage) => {
    setselectedForUpdate(previewImage);
    setDeleteModal(true);
  };

  const handleDeleteEmployeeRole = async () => {
    if (selectedForUpdate) {
      setIsDeletebuttonLoading(true);

      try {
        await DeleteEmployeeRole(selectedForUpdate);
        getemployerole();
      } catch (error) {
        // Handle error if needed
        console.error("Error deleting department group:", error);
      } finally {
        setIsDeletebuttonLoading(false);
        setDeleteModal(false);
      }
    }
  };
  
  const handleEdit=async(id)=>{
         console.log(id);
         navigate( `/edit-employeerole/${id}`)
  }
  
  useEffect(()=>{
       getemployerole()
  },[])
  const searchList = (e) => {
    let inputVal = e.toLowerCase();
    console.log("Input Value:", inputVal); // Log input value for debugging
    let filterData = [];
    
    if (originalEmployeeRole) {
      filterData = originalEmployeeRole.filter((el) => {
        const lowerCaseName = el.name && el.name.toLowerCase();
        console.log("Lowercase Name:", lowerCaseName); // Log lowercase name for debugging
        return (lowerCaseName && lowerCaseName.indexOf(inputVal) !== -1) ||
               (el.isActive && el.isActive.toString().toLowerCase().indexOf(inputVal) !== -1);
      });
    }
    
    console.log("Filtered Data:", filterData); // Log filtered data for debugging
    setemployeerole(filterData);

  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employeerole.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
    <ToastContainer closeButton={false} />
    <DeleteModal
      show={deleteModal}
      isLoading={isDeletebuttonLoading}
      onDeleteClick={() => handleDeleteEmployeeRole()}
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
                  <PreviewCardHeader title="Employee Role " />
                  <div className="mt-3 mb-2">
                    {/* <Link to="/add-employeerole">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        style={{ marginRight: "9px" }}
                      >
                        Add Employee Role
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
                                  <td>{type.departmentGroup.name}</td>
                                  <td>{type.departmentType.name}</td>
                                  <td>{type.EmployeeRole}</td>
                                  
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
                        {employeerole.length > itemsPerPage && (
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
                            {Array.from({ length: Math.ceil(employeerole.length / itemsPerPage) }, (_, i) => {
                              if (i < 5) {
                                return (
                                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                                  </li>
                                );
                              }
                            })}
                            <li className={`page-item ${currentPage === Math.ceil(employeerole.length / itemsPerPage) ? 'disabled' : ''}`}>
                              <button
                                className="page-link"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === Math.ceil(employeerole.length / itemsPerPage)}
                              >
                                Next
                              </button>
                            </li>
                          </>
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

export default EmployeeRoles;
