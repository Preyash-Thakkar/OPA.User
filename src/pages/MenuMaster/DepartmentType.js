import React,{useState,useEffect,useContext} from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import logo from "../../assets/images/brands/slack.png";
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
import SignContext from "../../contextAPI/Context/SignContext";

const DepartmentType = () => {
  const navigate=useNavigate();
  const [deptype,setdeptype]=useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedForUpdate, setselectedForUpdate] = useState(null);
  const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  const [originalDepType, setOriginalDepType] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const {GetallDepartmentType,deletetype,GetDepTypeByIdForEditing} = useContext(SignContext);
  const id=localStorage.getItem("DepartmentTypeID")
  const getalldeptype = async () => {
    const response = await GetDepTypeByIdForEditing(id);
    console.log(">>>");
    console.log(response.data);
    setOriginalDepType(response.data)
    setdeptype(response.data);
  };


  const handleDelete = (previewImage) => {
    setselectedForUpdate(previewImage);
    setDeleteModal(true);
  };

  const handleDeleteDepartmentType = async () => {
    if (selectedForUpdate) {
      setIsDeletebuttonLoading(true);

      try {
        await deletetype(selectedForUpdate);
        getalldeptype();
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
    console.log(">>>id",id)
    navigate(`/edit-deptype/${id}`)
  }

  useEffect(() => {
    getalldeptype();
  }, []);
  // const searchList = (e) => {
  //   let inputVal = e.toLowerCase();
  //   let filterData = originalDepType.filter(
  //     (el) =>
  //       el.name.toLowerCase().indexOf(inputVal) !== -1 ||
  //       el.isActive.toString().toLowerCase().indexOf(inputVal) !== -1
  //   );
  //   setdeptype(filterData);
  //   console.log(filterData)
  // };
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = deptype.slice(indexOfFirstItem, indexOfLastItem);

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <><ToastContainer closeButton={false} />
    <DeleteModal
      show={deleteModal}
      isLoading={isDeletebuttonLoading}
      onDeleteClick={() => handleDeleteDepartmentType()}
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
                  <PreviewCardHeader title="Department Type" />
                  <div className="mt-3 mb-2">
                    {/* <Link to='/add-dtype'><button className="btn btn-primary" type="submit" style={{marginRight:'9px'}}>
                      Add Department Type
                    </button>
                    </Link> */}
                  </div>
                </div>
                <CardBody>
                  <div className="live-preview">
                  {/* <SearchComponent searchList={searchList}  /> */}
                    <div className="table-responsive">
                      <Table className="align-middle table-nowrap mb-0">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">ID</th>

                            <th scope="col">Department Type Name</th>
                            {/* <th scope="col">Department Type Name</th> */}
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                          
                                <tr>
                                  <td>DT:{1}</td>
                                  {/* <td>{type.departmentGroup.name}</td> */}
                                  <td>{deptype.name}</td>
                                  
                                  <td>
                                    {deptype.isActive ? (
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
                          }   
                            
                        </tbody>
                      </Table>
                    </div>
                    <nav>
                      {/* <ul className="pagination">
                        {deptype.length > itemsPerPage && (
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
                            {Array.from({ length: Math.ceil(deptype.length / itemsPerPage) }, (_, i) => {
                              if (i < 5) {
                                return (
                                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                                  </li>
                                );
                              }
                            })}
                            <li className={`page-item ${currentPage === Math.ceil(deptype.length / itemsPerPage) ? 'disabled' : ''}`}>
                              <button
                                className="page-link"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === Math.ceil(deptype.length / itemsPerPage)}
                              >
                                Next
                              </button>
                            </li>
                          </>
                        )}
                      </ul> */}
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

export default DepartmentType;

